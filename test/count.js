import should from 'should';
import { count } from '../src/index';
import { iterator } from './utils';

describe('::count()', () => {
  it('should be a function', () => {
    should(count).be.a.Function.with.property('name').which.equal('count');
  });

  it('should return the length of arrays', () => {
    const sut = [1, 2, 3];
    sut::count().should.equal(3);
  });

  it('should count the elements of iterators', () => {
    const sut = iterator([1, 2, 3]);
    sut::count().should.equal(3);
  });
});
