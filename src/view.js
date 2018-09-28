import { f, onClick } from "./dom-effect";

export default state =>
  f("div", [onClick(_ => console.log("Hi"))], [state.counter.toString()]);
