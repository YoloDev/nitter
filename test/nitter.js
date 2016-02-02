import should from 'should';
import { makeNitterFn, subtype, lazy } from '../src/nitter';

describe('#makeNitterFn', () => {
  it('should be a function', () => {
    should(makeNitterFn).be.a.Function;
  });

  it('should only be callable with named functions', () => {
    (() => makeNitterFn()).should.throw('Expected fn to be a function, but got undefined instead.');
    (() => makeNitterFn(null)).should.throw('Expected fn to be a function, but got null instead.');
    (() => makeNitterFn(5)).should.throw('Expected fn to be a function, but got 5 instead.');
    (() => makeNitterFn('per')).should.throw('Expected fn to be a function, but got per instead.');
    (() => makeNitterFn({})).should.throw('Expected fn to be a function, but got [object Object] instead.');
    (() => makeNitterFn(() => {})).should.throw('makeNitterFn must be called on a named function.');
    (() => makeNitterFn(function test() {})).should.not.throw(); // eslint-disable-line prefer-arrow-callback
  });

  it('should return a function', () => {
    makeNitterFn(function test() {}).should.be.Function; // eslint-disable-line prefer-arrow-callback
  });

  it('should work', () => {
    let called = 0;
    const fn = makeNitterFn(test);

    fn.fn.should.equal(test);
    called.should.equal(0);
    []::fn().should.equal(0);
    called.should.equal(1);
    fn().should.be.a.Function;
    called.should.equal(1);
    fn()([]).should.equal(1);
    called.should.equal(2);

    function test() {
      return called++;
    }
  });
});
