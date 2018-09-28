import Type from "union-type";
import { dispatch } from "./vmost";

const DefaultActionType = {
  type: String,
  payload: Number
};

export const Actions = Type({
  INC: DefaultActionType,
  DEC: DefaultActionType,
  INIT: DefaultActionType // This is necessary to get the initial state
});

export const createAction = (action, payload) =>
  dispatch(Actions[action](action)(payload));
