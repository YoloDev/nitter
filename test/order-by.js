import should from 'should';
import { nitter } from '../lib/index';
import { iterator, ensureIterable } from './utils';

describe('::orderBy()', () => {
  it('should be a function', () => {
    const sut = nitter([]);
    sut.should.have.property('orderBy').which.is.a.Function;
  });
  
  it('should return an iterable', () => {
    const sut = nitter([]);
    const result = sut.orderBy();
    
    ensureIterable(result);
  });
  
  it('should return a seqence with the same length as the original', () => {
    const sut = nitter([1, 2, 3]);
    const result = sut.orderBy();
    
    result.count().should.equal(sut.count());
  });
  
  it('should return a ordered sequence', () => {
    const sut = nitter([2, 3, 1, 1]);
    const ordered = sut.orderBy();
    const result = ordered.toArray();
    
    result.should.eql([1, 1, 2, 3]);
    
    // Test again simply to ensure that the caching of sort functions
    // doesn't break stuff.
    ordered.toArray().should.eql([1, 1, 2, 3]);
  });
  
  it('should sort on named properties', () => {
    const sut = nitter([
      {id: 1},
      {id: 3},
      {id: 2}
    ]);
    const result = sut.orderBy('id').toArray();
    
    result.should.eql([
      {id: 1},
      {id: 2},
      {id: 3}
    ]);
  });
  
  it('should sort on function getters', () => {
    const sut = nitter([
      {id: 1},
      {id: 3},
      {id: 2}
    ]);
    const result = sut.orderBy(item => item.id).toArray();
    
    result.should.eql([
      {id: 1},
      {id: 2},
      {id: 3}
    ]);
  });
  
  it('should accept custom matchers', () => {
    const sut = nitter([
      {id: 1},
      {id: 3},
      {id: 2},
      {id: 1}
    ]);
    const result = sut.orderBy(item => item.id, (a, b) => {
      if (a < b) return 1;
      if (b < a) return -1;
      return 0;
    }).toArray();
    
    result.should.eql([
      {id: 3},
      {id: 2},
      {id: 1},
      {id: 1}
    ]);
  });
});

describe('::orderByDescending()', () => {
  it('should be a function', () => {
    const sut = nitter([]);
    sut.should.have.property('orderByDescending').which.is.a.Function;
  });
  
  it('should return an iterable', () => {
    const sut = nitter([]);
    const result = sut.orderByDescending();
    
    ensureIterable(result);
  });
  
  it('should return a seqence with the same length as the original', () => {
    const sut = nitter([1, 2, 3]);
    const result = sut.orderByDescending();
    
    result.count().should.equal(sut.count());
  });
  
  it('should return a ordered sequence', () => {
    const sut = nitter([2, 3, 1, 1]);
    const result = sut.orderByDescending().toArray();
    
    result.should.eql([3, 2, 1, 1]);
  });
  
  it('should sort on named properties', () => {
    const sut = nitter([
      {id: 1},
      {id: 3},
      {id: 2}
    ]);
    const result = sut.orderByDescending('id').toArray();
    
    result.should.eql([
      {id: 3},
      {id: 2},
      {id: 1}
    ]);
  });
  
  it('should sort on function getters', () => {
    const sut = nitter([
      {id: 1},
      {id: 3},
      {id: 2}
    ]);
    const result = sut.orderByDescending(item => item.id).toArray();
    
    result.should.eql([
      {id: 3},
      {id: 2},
      {id: 1}
    ]);
  });
  
  it('should accept custom matchers', () => {
    const sut = nitter([
      {id: 1},
      {id: 3},
      {id: 2},
      {id: 1}
    ]);
    const result = sut.orderByDescending(item => item.id, (a, b) => {
      if (a < b) return 1;
      if (b < a) return -1;
      return 0;
    }).toArray();
    
    result.should.eql([
      {id: 1},
      {id: 1},
      {id: 2},
      {id: 3}
    ]);
  });
});

describe('::thenBy()', () => {
  it('should be a function on ordered nitters', () => {
    const sut1 = nitter([]);
    const sut2 = sut1.orderBy();
    const sut3 = sut1.orderByDescending();
    
    sut1.should.not.have.property('thenBy');
    sut2.should.have.property('thenBy').which.is.a.Function;
    sut2.should.have.property('thenBy').which.is.a.Function;
  });
  
  it('should return an iterable', () => {
    const sut = nitter([]).orderBy();
    const result = sut.thenBy();
    
    ensureIterable(result);
  });
  
  it('should return a seqence with the same length as the original', () => {
    const sut = nitter([1, 2, 3]).orderBy();
    const result = sut.thenBy();
    
    result.count().should.equal(sut.count());
  });
  
  it('should return a ordered sequence', () => {
    const sut = nitter([
      {a: 1, b: 2},
      {a: 1, b: 1},
      {a: 2, b: 2},
      {a: 2, b: 1}
    ]).orderBy('a');
    const result = sut.thenBy('b').toArray();
    
    result.should.eql([
      {a: 1, b: 1},
      {a: 1, b: 2},
      {a: 2, b: 1},
      {a: 2, b: 2}
    ]);
  });
  
  it('should sort on function getters', () => {
    const sut = nitter([
      {a: 1, b: 2},
      {a: 1, b: 1},
      {a: 2, b: 2},
      {a: 2, b: 1}
    ]).orderBy('a');
    const result = sut.thenBy(item => item.b).toArray();
    
    result.should.eql([
      {a: 1, b: 1},
      {a: 1, b: 2},
      {a: 2, b: 1},
      {a: 2, b: 2}
    ]);
  });
  
  it('should accept custom matchers', () => {
    const sut = nitter([
      {a: 1, b: 2},
      {a: 1, b: 1},
      {a: 2, b: 2},
      {a: 2, b: 1}
    ]).orderBy('a');
    const result = sut.thenBy(item => item.b, (a, b) => {
      if (a < b) return 1;
      if (b < a) return -1;
      return 0;
    }).toArray();
    
    result.should.eql([
      {a: 1, b: 2},
      {a: 1, b: 1},
      {a: 2, b: 2},
      {a: 2, b: 1}
    ]);
  });
});

describe('::thenByDescending()', () => {
  it('should be a function on ordered nitters', () => {
    const sut1 = nitter([]);
    const sut2 = sut1.orderBy();
    const sut3 = sut1.orderByDescending();
    
    sut1.should.not.have.property('thenByDescending');
    sut2.should.have.property('thenByDescending').which.is.a.Function;
    sut2.should.have.property('thenByDescending').which.is.a.Function;
  });
  
  it('should return an iterable', () => {
    const sut = nitter([]).orderBy();
    const result = sut.thenByDescending();
    
    ensureIterable(result);
  });
  
  it('should return a seqence with the same length as the original', () => {
    const sut = nitter([1, 2, 3]).orderBy();
    const result = sut.thenByDescending();
    
    result.count().should.equal(sut.count());
  });
  
  it('should return a ordered sequence', () => {
    const sut = nitter([
      {a: 1, b: 2},
      {a: 1, b: 1},
      {a: 2, b: 2},
      {a: 2, b: 1}
    ]).orderBy('a');
    const result = sut.thenByDescending('b').toArray();
    
    result.should.eql([
      {a: 1, b: 2},
      {a: 1, b: 1},
      {a: 2, b: 2},
      {a: 2, b: 1}
    ]);
  });
  
  it('should sort on function getters', () => {
    const sut = nitter([
      {a: 1, b: 2},
      {a: 1, b: 1},
      {a: 2, b: 2},
      {a: 2, b: 1}
    ]).orderBy('a');
    const result = sut.thenByDescending(item => item.b).toArray();
    
    result.should.eql([
      {a: 1, b: 2},
      {a: 1, b: 1},
      {a: 2, b: 2},
      {a: 2, b: 1}
    ]);
  });
  
  it('should accept custom matchers', () => {
    const sut = nitter([
      {a: 1, b: 2},
      {a: 1, b: 1},
      {a: 2, b: 2},
      {a: 2, b: 1}
    ]).orderBy('a');
    const result = sut.thenByDescending(item => item.b, (a, b) => {
      if (a < b) return 1;
      if (b < a) return -1;
      return 0;
    }).toArray();
    
    result.should.eql([
      {a: 1, b: 1},
      {a: 1, b: 2},
      {a: 2, b: 1},
      {a: 2, b: 2}
    ]);
  });
});