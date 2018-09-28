import { f, onClick } from "./dom-effect";
import { createAction } from "./actions";

const increment = () => createAction("INC", 1);
const decrement = () => createAction("DEC", 1);

export default state =>
  f("div", [onClick(increment)], [state.counter.toString()]);
