import { render } from "../dom-effect/index";
import { scheduler } from './scheduler'

const { nextFn, dispatch } = scheduler()

const performSideEffects = effect => {
  effect().then(dispatch).catch(dispatch)
  return false
}

const manageSideEffects = nextState =>
  Array.isArray(nextState)
    ? performSideEffects(nextState[1]) || nextState[0]
    : nextState

export default ({ View, Init, Msg, Root, Update }) => {
  const foldState = prevState => action => {
    if (!action) {
      return prevState
    }
    return manageSideEffects(Update(Msg)(prevState)(action))
  }

  const mapStateToView = state => View(state)

  const run = prevState => action => {
    const nextState = foldState(prevState)(action)
    const vTree = mapStateToView(nextState)
    render(Root)(vTree)
    nextFn(run(nextState))
  }

  run(Init)()
};

export { dispatch, render }