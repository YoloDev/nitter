import { makeNitterFn, subtype } from './nitter';

const filterType = subtype('Nitter:Filter', (n, fn) => {
  const iterator = n.iter();

  return {
    next() {
      let tmp;
      do {
        tmp = iterator.next();
      } while (!tmp.done && !fn(tmp.value));

      const { done, value } = tmp;
      if (done) {
        return { done };
      }

      return { done, value };
    }
  };
});

export const filter = makeNitterFn(function filter(n, fn) { // eslint-disable-line prefer-arrow-callback
  if (typeof fn !== 'function') {
    throw new Error(`Expected fn to be a function, got ${fn}.`);
  }

  return filterType(n, fn);
});
