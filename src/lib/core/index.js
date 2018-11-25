import { MulticastSource, never, runEffects, tap, scan, map, now, continueWith, fromPromise, chain } from "@most/core";
import { newDefaultScheduler } from "@most/scheduler";
import { render } from "../dom-effect";
import Type from 'union-type'
import { join, resolve } from "upath";

export { Type }

// Application Scheduler
const scheduler = newDefaultScheduler();

// Action Source
const action$ = new MulticastSource(never());

// Adding event(time, value) to the action sink
export const dispatch = action =>
  action$.event(scheduler.currentTime(), action);

export const Effect = sideEffect => _ => new Promise((resolve, reject) => sideEffect(resolve, reject))

const apply2 = fn => (arg1, arg2) => fn(arg1)(arg2)

// Passing state to view
const mapStateToView = view => state => view(state);

const performSideEffects = effect => {
  effect().then(dispatch)
  return false
}

const manageSideEffects = nextState =>
  Array.isArray(nextState)
    ? performSideEffects(nextState[1]) || nextState[0]
    : nextState


// running Application
export default ({ View, Init, Msg, Root, Update }) => {
  // Folding action stream with init to get currentState
  const state$ = scan((x, y) => manageSideEffects(Update(Msg)(x)(y)), Init, action$);

  // Getting vtree$ from state$
  const vTree$ = map(mapStateToView(View), state$);

  // Running All the effects
  runEffects(tap(render(Root), vTree$), scheduler);
};
