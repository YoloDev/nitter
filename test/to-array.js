import should from 'should';
import { toArray } from '../src/index';
import { iterator } from './utils';

describe('::toArray()', () => {
  it('should be a function', () => {
    should(toArray).be.a.Function.with.property('name').which.equal('toArray');
  });

  it('should return the original array when passing `false` to `clone`', () => {
    const sut = [1, 2, 3];
    sut::toArray(false).should.equal(sut);
  });

  it('should return a new array when not setting `clone`', () => {
    const sut = [1, 2, 3];
    sut::toArray().should.not.equal(sut).and.eql(sut);
  });

  it('should create arrays of iterators', () => {
    const sut = iterator([1, 2, 3]);
    sut::toArray().should.eql([1, 2, 3]);
  });
});
