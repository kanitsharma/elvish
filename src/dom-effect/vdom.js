import h from 'virtual-dom/h'

const reduceProps = props => props.reduce((acc, x) => ({ ...acc, ...x }), {});

export { h as h }
export const f = (type, propList, children) => h(
  type,
  reduceProps(propList),
  children
);

