import should from 'should';
import { groupBy, toArray, forEach } from '../src/index';
import { iterator, ensureIterable } from './utils';

describe('::groupBy()', () => {
  it('should be a function', () => {
    should(groupBy).be.a.Function.with.property('name').which.equal('groupBy');
  });

  it('should return an iterable', () => {
    const sut = [];
    const result = sut::groupBy(v => v);

    ensureIterable(result);
  });

  it('should group by key selector', () => {
    const sut = [
      { key: 0 },
      { key: 2 },
      { key: 2 },
      { key: 0 },
      { key: 1 }
    ];

    const result = sut::groupBy(v => v.key)::toArray();

    result.length.should.equal(3);
  });

  it('should return tuples of key-group-pairs', () => {
    const sut = [
      { key: 0 },
      { key: 2 },
      { key: 2 },
      { key: 0 },
      { key: 1 },
      { key: 1 }
    ];

    sut::groupBy(v => v.key)::forEach(([key, values]) => {
      ensureIterable(values);

      const arr = values::toArray();
      arr.length.should.equal(2);
      key.should.equal(arr[0].key);
      key.should.equal(arr[1].key);
    });
  });

  it('should fail with empty, null or invalid group selector', () => {
    const sut = [];

    (() => sut::groupBy()).should.throw(`Expected keySelector to be a function, got undefined.`);
    (() => sut::groupBy(null)).should.throw(`Expected keySelector to be a function, got null.`);
    (() => sut::groupBy(5)).should.throw(`Expected keySelector to be a function, got 5.`);
  });

  it('should fail with invalid element selector', () => {
    const sut = [];

    (() => sut::groupBy(v => v, "test")).should.throw(`Expected elementSelector to be a function, got test.`);
    (() => sut::groupBy(v => v, 5)).should.throw(`Expected elementSelector to be a function, got 5.`);
  });

  it('should allow for custom element selector', () => {
    const sut = [
      { key: 0 },
      { key: 2 },
      { key: 2 },
      { key: 0 },
      { key: 1 },
      { key: 1 }
    ];

    sut::groupBy(v => v.key, v => v.key)::forEach(([key, values]) => {
      ensureIterable(values);

      const arr = values::toArray();
      arr.length.should.equal(2);
      key.should.equal(arr[0]);
      key.should.equal(arr[1]);
    });
  });

  it('should work on iterables', () => {
    const sut = iterator([
      { key: 0 },
      { key: 2 },
      { key: 2 },
      { key: 0 },
      { key: 1 },
      { key: 1 }
    ]);

    sut::groupBy(v => v.key)::forEach(([key, values]) => {
      ensureIterable(values);

      const arr = values::toArray();
      arr.length.should.equal(2);
      key.should.equal(arr[0].key);
      key.should.equal(arr[1].key);
    });
  });

  it('should not recompute the groups', () => {
    const sut = iterator([
      { key: 0 },
      { key: 2 },
      { key: 2 },
      { key: 0 },
      { key: 1 },
      { key: 1 }
    ]);

    let count = 0;
    const grouped = sut::groupBy(v => {
      count++;
      return v.key;
    });

    count.should.equal(0);
    grouped::toArray(); // generate the groups

    count.should.equal(6);
    grouped::toArray();
    count.should.equal(6);
  });
});
