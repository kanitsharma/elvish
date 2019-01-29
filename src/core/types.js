import { Type } from "./union";
import curryN from "ramda/es/curryN";

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

// Effect

const empty = _ => Effect(_ => {});

export const Effect = (F, cleanup = () => {}) => {
  const map = f =>
    Effect((reject, resolve) => F(x => reject(x), y => resolve(f(y))), cleanup);
  const chain = f =>
    Effect(
      (reject, resolve) => F(x => reject(x), y => f(y).fork(reject, resolve)),
      cleanup
    );
  const orElse = f =>
    Effect(
      (reject, resolve) => F(x => f(x).fork(reject, resolve), y => resolve(y)),
      cleanup
    );
  const fold = (f, g) =>
    Effect((_, resolve) => F(x => resolve(f(x)), y => resolve(g(y))), cleanup);
  const cata = pattern => fold(pattern.Rejected, pattern.Resolved);
  const bimap = (f, g) =>
    Effect(
      (reject, resolve) => F(x => reject(f(x)), y => resolve(g(y))),
      cleanup
    );
  const fork = F;

  return { map, chain, empty, orElse, fold, cata, bimap, fork };
};

Effect.of = x => Effect((_, resolve) => resolve(x));
Effect.rejected = x => Effect(reject => reject(x));
Effect.empty = empty;
Effect.toString = () => "Effect";
