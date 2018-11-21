import run from "./vmost";
import { f, onClick, onEnter, value, Text, h } from "./dom-effect";
import { Type } from './vmost'

const Model = Type({
  Model: {
    counter: Number,
    text: String
  }
})

// init :: Model
const Init = Model.ModelOf({
  counter: 0,
  text: "Hello"
})

// update :: Msg -> Model -> (Msg -> Model)
const Update = msg => model => msg.case(
  {
    Increment: () => ({ ...model, counter: model.counter + 1 }),
    Decrement: () => ({ ...model, counter: model.counter - 1 }),
    UpdateText: text => ({ ...model, text }),
    _: () => model
  }
)

const Msg = Type({
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
      f("input", [onEnter(e => Msg.UpdateText(e.target.value)), value(text)], []),
      f("h1", [], [Text(text)])
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