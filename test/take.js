import should from 'should';
import { nitter, addMethods } from '../src/index';
import { iterator, ensureIterable } from './utils';

describe('::take()', () => {
  it('should be a function', () => {
    const sut = nitter([]);
    sut.should.have.property('take').which.is.a.Function;
  });

  it('should return an iterable', () => {
    const sut = nitter([]);
    const result = sut.take(2);

    ensureIterable(result);
  });

  it('should return a seqence with the first n elements removed length as the original', () => {
    const sut = nitter([1, 2, 3]);
    const result = sut.take(2);

    result.toArray().should.eql([1, 2]);
  });

  it('should fail if not passed a number or less than 0', () => {
    const sut = nitter([1, 2, 3]);
    (() => sut.take()).should.throw();
    (() => sut.take('foo')).should.throw();
    (() => sut.take(-1)).should.throw();
  });

  it('should work on too short sequences', () => {
    const sut = nitter([1, 2, 3]);
    const result = sut.take(5);

    result.toArray().should.eql([1, 2, 3]);
  });

  it('should be lazy', () => {
    let ran = false, index = 0;
    const sut = nitter([1, 2, 3]);
    const mapped = sut.map(v => {
      ran = true;
      index++;
      return v * 2;
    }).take(2);

    ran.should.be.false;

    for (let value of mapped) {
      ran.should.be.true;
      value.should.equal(index * 2);
    }
  });
});
