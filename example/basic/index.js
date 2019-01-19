import run from '../../dist/main';
import { f, onClick, Text } from "../../dist/main";
import { Union, Record } from '../../dist/main'

const Model = Record({
  counter: Number
})

// init :: Model
const Init = Model.create(0)

// Msg = Increment | Decrement
const Msg = Union({
  Increment: [],
  Decrement: []
});

// update :: Model -> Msg -> Model
const Update = model => Msg.case({
  Increment: () => ({ ...model, counter: model.counter + 1 }),
  Decrement: () => ({ ...model, counter: model.counter - 1 }),
  _: () => model
})

// view :: Model -> Html Msg
const View = ({ counter, text }) =>
  f("div", [], [
    f("button", [onClick(Msg.Increment)], ["+"]),
    f("span", [], [Text(counter)]),
    f("button", [onClick(Msg.Decrement)], ["-"]),
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