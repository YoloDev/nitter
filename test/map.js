import should from 'should';
import { map, count } from '../src/index';
import { ensureIterable } from './utils';

describe('::map()', () => {
  it('should be a function', () => {
    should(map).be.a.Function.with.property('name').which.equal('map');
  });

  it('should return an iterable', () => {
    const sut = [];
    const result = sut::map(v => v * 2);

    ensureIterable(result);
  });

  it('should throw if not given a function', () => {
    const sut = [];
    (() => sut::map()).should.throw('Expected fn to be a function, got undefined.');
    (() => sut::map(null)).should.throw('Expected fn to be a function, got null.');
    (() => sut::map(5)).should.throw('Expected fn to be a function, got 5.');
  });

  it('should return a seqence with the same length as the original', () => {
    const sut = [1, 2, 3];
    const result = sut::map(v => v * 2);

    result::count().should.equal(sut::count());
  });

  it('should be lazy', () => {
    let ran = false, index = 0;
    const sut = [1, 2, 3];
    const mapped = sut::map(v => {
      ran = true;
      index++;
      return v * 2;
    });

    ran.should.be.false;
    index.should.equal(0);

    for (const value of mapped) {
      ran.should.be.true;
      value.should.equal(index * 2);
    }
  });
});
