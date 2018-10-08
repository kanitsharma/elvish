import run from "./vmost";
import { f, onClick, onEnter, value } from "./dom-effect";
import { Type } from './vmost'

const Model = Type({
  Model: {
    counter: Number,
    value: String
  }
})

// init :: Model
const Init = Model.ModelOf({
  counter: 0,
  value: "Hello"
})

// update :: Msg -> Model -> (Msg -> Model)
const Update = msg => model => msg.case(
  {
    Increment: () => ({ ...model, counter: model.counter + 1 }),
    Decrement: () => ({ ...model, counter: model.counter - 1 }),
    Entered: value => ({ ...model, value }),
    _: () => state
  }
)

const Msg = Type({
  Increment: [],
  Decrement: [],
  UpdateText: [String]
});

// view :: Model -> Html Msg
const View = ({ counter, value }) =>
  f(
    "div",
    [],
    [
      f("button", [onClick(Msg.Increment)], ["+"]),
      Text(counter),
      f("button", [onClick(Msg.Decrement)], ["-"]),
      f("input", [onEnter(e => Msg.UpdateText(e.target.value)), value(value)], []),
      f("h1", [], [value])
    ]
  );

const Text = value => f("span", [], ["   " + value.toString() + "   "]);


// Run
const Root = document.getElementById("root");

run({
  View,
  Update,
  Msg,
  Init,
  Root
});
