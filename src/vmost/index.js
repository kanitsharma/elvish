import { MulticastSource, never, runEffects, tap, scan, map } from "@most/core";
import { newDefaultScheduler } from "@most/scheduler";
import { render } from "../dom-effect";
import Type from 'union-type'

export { Type }

// Application Scheduler
const scheduler = newDefaultScheduler();

// Action Source
const action$ = new MulticastSource(never());

// Adding event(time, value) to the action sink
export const dispatch = action =>
  action$.event(scheduler.currentTime(), action);

const flip2 = fn => (arg1, arg2) => fn(arg2, arg1)

// Passing state to view
const mapStateToView = view => state => view(state);

// running Application
export default ({ view, init, Msg, root, update }) => {
  // Folding action stream with init to get currentState
  const state$ = scan(flip2(update(Msg)), init, action$);

  // Getting vtree$ from state$
  const vTree$ = map(mapStateToView(view), state$);

  // Running All the effects
  runEffects(tap(render(root), vTree$), scheduler);
};
