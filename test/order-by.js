import should from 'should';
import { spy } from 'sinon';
import { orderBy, orderByDescending, thenBy, thenByDescending, count, toArray, setLogSink } from '../src/index';
import { ensureIterable } from './utils';

describe('::orderBy()', () => {
  it('should be a function', () => {
    should(orderBy).be.a.Function.with.property('name').which.equal('orderBy');
  });

  it('should return an iterable', () => {
    const sut = [];
    const result = sut::orderBy();

    ensureIterable(result);
  });

  it('should return a seqence with the same length as the original', () => {
    const sut = [1, 2, 3];
    const result = sut::orderBy();

    result::count().should.equal(sut::count());
  });

  it('should return a ordered sequence', () => {
    const sut = [2, 3, 1, 1];
    const ordered = sut::orderBy();
    const result = ordered::toArray();

    result.should.eql([1, 1, 2, 3]);

    // Test again simply to ensure that the caching of sort functions
    // doesn't break stuff.
    ordered::toArray().should.eql([1, 1, 2, 3]);
  });

  it('should warn if you try to re-order a collection', () => {
    const log = spy();
    setLogSink(log);

    try {
      const sut = [2, 3, 1, 1]::orderBy();
      log.callCount.should.equal(0);
      sut::orderBy();
      log.callCount.should.equal(1);
      log.firstCall.args[0].should.equal('warn');
      log.firstCall.args[1][0].should.equal('::orderBy ran on an already ordered iterator.');
    } finally {
      setLogSink(null);
    }
  });

  it('should sort on named properties', () => {
    const sut = [
      { id: 1 },
      { id: 3 },
      { id: 2 }
    ];
    const result = sut::orderBy('id')::toArray();

    result.should.eql([
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ]);
  });

  it('should sort on function getters', () => {
    const sut = [
      { id: 1 },
      { id: 3 },
      { id: 2 }
    ];
    const result = sut::orderBy(item => item.id)::toArray();

    result.should.eql([
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ]);
  });

  it('should accept custom matchers', () => {
    const sut = [
      { id: 1 },
      { id: 3 },
      { id: 2 },
      { id: 1 }
    ];
    const result = sut::orderBy(item => item.id, (a, b) => {
      if (a < b) {
        return 1;
      }

      if (b < a) {
        return -1;
      }

      return 0;
    })::toArray();

    result.should.eql([
      { id: 3 },
      { id: 2 },
      { id: 1 },
      { id: 1 }
    ]);
  });
});

describe('::orderByDescending()', () => {
  it('should be a function', () => {
    should(orderByDescending).be.a.Function.with.property('name').which.equal('orderByDescending');
  });

  it('should return an iterable', () => {
    const sut = [];
    const result = sut::orderByDescending();

    ensureIterable(result);
  });

  it('should return a seqence with the same length as the original', () => {
    const sut = [1, 2, 3];
    const result = sut::orderByDescending();

    result::count().should.equal(sut::count());
  });

  it('should return a ordered sequence', () => {
    const sut = [2, 3, 1, 1];
    const result = sut::orderByDescending()::toArray();

    result.should.eql([3, 2, 1, 1]);
  });

  it('should warn if you try to re-order a collection', () => {
    const log = spy();
    setLogSink(log);

    try {
      const sut = [2, 3, 1, 1]::orderBy();
      log.callCount.should.equal(0);
      sut::orderByDescending();
      log.callCount.should.equal(1);
      log.firstCall.args[0].should.equal('warn');
      log.firstCall.args[1][0].should.equal('::orderByDescending ran on an already ordered iterator.');
    } finally {
      setLogSink(null);
    }
  });

  it('should sort on named properties', () => {
    const sut = [
      { id: 1 },
      { id: 3 },
      { id: 2 }
    ];
    const result = sut::orderByDescending('id')::toArray();

    result.should.eql([
      { id: 3 },
      { id: 2 },
      { id: 1 }
    ]);
  });

  it('should sort on function getters', () => {
    const sut = [
      { id: 1 },
      { id: 3 },
      { id: 2 }
    ];
    const result = sut::orderByDescending(item => item.id)::toArray();

    result.should.eql([
      { id: 3 },
      { id: 2 },
      { id: 1 }
    ]);
  });

  it('should accept custom matchers', () => {
    const sut = [
      { id: 1 },
      { id: 3 },
      { id: 2 },
      { id: 1 }
    ];
    const result = sut::orderByDescending(item => item.id, (a, b) => {
      if (a < b) {
        return 1;
      }

      if (b < a) {
        return -1;
      }

      return 0;
    })::toArray();

    result.should.eql([
      { id: 1 },
      { id: 1 },
      { id: 2 },
      { id: 3 }
    ]);
  });
});

describe('::thenBy()', () => {
  it('should be a function', () => {
    should(thenBy).be.a.Function.with.property('name').which.equal('thenBy');
  });

  it('should only be callable on ordered nitters', () => {
    const sut1 = [];
    const sut2 = sut1::orderBy();
    const sut3 = sut1::orderByDescending();

    (() => sut1::thenBy()).should.throw(`Function ::thenBy can only run on objects of type Nitter:OrderBy.`);
    (() => sut2::thenBy()).should.not.throw();
    (() => sut3::thenBy()).should.not.throw();
  });

  it('should return an iterable', () => {
    const sut = []::orderBy();
    const result = sut::thenBy();

    ensureIterable(result);
  });

  it('should return a seqence with the same length as the original', () => {
    const sut = [1, 2, 3]::orderBy();
    const result = sut::thenBy();

    result::count().should.equal(sut::count());
  });

  it('should return a ordered sequence', () => {
    const sut = [
      { a: 1, b: 2 },
      { a: 1, b: 1 },
      { a: 2, b: 2 },
      { a: 2, b: 1 }
    ]::orderBy('a');
    const result = sut::thenBy('b')::toArray();

    result.should.eql([
      { a: 1, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 1 },
      { a: 2, b: 2 }
    ]);
  });

  it('should sort on function getters', () => {
    const sut = [
      { a: 1, b: 2 },
      { a: 1, b: 1 },
      { a: 2, b: 2 },
      { a: 2, b: 1 }
    ]::orderBy('a');
    const result = sut::thenBy(item => item.b)::toArray();

    result.should.eql([
      { a: 1, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 1 },
      { a: 2, b: 2 }
    ]);
  });

  it('should accept custom matchers', () => {
    const sut = [
      { a: 1, b: 2 },
      { a: 1, b: 1 },
      { a: 2, b: 2 },
      { a: 2, b: 1 }
    ]::orderBy('a');
    const result = sut::thenBy(item => item.b, (a, b) => {
      if (a < b) {
        return 1;
      }

      if (b < a) {
        return -1;
      }

      return 0;
    })::toArray();

    result.should.eql([
      { a: 1, b: 2 },
      { a: 1, b: 1 },
      { a: 2, b: 2 },
      { a: 2, b: 1 }
    ]);
  });
});

describe('::thenByDescending()', () => {
  it('should be a function', () => {
    should(thenByDescending).be.a.Function.with.property('name').which.equal('thenByDescending');
  });

  it('should only be callable on ordered nitters', () => {
    const sut1 = [];
    const sut2 = sut1::orderBy();
    const sut3 = sut1::orderByDescending();

    (() => sut1::thenByDescending()).should.throw(`Function ::thenByDescending can only run on objects of type Nitter:OrderBy.`);
    (() => sut2::thenByDescending()).should.not.throw();
    (() => sut3::thenByDescending()).should.not.throw();
  });

  it('should return an iterable', () => {
    const sut = []::orderBy();
    const result = sut::thenByDescending();

    ensureIterable(result);
  });

  it('should return a seqence with the same length as the original', () => {
    const sut = [1, 2, 3]::orderBy();
    const result = sut::thenByDescending();

    result::count().should.equal(sut::count());
  });

  it('should return a ordered sequence', () => {
    const sut = [
      { a: 1, b: 2 },
      { a: 1, b: 1 },
      { a: 2, b: 2 },
      { a: 2, b: 1 }
    ]::orderBy('a');
    const result = sut::thenByDescending('b')::toArray();

    result.should.eql([
      { a: 1, b: 2 },
      { a: 1, b: 1 },
      { a: 2, b: 2 },
      { a: 2, b: 1 }
    ]);
  });

  it('should sort on function getters', () => {
    const sut = [
      { a: 1, b: 2 },
      { a: 1, b: 1 },
      { a: 2, b: 2 },
      { a: 2, b: 1 }
    ]::orderBy('a');
    const result = sut::thenByDescending(item => item.b)::toArray();

    result.should.eql([
      { a: 1, b: 2 },
      { a: 1, b: 1 },
      { a: 2, b: 2 },
      { a: 2, b: 1 }
    ]);
  });

  it('should accept custom matchers', () => {
    const sut = [
      { a: 1, b: 2 },
      { a: 1, b: 1 },
      { a: 2, b: 2 },
      { a: 2, b: 1 }
    ]::orderBy('a');
    const result = sut::thenByDescending(item => item.b, (a, b) => {
      if (a < b) {
        return 1;
      }

      if (b < a) {
        return -1;
      }

      return 0;
    })::toArray();

    result.should.eql([
      { a: 1, b: 1 },
      { a: 1, b: 2 },
      { a: 2, b: 1 },
      { a: 2, b: 2 }
    ]);
  });
});
