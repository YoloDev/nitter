import { prop, frozenNew } from './utils';
import { toArray } from './to-array';

export function List(it) {
  if (this instanceof List) {
    throw new Error(`List must not be called with new.`);
  }

  const arr = it::toArray();
  arr.reverse();
  return arr.reduce((acc, el) => cons(el, acc), empty);
}

const proto = frozenNew({
  [Symbol.iterator]: prop(function iterator() { // eslint-disable-line prefer-arrow-callback
    let list = this; // eslint-disable-line consistent-this, no-invalid-this
    return {
      next() {
        if (list === empty) {
          return { done: true };
        }

        const { value, tail } = list;
        list = tail;
        return { value, done: false };
      }
    };
  }),

  constructor: prop(List)
});

export const empty = frozenNew(proto, {});

// This function is callable in 3 ways:
// 1. list::cons(newEl)
// 2. cons(newEl)(list)
// 3. cons(newEl, list)
export function cons(element, list = null) {
  if (this instanceof List) { // eslint-disable-line no-invalid-this
    // called as list::cons(newEl presumably)
    if (list !== null) {
      throw new Error(`Cannot call cons with both this-parameter and list parameter set.`);
    }

    list = this; // eslint-disable-line no-invalid-this, consistent-this
  } else if (list === null) {
    return list => cons(element, list);
  }

  if (!(list instanceof List)) {
    throw new Error(`Expected a list, but got ${list} instead.`);
  }

  return frozenNew(proto, {
    value: prop(element),
    tail: prop(list)
  });
}

List.prototype = proto;
List.empty = empty;
List.cons = cons;
