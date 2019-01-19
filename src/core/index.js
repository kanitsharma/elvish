import { render } from "../dom-effect/index";
import { scheduler } from './scheduler'

const { nextFn, dispatch } = scheduler()

const performSideEffects = effect => {
  effect().fork(dispatch, dispatch)
  return false
}

const manageSideEffects = nextState =>
  Array.isArray(nextState)
    ? performSideEffects(nextState[1]) || nextState[0]
    : nextState

export default ({ View, Init, Root, Update }) => {
  const foldState = prevState => action =>
    !action
      ? prevState
      : manageSideEffects(Update(prevState)(action))

  const mapStateToView = state => View(state)

  const runEffects = prevState => action => {
    const nextState = foldState(prevState)(action)
    const vTree = mapStateToView(nextState)
    render(Root)(vTree)
    nextFn(runEffects(nextState))
  }

  runEffects(Init)()
};

export { dispatch, render }