import should from 'should';
import { nitter, addMethods } from '../src/index';
import { iterator } from './utils';

describe('#nitter', () => {
  it('should be a function', () => {
    nitter.should.be.a.Function;
  });

  it('should throw if called with no arguments', () => {
    (() => nitter()).should.throw();
  });

  it('should accept arrays', () => {
    (() => nitter([])).should.not.throw();
  });

  it('should accept iterators', () => {
    (() => nitter(iterator([]))).should.not.throw();
  });

  it('should throw if given non-iterable argument', () => {
    (() => nitter({})).should.throw();
  });

  it('should return it\'s argument if a nitter is passed', () => {
    const expected = nitter([]);
    const actual = nitter(expected);

    actual.should.equal(expected);
  });

  describe('::arr', () => {
    it('should return null if not an array', () => {
      nitter(iterator([])).__runInnerTest(sut => {
        const arr = sut.arr();
        should(arr).be.null;
      });
    });

    it('should return the array if it is an array', () => {
      const arr = [];
      nitter(arr).__runInnerTest(sut => {
        const result = sut.arr();
        should(result).not.be.null.and.equal(arr);
      });
    });
  });

  describe('::iter', () => {
    it('should return the iterator', () => {
      nitter([]).__runInnerTest(sut => {
        sut.iter().should.have.property('next').which.is.a.Function;
      });
    });
  });

  describe('::isNitter', () => {
    it('should return true for a nitter', () => {
      const isNitter = nitter.isNitter(nitter([]));
      isNitter.should.be.true;
    });

    it('should return false for anything else', () => {
      const isNitter = nitter.isNitter('test');
      isNitter.should.be.false;
    });
  });
});

describe('#addMethods', () => {
  it('should add methods to nitters', () => {
    (() => {
      addMethods({
        __return_5() {
          return 5;
        },

        __return_arr() {
          return this.arr();
        }
      });
    }).should.not.throw();

    const arr = [1, 2, 3];
    const sut = nitter(arr);
    sut.should.have.property('__return_5').which.is.a.Function;
    sut.__return_5().should.equal(5);

    sut.should.have.property('__return_arr').which.is.a.Function;
    sut.__return_arr().should.equal(arr);
  });

  it('should not throw if you add the same function multiple times', () => {
    const fns = {
      __fn() { return true; }
    };

    (() => addMethods(fns)).should.not.throw();
    (() => addMethods(fns)).should.not.throw();
    (() => addMethods(fns)).should.not.throw();
  });

  it('should throw if you try to overwrite a function', () => {
    const fns1 = {
      __fn2() { return 2; }
    };

    const fns2 = {
      __fn2() { return 3; }
    };

    (() => addMethods(fns1)).should.not.throw();
    (() => addMethods(fns2)).should.throw();
  });
});
