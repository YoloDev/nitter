import { makeNitterFn, subtype } from './nitter';

const skipType = subtype('Nitter:Skip', (n, count) => {
  const iterator = n.iter();
  for (let i = 0; i < count; i++) {
    iterator.next();
  }

  return {
    next() {
      const { done, value } = iterator.next();
      if (done) {
        return { done };
      }

      return { done, value };
    }
  };
});

export const skip = makeNitterFn(function skip(n, count) { // eslint-disable-line prefer-arrow-callback
  if (typeof count !== 'number') {
    throw new Error(`Expected count to be a number, got ${count}.`);
  }

  if (count < 0) {
    throw new Error('count cannot be less than 0.');
  }

  return skipType(n, count);
});
