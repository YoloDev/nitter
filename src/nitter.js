import { setName, define, prop } from './utils';

export function makeNitterFn(fn, type = null) {
  if (typeof fn !== 'function') {
    throw new Error(`Expected fn to be a function, but got ${fn} instead.`);
  }

  if (!fn.name) {
    throw new Error(`makeNitterFn must be called on a named function.`);
  }

  setName(ret, fn.name);
  define(ret, 'fn', fn);
  return ret;

  function ret(...args) {
    if (!isIterable(this)) { // eslint-disable-line no-invalid-this
      return n => ret.apply(n, args);
    }

    if (type !== null) {
      if (!type.is(this)) { // eslint-disable-line no-invalid-this
        throw new Error(`Function ::${fn.name} can only run on objects of type ${type.name}.`);
      }
    }

    return fn(wrap(this), ...args); // eslint-disable-line no-invalid-this
  }
}

export function subtype(name, iterate) {
  const symb = Symbol(`${name}-data`);
  setName(Type, name);
  define(Type.prototype, 'constructor', Type);
  define(Type.prototype, Symbol.iterator, function iterator() { // eslint-disable-line prefer-arrow-callback
    return iterate(...this[symb]); // eslint-disable-line no-invalid-this
  });
  define(Type, 'is', function is(inst) { // eslint-disable-line prefer-arrow-callback
    return inst instanceof Type;
  });
  define(Type, 'data', function data(inst) { // eslint-disable-line prefer-arrow-callback
    return inst[symb];
  });

  return Type;

  function Type(...args) {
    return Object.create(Type.prototype, {
      [symb]: prop(Object.freeze(args))
    });
  }
}

export function lazy(thunk) {
  let val, created = false;

  return () => {
    if (!created) {
      val = thunk();
      created = true;
    }

    return val;
  };
}

function isIterable(it) {
  return Boolean(it && it[Symbol.iterator]);
}

const wrapper = Object.create({}, {
  arr: prop(function arr() {
    const { _ } = this; // eslint-disable-line no-invalid-this
    return Array.isArray(_) ? _ : null;
  }),

  iter: prop(function itter() {
    return this[Symbol.iterator](); // eslint-disable-line no-invalid-this
  }),

  [Symbol.iterator]: prop(function iterator() {
    const { _ } = this; // eslint-disable-line no-invalid-this
    return _[Symbol.iterator]();
  })
});

export function wrap(iterable) {
  return Object.create(wrapper, {
    _: prop(iterable)
  });
}
