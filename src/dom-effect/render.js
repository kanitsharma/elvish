import { patch } from "./vdom";

// Well this is ugly -_-
let prevTree;

export default root => vtree => {
  if (!prevTree) {
    patch(root, vtree);
    prevTree = vtree;
  } else {
    patch(root, vtree, prevTree);
    prevTree = vtree;
  }
};
