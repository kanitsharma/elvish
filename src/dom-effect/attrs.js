import { dispatch } from '../vmost'

export const className = name => ({
  class: name
});

export const id = name => ({
  id: name
});

export const onClick = Msg => ({
  onClick: e => dispatch(Msg)
});

export const onEnter = Msg => ({
  onChange: e => dispatch(Msg(e))
})