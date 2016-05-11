import { UNUSED } from './utils';
import { makeNitterFn, wrap } from './nitter';
import { empty, cons } from './list';

export const reduce = makeNitterFn(function reduce(n, fn, state = UNUSED) { //eslint-disable-line prefer-arrow-callback
  const arr = n.arr();
  if (arr !== null) {
    if (state == UNUSED) {
      return arr.reduce(fn);
    }

    return arr.reduce(fn, state);
  }

  const iterator = n.iter();
  let first = true;
  while (true) { // eslint-disable-line no-constant-condition
    const next = iterator.next();
    if (next.done) {
      break;
    }

    if (first && state == UNUSED) {
      state = next.value;
    } else {
      state = fn(state, next.value);
    }

    first = false;
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

export const reduceRight = makeNitterFn(function reduceRight(n, fn, state = UNUSED) { //eslint-disable-line prefer-arrow-callback
  const arr = n.arr();
  if (arr != null) {
    if (state == UNUSED) {
      return arr.reduceRight(fn);
    }

    return arr.reduceRight(fn, state);
  }

  const reversed = wrap(reverse.fn(n));
  return reduce.fn(reversed, fn, state);
});
