import { render } from "../dom-effect";

let prevTree;

export default root => vtree => {
  if (!prevTree) {
    render(root, vtree);
    prevTree = vtree;
  } else {
    render(root, vtree, prevTree);
    prevTree = vtree;
  }
};