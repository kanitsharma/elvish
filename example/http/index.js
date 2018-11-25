import run from "../../src/lib/core";
import { f, onClick, Text } from '../../src/lib/dom-effect'
import { Union, Record, Effect } from '../../src/lib/core/types'

const Model = Record({
  userId: Number,
  title: String,
  fetched: Boolean,
  url: String
})

// init :: Model
const Init = Model(0, '', false, 'https://jsonplaceholder.typicode.com/todos/1')

const Msg = Union({
  FetchData: [],
  FetchedData: [Number, String],
  FetchError: []
});

// fetchUserData :: String -> Effect FetchedData
const fetchUserData = url => Effect((resolve, reject) => {
  fetch(url)
    .then(res => res.json())
    .then(({ userId, title }) => Msg.FetchedData(userId, title))
    .then(resolve)
    .catch(err => reject(Msg.FetchError))
})

// update :: Msg -> Model -> (Msg -> Model)
const Update = msg => model => msg.case({
  FetchData: () => [model, fetchUserData(model.url)],
  FetchedData: (userId, title) => ({ ...model, userId, title, fetched: true }),
  FetchError: () => ({ ...model, title: 'Error fetching', fetched: true }),
  _: _ => model
})

// view :: Model -> Html Msg
const View = ({ userId, title, fetched }) =>
  f(
    'div',
    [],
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
  Msg,
  Init,
  Root
});