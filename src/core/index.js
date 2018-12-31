import { runEffects, tap, scan, map } from "@most/core";
import { newDefaultScheduler } from "@most/scheduler";
import { render } from "../dom-effect/index";
import { createAdapter } from './most-adapter'

// Application Scheduler
const scheduler = newDefaultScheduler();

// Action Source
const [induceAction, action$] = createAdapter();

// Adding event(time, value) to the action sink
export const dispatch = action =>
  induceAction(action);

const apply2 = fn => (arg1, arg2) => fn(arg1)(arg2)

// Passing state to view
const mapStateToView = view => state => view(state);

const performSideEffects = effect => {
  effect().then(dispatch).catch(dispatch)
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
