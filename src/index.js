import run, { dispatch } from "./vmost";
import { f, onClick } from "./dom-effect";
import { Type } from './vmost'


const Model = Type({
  Model: {
    counter: Number
  }
})

const init = Model.ModelOf({
  counter: 0
})

// Update

const update = msg => model => msg.caseOn(
  {
    INC: (x) => {
      console.log(x)
      return ({ ...model, counter: model.counter + 1 })
    },
    DEC: (x) => ({ ...model, counter: model.counter - x }),
    _: () => state
  }
)


// Msg
const Msg = Type({
  INC: [Number],
  DEC: [Number]
});



// View
const increment = dispatch => () => dispatch(Msg.INC(1));
const decrement = dispatch => () => dispatch(Msg.DEC(1));

const view = ({ counter }) =>
  f(
    "div",
    [],
    [
      f("button", [onClick(increment)], ["+"]),
      Text(counter),
      f("button", [onClick(decrement)], ["-"])
    ]
  );

const Text = value => f("span", [], ["   " + value.toString() + "   "]);




// Run
const root = document.getElementById("root");
run({
  view,
  update,
  Msg,
  init,
  root
});
