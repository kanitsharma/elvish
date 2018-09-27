import { render } from "./dom-effect";

let prevView;

export default root => vtree => {
  if (!prevView) {
    render(root, vtree);
    prevTree = vtree;
  } else {
    render(root, vtree, prevTree);
    prevTree = vtree;
  }
};
