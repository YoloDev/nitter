import should from 'should';
import { nitter, addMethods } from '../src/index';
import { iterator, ensureIterable } from './utils';

describe('::filter()', () => {
  it('should be a function', () => {
    const sut = nitter([]);
    sut.should.have.property('filter').which.is.a.Function;
  });

  it('should return an iterable', () => {
    const sut = nitter([1,2,3,4]);
    const result = sut.filter(v => v > 2);

    ensureIterable(result);
  });

  it('should filter out values based on predicate', () => {
    const sut = nitter([1, 2, 3, 4]);
    const result = sut.filter(v => v > 2);

    result.toArray().should.eql([3,4]);
  });

  it('should be lazy', () => {
    let ran = false, index = 0;
    const sut = nitter([1, 2, 3, 4]);
    const filtered = sut.filter(v => {
      ran = true;
      index++;
      return v > 2;
    });

    ran.should.be.false;
    index.should.equal(0);

    for (let value of filtered) {
      ran.should.be.true;
      value.should.equal(index);
    }
  });
});
