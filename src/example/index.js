import run from "../lib/core";
import { f, onClick, onEnter, value, Text, h } from "../lib/dom-effect";
import { Union, Record, Effect } from '../lib/core/types'

const Model = Record({
  counter: Number,
  text: String
})

// init :: Model
const Init = Model(0, 'Hello')

// delayedIncrement :: () -> Effect
const delayedIncrement = _ => Effect(
  resolve => {
    setTimeout(_ => {
      resolve(Msg.Decrement)
    }, 1000)
  },
  reject => reject()
)

// update :: Msg -> Model -> (Msg -> Model)
const Update = msg => model => msg.case(
  {
    Increment: () => [model, delayedIncrement()],
    Decrement: () => ({ ...model, counter: model.counter - 1 }),
    UpdateText: text => ({ ...model, text }),
    _: () => model
  }
)

const Msg = Union({
  Increment: [],
  Decrement: [],
  UpdateText: [String]
});

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
  Msg,
  Init,
  Root
});