import should from 'should';
import { nitter, addMethods } from '../lib/index';
import { iterator, ensureIterable } from './utils';

describe('::groupBy()', () => {
  it('should be a function', () => {
    const sut = nitter([]);
    sut.should.have.property('groupBy').which.is.a.Function;
  });
  
  it('should return an iterable', () => {
    const sut = nitter([]);
    const result = sut.groupBy(v => v);
    
    ensureIterable(result);
  });
  
  it('should group by key selector', () => {
    const sut = nitter([
      { key: 0 },
      { key: 2 },
      { key: 2 },
      { key: 0 },
      { key: 1 }
    ]);
    
    const result = sut.groupBy(v => v.key).toArray();
    
    result.length.should.equal(3);
  });
});