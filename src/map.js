import { nitter, addMethods, subtype } from './nitter';

const maptype = subtype({
  [Symbol.iterator]() {
    const iterator = this.inst.iter();
    const { fn } = this;
    return {
      next() {
        const next = iterator.next();
        if (next.done) {
          return { done: true };
        }

        const value = fn(next.value);
        return {
          done: false,
          value: value
        };
      }
    };
  }
});

addMethods({
  map(fn) {
    return maptype.create({
      inst: this,
      fn: fn
    });
  }
});
