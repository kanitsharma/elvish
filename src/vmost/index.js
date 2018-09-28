import { MulticastSource, never, runEffects, tap, scan, map } from "@most/core";
import { newDefaultScheduler } from "@most/scheduler";
import { compose } from "@most/prelude";
import render from "./render";
import { Actions } from "../actions";

// Application Scheduler
const scheduler = newDefaultScheduler();

// Action Source
const action$ = new MulticastSource(never());

// Adding event(time, value) to the action sink
export const dispatch = action => {
  console.log(action);
  action$.event(scheduler.currentTime(), action);
};

// Passing state to view
const mapStateToView = view => state => view(state);

// running Application
export default (vtree, reducer, root) => {
  console.log(Actions["INIT"]("INIT")(0));
  // Getting initial State
  const initialState = reducer(undefined, Actions["INIT"]("INIT")(0));

  // Folding action stream with initialState to get currentState
  const state$ = scan(reducer, initialState, action$);

  // Getting vtree$ from state$
  const vTree$ = map(mapStateToView(vtree), state$);

  // Running All the effects
  runEffects(tap(render(root), vTree$), scheduler);
};
