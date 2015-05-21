const symb = Symbol('nitter');
const proto = Object.create({}, {
  [Symbol.iterator]: {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function getIterator() {
      return this[symb].iter();
    }
  }
});
const wrapper = Object.create({}, {
  iter: {
    configurable: false,
	  enumerable: false,
    writable: false,
	  value: function iter() {
		  return this._[Symbol.iterator]();
	  }
  },
  
  arr: {
    configurable: false,
    enumerable: false,
    writable: false,
    value: function arr() {
      const _ = this._;
      return Array.isArray(_) ? _ : null;
    }
  }
});

export function nitter(iterable) {
  if (iterable === null || iterable === undefined) {
    throw new Error('Argument cannot be null or undefined.');
  }
  
  if (!iterable[Symbol.iterator]) {
    throw new Error('Argument must be an iterable.');
  }
  
  if (iterable[symb]) {
    return iterable;
  }

  const wrapped = Object.create(wrapper, {
    _: {
      configurable: false,
      enumerable: false,
      writable: false,
      value: iterable
    }
  });
  
  const ret = Object.create(proto, {
    [symb]: {
      configurable: false,
      enumerable: false,
      writable: false,
      value: wrapped
    }
  });

  Object.defineProperty(wrapped, 'nitter', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: ret
  });

  return ret;
}

export function addMethods(methods) {
  Object.keys(methods).forEach(m => {
    const val = methods[m];
    if (proto[m] && proto[m].fn) {
      if (proto[m].fn !== val) {
        throw new Error(`nitter already has a method by the name of ${m} implemented.`);        
      } else {
        return;
      }
    }
    
    Object.defineProperty(proto, m, {
      configurable: false,
      enumerable: false,
      writable: false,
      value: createProtoFn(val)
    });
  });
}

function createProtoFn(fn) {
  const ret = function(...args) {
    return fn.apply(this[symb], args);
  };
  ret.fn = fn;
  return ret;
}

function getDescriptors(proto, map = v => v) {
  const ret = {};
  Object.getOwnPropertyNames(proto).forEach(k => {
    ret[k] = {
      configurable: false,
      enumerable: false,
      writable: false,
      value: map(proto[k])
    };
  });
  Object.getOwnPropertySymbols(proto).forEach(k => {
    ret[k] = {
      configurable: false,
      enumerable: false,
      writable: false,
      value: map(proto[k])
    };
  });
  
  return ret;
}

function armortize(proto) {
  return Object.create({}, getDescriptors(proto));
}

export function subtype(proto = null, statics = null, extend = null) {
  const symbol = Symbol();
  proto = armortize(proto || {});
  statics = armortize(statics || {});
  
  return Object.create(statics, {
    is: {
      configurable: false,
      enumerable: false,
      writable: false,
      value: function is(inst) {
        return !!inst[symbol];
      }
    },
    
    create: {
      configurable: false,
      enumerable: false,
      writable: false,
      value: function create(props) {
        let ret = nitter(Object.create(proto, getDescriptors(props)));
        if (extend) {
          ret = Object.create(ret, getDescriptors(extend, createProtoFn));
        }
        
        return ret;
      }
    }
  });
}