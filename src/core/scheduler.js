export default () => {
  let subscriber;

  const dispatch = action => {
    subscriber(action);
  };

  const nextFn = fn => {
    subscriber = fn;
  };

  return { dispatch, nextFn };
};
