import should from 'should';
import { filter, toArray } from '../src/index';
import { ensureIterable } from './utils';

describe('::filter()', () => {
  it('should be a function', () => {
    should(filter).be.a.Function.with.property('name').which.equal('filter');
  });

  it('should return an iterable', () => {
    const sut = [1,2,3,4];
    const result = sut::filter(v => v > 2);

    ensureIterable(result);
  });

  it('should throw if not given a function', () => {
    const sut = [];
    (() => sut::filter()).should.throw('Expected fn to be a function, got undefined.');
    (() => sut::filter(null)).should.throw('Expected fn to be a function, got null.');
    (() => sut::filter(5)).should.throw('Expected fn to be a function, got 5.');
  });

  it('should filter out values based on predicate', () => {
    const sut = [1, 2, 3, 4];
    const result = sut::filter(v => v > 2);

    result::toArray().should.eql([3,4]);
  });

  it('should be lazy', () => {
    let ran = false, index = 0;
    const sut = [1, 2, 3, 4];
    const filtered = sut::filter(v => {
      ran = true;
      index++;
      return v > 2;
    });

    ran.should.be.false;
    index.should.equal(0);

    for (const value of filtered) {
      ran.should.be.true;
      value.should.equal(index);
    }
  });
});
