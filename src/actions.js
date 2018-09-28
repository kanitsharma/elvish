import Type from "union-type";
import { dispatch } from "./index";

const ActionType = {
  type: String,
  payload: Number
};

export const Actions = Type({
  INC: ActionType,
  DEC: ActionType
});

export const createAction = action => payload =>
  dispatch(Actions[action](action)(payload));
