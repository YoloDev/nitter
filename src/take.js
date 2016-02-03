import { makeNitterFn, subtype } from './nitter';

const takeType = subtype('Nitter:Take', (n, count) => {
  const iterator = n.iter();

  return {
    next() {
      if (count === 0) {
        return { done: true };
      }

      const { done, value } = iterator.next();
      if (done) {
        return { done };
      }

      count--;
      return { done, value };
    }
  };
});

export const take = makeNitterFn(function take(n, count) { // eslint-disable-line prefer-arrow-callback
  if (typeof count !== 'number') {
    throw new Error(`Expected count to be a number, got ${count}.`);
  }

  if (count < 0) {
    throw new Error('count cannot be less than 0.');
  }

  return takeType(n, count);
});
