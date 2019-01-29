import { h } from "inferno-hyperscript";
import curryN from "ramda/es/curryN";

const reduceProps = props => props.reduce((acc, x) => ({ ...acc, ...x }), {});

const x = (x, y, ...z) => h(x, y, z);
export { x as h };

export const f = (type, propList, children) =>
  h(type, reduceProps(propList), children.filter(x => x));

export const div = curryN(2, (propList, children) =>
  h("div", reduceProps(propList), children)
);
export const button = curryN(2, (propList, children) =>
  h("button", reduceProps(propList), children)
);
export const input = curryN(2, (propList, children) =>
  h("input", reduceProps(propList), children)
);
export const p = curryN(2, (propList, children) =>
  h("p", reduceProps(propList), children)
);
export const h1 = curryN(2, (propList, children) =>
  h("h1", reduceProps(propList), children)
);
export const h2 = curryN(2, (propList, children) =>
  h("h2", reduceProps(propList), children)
);
export const h3 = curryN(2, (propList, children) =>
  h("h3", reduceProps(propList), children)
);
export const h4 = curryN(2, (propList, children) =>
  h("h4", reduceProps(propList), children)
);
export const h5 = curryN(2, (propList, children) =>
  h("h5", reduceProps(propList), children)
);
export const select = curryN(2, (propList, children) =>
  h("select", reduceProps(propList), children)
);
export const textarea = curryN(2, (propList, children) =>
  h("textarea", reduceProps(propList), children)
);
export const br = curryN(2, (propList, children) =>
  h("br", reduceProps(propList), children)
);
export const hr = curryN(2, (propList, children) =>
  h("hr", reduceProps(propList), children)
);
export const ul = curryN(2, (propList, children) =>
  h("ul", reduceProps(propList), children)
);
export const ol = curryN(2, (propList, children) =>
  h("ol", reduceProps(propList), children)
);
export const li = curryN(2, (propList, children) =>
  h("li", reduceProps(propList), children)
);
export const span = curryN(2, (propList, children) =>
  h("span", reduceProps(propList), children)
);
