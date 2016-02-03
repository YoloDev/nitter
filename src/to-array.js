import { makeNitterFn } from './nitter';

export const toArray = makeNitterFn(function toArray(n, clone = true) { //eslint-disable-line prefer-arrow-callback
  const arr = n.arr();
  if (arr !== null) {
    return clone ? arr.concat() : arr;
  }

  const iterator = n.iter();
  const result = [];
  while (true) { // eslint-disable-line no-constant-condition
    const next = iterator.next();
    if (next.done) {
      break;
    }

    result.push(next.value);
  }

  return result;
});
