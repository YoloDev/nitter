import should from 'should';
import { nitter, addMethods } from '../src/index';
import { iterator } from './utils';

describe('::toArray()', () => {
  it('should be a function', () => {
    const sut = nitter([]);
    sut.should.have.property('toArray').which.is.a.Function;
  });

  it('should return the original array when passing `false` to `clone`', () => {
    const arr = [1, 2, 3];
    const sut = nitter(arr);
    sut.toArray(false).should.equal(arr);
  });

  it('should return a new array when not setting `clone`', () => {
    const arr = [1, 2, 3];
    const sut = nitter(arr);
    sut.toArray().should.not.equal(arr).and.eql(arr);
  });

  it('should create arrays of iterators', () => {
    const sut = nitter(iterator([1, 2, 3]));
    sut.toArray().should.eql([1, 2, 3]);
  });
});
