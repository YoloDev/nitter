import { nitter, addMethods, subtype } from './nitter';

export const orderbytype = subtype({
  [Symbol.iterator]() {
    const values = this.inst.nitter.toArray();
    values.sort(createSorter(this.orderers));
    return values[Symbol.iterator]();
  }
}, null, {
  thenBy(fn = null, matcher = defaultMatcher) {
    const _ = this._;
    const order = orderer(fn, matcher);
    
    return orderbytype.create({
      inst: _.inst,
      orderers: _.orderers.concat(order)
    });
  },
  
  thenByDescending(fn = null, matcher = defaultMatcher) {
    const _ = this._;
    const order = orderer(fn, matcher, true);
    
    return orderbytype.create({
      inst: _.inst,
      orderers: _.orderers.concat(order)
    });
  }
});

addMethods({
  orderBy(fn = null, matcher = defaultMatcher) {
    const order = orderer(fn, matcher);
    
    return orderbytype.create({
      inst: this,
      orderers: [order]
    });
  },
  
  orderByDescending(fn = null, matcher = defaultMatcher) {
    const order = orderer(fn, matcher, true);
    
    return orderbytype.create({
      inst: this,
      orderers: [order]
    });
  }
});

function createSorter(orderers) {
  if (orderers.sorter) {
    return orderers.sorter;
  }
  
  return orderers.sorter = (a, b) => {
    for (let {fn, matcher, descending} of orderers) {
      let matchResult = matcher(fn(a), fn(b));
      if (descending) {
        if (matchResult === -1) {
          matchResult = 1;
        } else if (matchResult === 1) {
          matchResult = -1;
        }
      }
      
      if (matchResult !== 0) {
        return matchResult;
      }
    }
    
    return 0;
  };
}

function id(arg) {
  return arg;
}

function prop(name) {
  return arg => arg[name];
}

function orderer(fn, matcher, descending = false) {
  if (fn === null) {
    fn = id;
  }
  
  if (typeof fn === 'string') {
    fn = prop(fn);
  }
  
  return {fn, matcher, descending};
}

function defaultMatcher(a, b) {
  if (a < b) {
    return -1;
  }
  
  if (b < a) {
    return 1;
  }
  
  return 0;
}