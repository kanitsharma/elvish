import { h } from 'inferno-hyperscript'
const reduceProps = props => props.reduce((acc, x) => ({ ...acc, ...x }), {});

const x = (x, y, ...z) => h(x, y, z)
export { x as h }

export const f = (type, propList, children) => h(
  type,
  reduceProps(propList),
  children.filter(x => x)
);

export const div = (propList, children) => h('div', reduceProps(propList), children)
export const button = (propList, children) => h('button', reduceProps(propList), children)
export const input = (propList, children) => h('input', reduceProps(propList), children)
export const p = (propList, children) => h('p', reduceProps(propList), children)
export const h1 = (propList, children) => h('h1', reduceProps(propList), children)
export const h2 = (propList, children) => h('h2', reduceProps(propList), children)
export const h3 = (propList, children) => h('h3', reduceProps(propList), children)
export const h4 = (propList, children) => h('h4', reduceProps(propList), children)
export const h5 = (propList, children) => h('h5', reduceProps(propList), children)
export const select = (propList, children) => h('select', reduceProps(propList), children)
export const textarea = (propList, children) => h('textarea', reduceProps(propList), children)
export const br = (propList, children) => h('br', reduceProps(propList), children)
export const hr = (propList, children) => h('hr', reduceProps(propList), children)
export const ul = (propList, children) => h('ul', reduceProps(propList), children)
export const ol = (propList, children) => h('ol', reduceProps(propList), children)
export const li = (propList, children) => h('li', reduceProps(propList), children)
export const span = (propList, children) => h('span', reduceProps(propList), children)

