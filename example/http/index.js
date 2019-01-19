import run from "../../dist/main";
import { f, onClick, Text } from '../../dist/main'
import { Union, Record, Effect } from '../../dist/main'

const Model = Record({
  userId: Number,
  title: String,
  fetched: Boolean,
  url: String
})

// init :: Model
const Init = Model.create(0, '', false, 'https://jsonplaceholder.typicode.com/todos/1')

const Msg = Union({
  FetchData: [],
  FetchedData: [Number, String],
  FetchError: [String]
});

// getJson :: String -> Effect err { number, string }
const getJson = url => Effect((reject, resolve) =>
  fetch(url)
    .then(x => !x.ok ? reject('Error') : x.json())
    .then(resolve)
)

// fetchUserData :: String -> Effect FetchError FetchedData
const fetchUserData = url =>
  Effect.of(url)
    .chain(getJson)
    .bimap(err => Msg.FetchError(err), ({ userId, title }) => Msg.FetchedData(userId, title))

// update :: Model -> Msg -> Model | (Model, Effect)
const Update = model => Msg.case({
  FetchData: () => [model, fetchUserData(model.url)],
  FetchedData: (userId, title) => ({ ...model, userId, title, fetched: true }),
  FetchError: err => ({ ...model, title: err, fetched: true }),
  _: _ => model
})

// view :: Model -> Html Msg
const View = ({ userId, title, fetched }) =>
  f('div', [],
    [
      f('button', [onClick(Msg.FetchData)], [Text('Fetch Data')]),
      fetched && f('div', [], [
        f('h3', [], [Text(userId)]),
        f('h3', [], [Text(title)])
      ])
    ]
  );


// Run
const Root = document.getElementById("root");

run({
  View,
  Update,
  Init,
  Root
});