/**
 *
 */

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

/**
 * {@link map} calls a provided callback function *for each element* in an iterable, in order, and
 * constructs a new iterable from the results. This does not mutate the original iterable, but
 * rather creates a new one.
 *
 * @function map
 * @summary The {@link map} function creates a new iterable with the result of calling a provided
 *          function on every element in the provided iterable.
 * @param {mapCallback} callback Function that produces an element of the new iterable.
 * @returns {iterable} A new iterable where each element is the result of calling the provided
 *                     function on the old iterable.
 *
 * @playground
 * // Testing map
 * const { map, toArray } = require('nitter');
 * const arr = [1, 2, 3];
 * const mapped = map(i => i * 2)(arr);
 * toArray()(mapped);
 */
export const map = makeNitterFn(function map(n, fn) { // eslint-disable-line prefer-arrow-callback
  if (typeof fn !== 'function') {
    throw new Error(`Expected fn to be a function, got ${fn}.`);
  }

  return mapType(n, fn);
});

/**
 * Function that produce an element of the new iterable, taking 1 argument:
 *
 * @callback mapCallback
 * @param {*} currentValue The current element being processed in the array.
 * @inner
 */
