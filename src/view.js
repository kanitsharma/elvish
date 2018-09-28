import { f, onClick } from "./dom-effect";
import { createAction } from "./actions";

const increment = () => createAction("INC", 1);
const decrement = () => createAction("DEC", 1);

export default ({ counter }) =>
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
