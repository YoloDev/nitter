import { makeNitterFn } from './nitter';

export const forEach = makeNitterFn(function forEach(n, fn) { //eslint-disable-line prefer-arrow-callback
  const arr = n.arr();
  if (arr !== null) {
    arr.forEach(fn);
    return;
  }

  const iterator = n.iter();
  while (true) { // eslint-disable-line no-constant-condition
    const next = iterator.next();
    if (next.done) {
      break;
    }

    fn(next.value);
  }
});
