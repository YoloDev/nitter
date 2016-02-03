import { makeNitterFn } from './nitter';
import { empty, cons } from './list';

export const reduce = makeNitterFn(function reduce(n, fn, state) { //eslint-disable-line prefer-arrow-callback
  const arr = n.arr();
  if (arr !== null) {
    return arr.reduce(fn, state);
  }

  const iterator = n.iter();
  while (true) { // eslint-disable-line no-constant-condition
    const next = iterator.next();
    if (next.done) {
      break;
    }

    state = fn(state, next.value);
  }

  return state;
});

// Special cases
export const sum = makeNitterFn(function sum(n) { //eslint-disable-line prefer-arrow-callback
  return reduce.fn(n, (a, b) => a + b, 0);
});

export const reverse = makeNitterFn(function reverse(n) { //eslint-disable-line prefer-arrow-callback
  return reduce.fn(n, (acc, val) => cons(val, acc), empty);
});
