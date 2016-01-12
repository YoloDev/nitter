import should from 'should';
import { nitter, addMethods } from '../src/index';
import { iterator } from './utils';

describe('::count()', () => {
  it('should be a function', () => {
    const sut = nitter([]);
    sut.should.have.property('count').which.is.a.Function;
  });

  it('should return the length of arrays', () => {
    const sut = nitter([1, 2, 3]);
    sut.count().should.equal(3);
  });

  it('should count the elements of iterators', () => {
    const sut = nitter(iterator([1, 2, 3]));
    sut.count().should.equal(3);
  });
});
