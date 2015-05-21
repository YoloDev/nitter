import { nitter, addMethods, subtype } from './nitter';

const maptype = subtype({
  [Symbol.iterator]() {
    const iterator = this.inst.iter();
    const fn = this.fn;
    const thisArg = this.thisArg;
    return {
      next() {
        const next = iterator.next();
        if (next.done) {
          return { done: true };
        }
        
        const value = fn.call(thisArg || null, next.value);
        return {
          done: false,
          value: value
        };
      }
    };
  }
});

addMethods({
  map(fn, thisArg) {
    return maptype.create({
      inst: this,
      fn: fn,
      thisArg: thisArg
    });
  }
});