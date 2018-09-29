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
