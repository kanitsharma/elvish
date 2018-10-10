import { dispatch } from '../vmost'

export const className = name => ({
  class: name
});

export const id = name => ({
  id: name
});

export const onClick = Msg => ({
  onClick: _ => dispatch(Msg)
});

export const onEnter = Msg => ({
  oninput: e => dispatch(Msg(e))
})

export const src = src => ({
  src
})

export const value = value => ({
  value
})

export const Text = value => value.toString()