import { h } from 'inferno-hyperscript'
const reduceProps = props => props.reduce((acc, x) => ({ ...acc, ...x }), {});

const x = (x, y, ...z) => h(x, y, z)
export { x as h }
export const f = (type, propList, children) => h(
  type,
  reduceProps(propList),
  children.filter(x => x)
);

