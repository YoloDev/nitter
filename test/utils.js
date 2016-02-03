import should from 'should';
import { subtype, makeNitterFn } from '../src/index';

(() => {
  // hack to make istanbul happy :-/
  subtype('foo', () => {});
  makeNitterFn(iterator)
})();

export function iterator(arr) {
  return {
    [Symbol.iterator]: arr[Symbol.iterator].bind(arr)
  };
}

export function ensureIterable(iterable) {
  should.exist(iterable);
  const fn = iterable[Symbol.iterator];
  should.exist(fn);
  fn.should.be.a.Function;
}
