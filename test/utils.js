import should from 'should';
import { addMethods } from '../lib/index';

addMethods({
  __runInnerTest(fn) {
    fn(this);
  }
});

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