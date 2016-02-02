import should from 'should';
import { spy } from 'sinon';
import { forEach } from '../src/index';
import { iterator } from './utils';

describe('::forEach()', () => {
  it('should be a function', () => {
    should(forEach).be.a.Function.with.property('name').which.equal('forEach');
  });

  it('should iterate over all items in an array and call the method', () => {
    const fn = spy();
    [1, 2, 3]::forEach(fn);

    fn.callCount.should.equal(3);
    fn.getCall(0).args[0].should.equal(1);
    fn.getCall(1).args[0].should.equal(2);
    fn.getCall(2).args[0].should.equal(3);
  });

  it('should iterate over all items in an iterable and call the method', () => {
    const fn = spy();
    iterator([1, 2, 3])::forEach(fn);

    fn.callCount.should.equal(3);
    fn.getCall(0).args[0].should.equal(1);
    fn.getCall(1).args[0].should.equal(2);
    fn.getCall(2).args[0].should.equal(3);
  });
});
