import should from 'should';
import { take, map, toArray } from '../src/index';
import { ensureIterable } from './utils';

describe('::take()', () => {
  it('should be a function', () => {
    should(take).be.a.Function.with.property('name').which.equal('take');
  });

  it('should return an iterable', () => {
    const sut = [];
    const result = sut::take(2);

    ensureIterable(result);
  });

  it('should return a seqence with the first n elements removed length as the original', () => {
    const sut = [1, 2, 3];
    const result = sut::take(2);

    result::toArray().should.eql([1, 2]);
  });

  it('should fail if not passed a number or less than 0', () => {
    const sut = [1, 2, 3];
    (() => sut::take()).should.throw();
    (() => sut::take('foo')).should.throw();
    (() => sut::take(-1)).should.throw();
  });

  it('should work on too short sequences', () => {
    const sut = [1, 2, 3];
    const result = sut::take(5);

    result::toArray().should.eql([1, 2, 3]);
  });

  it('should be lazy', () => {
    let ran = false, index = 0;
    const sut = [1, 2, 3];
    const mapped = sut::map(v => {
      ran = true;
      index++;
      return v * 2;
    })::take(2);

    ran.should.be.false;

    for (const value of mapped) {
      ran.should.be.true;
      value.should.equal(index * 2);
    }
  });
});
