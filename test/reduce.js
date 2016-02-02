import should from 'should';
import { reduce, sum } from '../src/index';
import { iterator } from './utils';

describe('::reduce()', () => {
  it('should be a function', () => {
    should(reduce).be.a.Function.with.property('name').which.equal('reduce');
  });

  it('should return the reduction of arrays', () => {
    const sut = [1, 2, 3];
    sut::reduce((a, b) => a + b, 0).should.equal(6);
  });

  it('should return the reduction of elements of iterators', () => {
    const sut = iterator([1, 2, 3]);
    sut::reduce((a, b) => a + b, 0).should.equal(6);
  });

  describe('::sum()', () => {
    it('should be a function', () => {
      should(sum).be.a.Function.with.property('name').which.equal('sum');
    });

    it('should sum elements in an iterable', () => {
      const sut = iterator([1, 2, 3]);
      sut::sum().should.equal(6);
    });
  });

  // describe('::reverse()', () => {
  //   it('should reverse an iterable', () => {
  //     const sut = nitter(iterator([1, 2, 3]));
  //     sut.reverse().toArray().should.eql([3, 2, 1]);
  //   });
  // });
});
