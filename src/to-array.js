import { addMethods } from './nitter';

addMethods({
  toArray(clone = true) {
    const arr = this.arr();
    if (arr !== null) {
      return clone ? arr.concat() : arr;
    }

    const iterator = this.iter();
    const result = [];
    while (true) {
      const next = iterator.next();
      if (next.done) break;

      result.push(next.value);
    }

    return result;
  }
});