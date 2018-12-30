import diff from 'virtual-dom/diff'
import patch from 'virtual-dom/patch'
import createElement from 'virtual-dom/create-element'

let tree, rootNode

export default root => newTree => {
  if (!tree) {
    rootNode = createElement(newTree);
    root.appendChild(rootNode);
    tree = newTree
  }

  if (tree) {
    const patches = diff(tree, newTree);
    patch(rootNode, patches);
    tree = newTree;
  }
};
