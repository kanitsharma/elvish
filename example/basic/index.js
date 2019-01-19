import run from '../../dist/main';
import { h, onClick, Text } from "../../dist/main";
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
  <div>
    <button {...onClick(Msg.Increment)} >+</button>
    <span>{Text(counter)}</span>
    <button {...onClick(Msg.Decrement)} >-</button>
  </div>

// Run
const Root = document.getElementById("root");

run({
  View,
  Update,
  Init,
  Root
});