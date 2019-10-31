import { render } from 'inferno';

export default root => newTree => {
  render(newTree, root);
};
