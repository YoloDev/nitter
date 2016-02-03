import { makeNitterFn, subtype } from './nitter';

const mapType = subtype('Nitter:Map', (n, fn) => {
  const iterator = n.iter();

  return {
    next() {
      const { done, value } = iterator.next();
      if (done) {
        return { done };
      }

      return { done, value: fn(value) };
    }
  };
});

export const map = makeNitterFn(function map(n, fn) { // eslint-disable-line prefer-arrow-callback
  if (typeof fn !== 'function') {
    throw new Error(`Expected fn to be a function, got ${fn}.`);
  }

  return mapType(n, fn);
});
