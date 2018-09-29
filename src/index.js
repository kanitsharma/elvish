import run from "./vmost";
import { f, onClick } from "./dom-effect";
import { Type } from './vmost'

const Model = Type({
  Model: {
    counter: Number
  }
})

// init :: Model
const Init = Model.ModelOf({
  counter: 0
})

// update :: Msg -> Model -> (Msg -> Model)
const Update = msg => model => msg.case(
  {
    Increment: () => ({ ...model, counter: model.counter + 1 }),
    Decrement: () => ({ ...model, counter: model.counter - 1 }),
    _: () => state
  }
)

const Msg = Type({
  Increment: [],
  Decrement: []
});

// view :: Model -> Html Msg
const View = ({ counter }) =>
  f(
    "div",
    [],
    [
      f("button", [onClick(Msg.Increment)], ["+"]),
      Text(counter),
      f("button", [onClick(Msg.Decrement)], ["-"])
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
