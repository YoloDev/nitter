import { nitter, addMethods, subtype } from './nitter';

function toGrouping(map) {
  return nitter(map.entries());
}

const grouptype = subtype({
  [Symbol.iterator]() {
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
      arr.forEach(fn, thisArg);
      return toGrouping(map);
    }

    const iterator = this.inst.iter();
    while (true) {
      const next = iterator.next();
      if (next.done) break;

      fn.apply(thisArg, [next.value]);
    }
    
    return toGrouping(map);
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
      elementSelector: elementSelector
    });
  }
});