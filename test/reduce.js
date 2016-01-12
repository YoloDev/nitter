import should from 'should';
import { nitter, addMethods } from '../src/index';
import { iterator } from './utils';

describe('::reduce()', () => {
  it('should be a function', () => {
    const sut = nitter([]);
    sut.should.have.property('reduce').which.is.a.Function;
  });

  it('should return the reduction of arrays', () => {
    const sut = nitter([1, 2, 3]);
    sut.reduce((a, b) => a + b, 0).should.equal(6);
  });

  it('should return the reduction of elements of iterators', () => {
    const sut = nitter(iterator([1, 2, 3]));
    sut.reduce((a, b) => a + b, 0).should.equal(6);
  });

  describe('::sum()', () => {
    it('should sum elements in a nitter', () => {
      const sut = nitter(iterator([1, 2, 3]));
      sut.sum().should.equal(6);
    });
  });
});
