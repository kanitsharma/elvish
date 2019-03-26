import { dispatch } from '../core/index';

export const className = name => ({
  class: name,
});

export const id = name => ({
  id: name,
});

export const onClick = Msg => ({
  onclick: _ => dispatch(Msg),
});

export const onEnter = Msg => ({
  oninput: e => dispatch(Msg(e)),
});

export const src = source => ({
  src: source,
});

export const value = val => ({
  value: val,
});

export const Text = val => String(val);
