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

const apply2 = fn => (arg1, arg2) => fn(arg1)(arg2)

// Passing state to view
const mapStateToView = view => state => view(state);

// running Application
export default ({ View, Init, Msg, Root, Update }) => {
  // Folding action stream with init to get currentState
  const state$ = scan(apply2(Update(Msg)), Init, action$);

  // Getting vtree$ from state$
  const vTree$ = map(mapStateToView(View), state$);

  // Running All the effects
  runEffects(tap(render(Root), vTree$), scheduler);
};
