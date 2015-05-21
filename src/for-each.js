import { nitter, addMethods } from './nitter';

addMethods({
  forEach(fn, thisArg = null) {
    const arr = this.arr();
    if (arr !== null) {
      arr.forEach(fn, thisArg);
      return;
    }

    const iterator = this.iter();
    while (true) {
      const next = iterator.next();
      if (next.done) break;

      fn.apply(thisArg, [next.value]);
    }
  }
});