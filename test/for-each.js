import should from 'should';
import { spy } from 'sinon';
import { nitter, addMethods } from '../lib/index';
import { iterator } from './utils';

describe('::forEach()', () => {
  it('should be a function', () => {
    const sut = nitter([]);
    sut.should.have.property('forEach').which.is.a.Function;
  });

  it('should iterate over all items in an array and call the method', () => {
    const fn = spy();
    nitter([1, 2, 3]).forEach(fn);

    fn.callCount.should.equal(3);
    fn.getCall(0).args[0].should.equal(1);
    fn.getCall(1).args[0].should.equal(2);
    fn.getCall(2).args[0].should.equal(3);
    
    const fn2 = spy();
    nitter([1]).forEach(fn2, fn);
    
    fn2.callCount.should.equal(1);
    fn2.getCall(0).args[0].should.equal(1);
    fn2.getCall(0).thisValue.should.equal(fn);
  });

  it('should iterate over all items in an iterable and call the method', () => {
    const fn = spy();
    nitter(iterator([1, 2, 3])).forEach(fn);

    fn.callCount.should.equal(3);
    fn.getCall(0).args[0].should.equal(1);
    fn.getCall(1).args[0].should.equal(2);
    fn.getCall(2).args[0].should.equal(3);
    
    const fn2 = spy();
    nitter(iterator([1])).forEach(fn2, fn);
    
    fn2.callCount.should.equal(1);
    fn2.getCall(0).args[0].should.equal(1);
    fn2.getCall(0).thisValue.should.equal(fn);
  });
});