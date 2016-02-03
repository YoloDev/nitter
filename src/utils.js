export function frozenNew(base, props = null) {
  if (props === null) {
    props = base;
    base = {};
  }

  return Object.freeze(Object.create(base, props));
}

export const setName = (() => {
  const { configurable } = Object.getOwnPropertyDescriptor(func, 'name');

  /* istanbul ignore next: fallback is for old browsers only */
  return !configurable ?
    function setName() { /* browser doesn't support it */} :
    function setName(fn, name) {
      define(fn, 'name', name, true);
    };

  /* istanbul ignore next: fallback is for old browsers only */
  function func() {}
})();

export function define(obj, name, value, configurable = false, writable = false, enumerable = false) {
  Object.defineProperty(obj, name, { value, configurable, writable, enumerable });
}

export function prop(value, configurable = false, writable = false, enumerable = false) {
  return { value, configurable, writable, enumerable };
}

/* istanbul ignore next: just calls standard console.xxx methods */
function defaultLog(type, args) {
  console[type](...args);
}

let logSink = defaultLog;

/* istanbul ignore next: default value causes "issues" */
export function setLogSink(fn = null) {
  if (fn === null) {
    fn = defaultLog;
  }

  logSink = fn;
}

export function logMessage(type, args) {
  logSink(type, args);
}

function makeLogger(name) {
  setName(log, name);
  return log;

  function log(...args) {
    logMessage(name, args);
  }
}

export const log = makeLogger('log');
export const warn = makeLogger('warn');
export const error = makeLogger('error');
export const info = makeLogger('info');
