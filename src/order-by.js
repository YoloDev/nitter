import { makeNitterFn, subtype, lazy } from './nitter';
import { toArray } from './to-array';
import { warn } from './utils';

const orderByType = subtype('Nitter:OrderBy', (lazy) => lazy()());

export const orderBy = makeNitterFn(
  function orderBy(n, fn = null, matcher = defaultMatcher) { // eslint-disable-line prefer-arrow-callback
    if (orderByType.is(n._)) {
      warn('::orderBy ran on an already ordered iterator.');
    }

    const orderers = [orderer(fn, matcher)];
    return orderByType(createLazySort(n, orderers), orderers);
  });

export const orderByDescending = makeNitterFn(
  function orderByDescending(n, fn = null, matcher = defaultMatcher) { // eslint-disable-line prefer-arrow-callback
    if (orderByType.is(n._)) {
      warn('::orderByDescending ran on an already ordered iterator.');
    }

    const orderers = [orderer(fn, matcher, true)];
    return orderByType(createLazySort(n, orderers), orderers);
  });

export const thenBy = makeNitterFn(
  function thenBy(n, fn = null, matcher = defaultMatcher) { // eslint-disable-line prefer-arrow-callback
    const orderers = orderByType.data(n._)[1].concat(orderer(fn, matcher));
    return orderByType(createLazySort(n, orderers), orderers);
  }, orderByType);

export const thenByDescending = makeNitterFn(
  function thenByDescending(n, fn = null, matcher = defaultMatcher) { // eslint-disable-line prefer-arrow-callback
    const orderers = orderByType.data(n._)[1].concat(orderer(fn, matcher, true));
    return orderByType(createLazySort(n, orderers), orderers);
  }, orderByType);

function createLazySort(n, orderers) {
  return lazy(() => {
    const arr = toArray.fn(n);
    arr.sort(sorter);
    return ::arr[Symbol.iterator];
  });

  function sorter(a, b) {
    for (const { fn, matcher, descending } of orderers) {
      let matchResult = matcher(fn(a), fn(b));
      if (descending) {
        matchResult *= -1;
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

  return { fn, matcher, descending };
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
