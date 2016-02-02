import { makeNitterFn } from './nitter';

export const count = makeNitterFn(function count(n) { //eslint-disable-line prefer-arrow-callback
  const arr = n.arr();
  if (arr !== null) {
    return arr.length;
  }

  const iterator = n.iter();
  let ret = 0;
  while (true) { // eslint-disable-line no-constant-condition
    const next = iterator.next();
    if (next.done) {
      break;
    }

    ret++;
  }

  return ret;
});
