import should from 'should';
import { nitter, addMethods } from '../src/index';
import { iterator, ensureIterable } from './utils';

describe('::map()', () => {
  it('should be a function', () => {
    const sut = nitter([]);
    sut.should.have.property('map').which.is.a.Function;
  });

  it('should return an iterable', () => {
    const sut = nitter([]);
    const result = sut.map(v => v * 2);

    ensureIterable(result);
  });

  it('should return a seqence with the same length as the original', () => {
    const sut = nitter([1, 2, 3]);
    const result = sut.map(v => v * 2);

    result.count().should.equal(sut.count());
  });

  it('should be lazy', () => {
    let ran = false, index = 1;
    const sut = nitter([1, 2, 3]);
    const mapped = sut.map(v => {
      ran = true;
      return v * 2;
    });

    ran.should.be.false;

    for (let value of mapped) {
      ran.should.be.true;
      value.should.equal((index++) * 2);
    }
  });
});
