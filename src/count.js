/**
 *
 */

import { makeNitterFn } from './nitter';

/**
 * Counts the length of a iterable. If the iterable is really long, this will halt your application.
 *
 * @function count
 * @returns {number} The number of items in the iterable.
 * @playground
 * // Testing count
 * const { count } = require('nitter');
 * const arr = [1, 2, 3];
 * count()(arr);
 */
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
