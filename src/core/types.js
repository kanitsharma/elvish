import Type from 'union-type'

export { Type as Union }

const curry = (fn, args = []) => {
  const length = fn.length
  if (fn.length === 1) {
    return fn
  }
  if (args.length === length) {
    return fn(...args)
  }
  return x => curry(fn, [...args, x])
}

export const Record = rec => {
  const X = Type({
    Record: {
      ...rec
    }
  })

  return (...params) => X.RecordOf(Object.keys(rec).reduce((acc, x, i) => ({ ...acc, [x]: params[i] }), {}))
}

export const Effect = sideEffect => _ => new Promise((resolve, reject) => sideEffect(resolve, reject))