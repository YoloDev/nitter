import should from 'should';
import { nitter, addMethods } from '../src/index';
import { iterator, ensureIterable } from './utils';

describe('::skip()', () => {
  it('should be a function', () => {
    const sut = nitter([]);
    sut.should.have.property('skip').which.is.a.Function;
  });

  it('should return an iterable', () => {
    const sut = nitter([]);
    const result = sut.skip(2);

    ensureIterable(result);
  });

  it('should return a seqence with the first n elements removed length as the original', () => {
    const sut = nitter([1, 2, 3]);
    const result = sut.skip(2);

    result.toArray().should.eql([3]);
  });

  it('should fail if not passed a number or the number is negative', () => {
    const sut = nitter([1, 2, 3]);
    (() => sut.skip()).should.throw();
    (() => sut.skip('foo')).should.throw();
    (() => sut.skip(-1)).should.throw();
  });

  it('should work on too short sequences', () => {
    const sut = nitter([1, 2, 3]);
    const result = sut.skip(5);

    result.toArray().should.eql([]);
  });

  it('should be lazy', () => {
    let ran = false, index = 0;
    const sut = nitter([1, 2, 3]);
    const mapped = sut.map(v => {
      ran = true;
      index++;
      return v * 2;
    }).skip(2);

    ran.should.be.false;
    index.should.equal(0);

    for (let value of mapped) {
      ran.should.be.true;
      value.should.equal(index * 2);
    }
  });
});
