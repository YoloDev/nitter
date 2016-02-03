import should from 'should';
import { empty, cons, List, toArray, count } from '../src/index';
import { ensureIterable } from './utils';

describe('List', () => {
  describe('empty', () => {
    it('should be an empty itterable', () => {
      ensureIterable(empty);

      empty::toArray().should.eql([]);
      empty::count().should.equal(0);
    });
  });

  describe('::cons', () => {
    it('should be a function', () => {
      should(cons).be.a.Function.with.property('name').which.equal('cons');
    });

    it('should throw on invalid list parameter', () => {
      (() => cons(5, 5)).should.throw('Expected a list, but got 5 instead.');
      (() => cons(5, 'test')).should.throw('Expected a list, but got test instead.');
    });

    it('should append elements to a list', () => {
      const sut = cons(1, cons(2, cons(3, empty)));

      ensureIterable(sut);
      sut::toArray().should.eql([1, 2, 3]);
    });

    it('should be callable using :: syntax', () => {
      const sut = empty::cons(3)::cons(2)::cons(1);

      ensureIterable(sut);
      sut::toArray().should.eql([1, 2, 3]);
    });

    it('should be curried', () => {
      const sut = cons(1)(cons(2)(cons(3)(empty)));

      ensureIterable(sut);
      sut::toArray().should.eql([1, 2, 3]);
    });

    it('should throw if called with :: and with a list parameter', () => {
      (() => empty::cons(1, empty)).should.throw('Cannot call cons with both this-parameter and list parameter set.');
    });
  });

  describe('Converter function', () => {
    it('should convert an array to a list', () => {
      const sut = List([1, 2, 3]);

      ensureIterable(sut);
      sut.should.be.instanceof(List);
      sut::toArray().should.eql([1, 2, 3]);
    });

    it('should throw if called with new', () => {
      (() => new List([1, 2, 3])).should.throw('List must not be called with new.');
    });
  });
});
