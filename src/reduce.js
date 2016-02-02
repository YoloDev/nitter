import { nitter, addMethods } from './nitter';
import { empty } from './list';

addMethods({
  reduce(fn, state) {
    const arr = this.arr();
    if (arr !== null) {
      return arr.reduce(fn, state);
    }

    const iterator = this.iter();
    while (true) {
      const next = iterator.next();
      if (next.done) break;

      state = fn(state, next.value);
    }

    return state;
  },

  // Special cases
  sum() {
    return this.nitter.reduce((a, b) => a + b, 0);
  },

  reverse() {
    return this.nitter.reduce((acc, val) => acc.cons(val), empty);
  }
});
