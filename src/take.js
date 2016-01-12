import { nitter, addMethods, subtype } from './nitter';

const maptype = subtype({
  [Symbol.iterator]() {
    const iterator = this.inst.iter();
    let { count } = this;

    return {
      next() {
        if (count === 0) {
          return { done: true };
        }

        const next = iterator.next();
        if (next.done) {
          return { done: true };
        }

        count--;
        return {
          done: false,
          value: next.value
        };
      }
    };
  }
});

addMethods({
  take(count) {
    if (typeof count !== 'number') {
      throw new Error(`Expected count to be a number, got ${count}.`);
    }

    if (count < 0) {
      throw new Error('count cannot be less than 0.');
    }

    return maptype.create({
      inst: this,
      count
    });
  }
});
