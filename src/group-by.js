import { makeNitterFn, subtype, lazy } from './nitter';
import { forEach } from './for-each';

const groupType = subtype('Nitter.Group', (lazy) => lazy()());

export const groupBy = makeNitterFn(function groupBy(n, keySelector, elementSelector = null) { // eslint-disable-line prefer-arrow-callback
  if (typeof keySelector !== 'function') {
    throw new Error(`Expected keySelector to be a function, got ${keySelector}.`);
  }

  if (elementSelector !== null && typeof elementSelector !== 'function') {
    throw new Error(`Expected elementSelector to be a function, got ${elementSelector}.`);
  }

  if (elementSelector === null) {
    elementSelector = id;
  }

  return groupType(lazy(() => {
    const groups = new Map();

    forEach.fn(n, itm => {
      const key = keySelector(itm);
      const value = elementSelector(itm);

      if (groups.has(key)) {
        groups.get(key).push(value);
      } else {
        groups.set(key, [value]);
      }
    });

    return ::groups.entries;
  }));
});

function id(v) {
  return v;
}
