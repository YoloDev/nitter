import should from 'should';
import { addMethods, nitter } from '../src/index';

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

export function ensureNitter(obj) {
  const isNitter = nitter.isNitter(obj);
  isNitter.should.be.true;
}
