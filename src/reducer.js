import { Actions } from "./actions";

const initialState = {
  counter: 0
};

export default (state = initialState, action) =>
  Actions.case(
    {
      INC: () => ({ ...state, counter: state.counter + action.payload }),
      DEC: () => ({ ...state, counter: state.counter - action.payload }),
      _: () => state
    },
    action
  );
