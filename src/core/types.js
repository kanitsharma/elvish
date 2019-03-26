import { Type } from "./union";
import curryN from "ramda/es/curryN";
export { default as Effect } from '@kimera/io';

// Union
export { Type as Union };

// Record

export const Record = rec => {
  const X = Type({
    Record: {
      ...rec
    }
  });

  return {
    create: curryN(Object.keys(rec).length, (...params) =>
      X.RecordOf(
        Object.keys(rec).reduce((acc, x, i) => ({ ...acc, [x]: params[i] }), {})
      )
    ),
    ...X
  };
};
