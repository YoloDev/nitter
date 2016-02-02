import { nitter, addMethods, subtype, cell } from './nitter';

function toGrouping(map) {
  return nitter(map.entries()).map(([key, value]) => [key, nitter(value)]);
}

const grouptype = subtype({
  [Symbol.iterator]() {
    const grouping = this.cache(() => {
      const { keySelector, elementSelector } = this;
      const valueSelector = elementSelector === null ?
            (v) => v :
            elementSelector;
      const map = new Map();
      const fn = function(itm) {
        const key = keySelector(itm);
        const value = valueSelector(itm);

        if(map.has(key)) {
          map.get(key).push(value);
        } else {
          map.set(key, [value]);
        }
      };

      const arr = this.inst.arr();
      if (arr !== null) {
        arr.forEach(fn);
      } else {
        const iterator = this.inst.iter();

        while (true) {
          const next = iterator.next();
          if (next.done) break;

          fn.apply(null, [next.value]);
        }
      }

      return toGrouping(map);
    });

    return grouping[Symbol.iterator]();
  }
});

addMethods({
  groupBy(keySelector, elementSelector = null) {
    if(keySelector === undefined || keySelector === null) {
      throw new Error('Key selector can\'t be null or undefined');
    }

    return grouptype.create({
      inst: this,
      keySelector: keySelector,
      elementSelector: elementSelector,
      cache: cell()
    });
  }
});
