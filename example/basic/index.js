import run from '../../dist/main';
import { f, onClick, onEnter, value, Text, h } from "../../dist/main";
import { Union, Record, Effect } from '../../dist/main'

const Model = Record({
  counter: Number,
  text: String
})

// init :: Model
const Init = Model(0, 'Hello')

const Msg = Union({
  Increment: [],
  Decrement: [],
  UpdateText: [String]
});

// update :: Model -> Msg -> Model
const Update = model => Msg.case({
  Increment: () => ({ ...model, counter: model.counter + 1 }),
  Decrement: () => ({ ...model, counter: model.counter - 1 }),
  UpdateText: text => ({ ...model, text }),
  _: () => model
}) // msg will be partially applied here

// view :: Model -> Html Msg
const View = ({ counter, text }) =>
  f(
    "div",
    [],
    [
      f("button", [onClick(Msg.Increment)], ["+"]),
      f("span", [], [Text(counter)]),
      f("button", [onClick(Msg.Decrement)], ["-"]),
      TextBox(text, Msg.UpdateText),
      f("h1", [], [Text(text)])
    ]
  );

const TextBox = (text, updateText) => (
  f("input", [onEnter(e => updateText(e.target.value)), value(text)], [])
)

// Run
const Root = document.getElementById("root");

run({
  View,
  Update,
  Init,
  Root
});