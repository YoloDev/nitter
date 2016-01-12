import { nitter, addMethods, subtype } from './nitter';

const filtertype = subtype({
  [Symbol.iterator]() {
    const iterator = this.inst.iter();
    const { fn } = this;
    return {
      next() {
        while (true) {
          const next = iterator.next();
          if (next.done) {
            return { done: true };
          }

          const include = fn(next.value);

          if (include) {
            return {
              done: false,
              value: next.value
            };
          }
        }
      }
    };
  }
});

addMethods({
  filter(fn) {
    return filtertype.create({
      inst: this,
      fn: fn
    });
  }
});
