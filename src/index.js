import { MulticastSource, never, runEffects, tap, scan, map } from "@most/core";
import { newDefaultScheduler } from "@most/scheduler";
import render from "./render";
import View from "./view";

// Application Scheduler
const scheduler = newDefaultScheduler();

// Action Source
const createAction$ = () => new MulticastSource(never());

// Adding event(time, value) to the action sink
export const dispatch = scheduler => action$ => action =>
  action$.event(scheduler.currentTime(), action);

// Initial State
const initialState = {
  counter: 0
};

const reducer = action => initialState;

// Passing state to view
const mapStateToView = state => View(state);

// Creating action stream
const action$ = createAction$();

// Getting nextState from action$
const state$ = scan(reducer, initialState, action$);

// Getting vtree$ from state$
const vTree$ = map(mapStateToView, state$);

const root = document.getElementById("root");

// running Application
runEffects(tap(render(root), vTree$), scheduler);
