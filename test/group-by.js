import should from 'should';
import { nitter, addMethods } from '../src/index';
import { iterator, ensureIterable, ensureNitter } from './utils';

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

  it('should return tuples of key-group-pairs', () => {
    const sut = nitter([
      { key: 0 },
      { key: 2 },
      { key: 2 },
      { key: 0 },
      { key: 1 },
      { key: 1 }
    ]);

    sut.groupBy(v => v.key).forEach(([key, values]) => {
      ensureIterable(values);
      ensureNitter(values);

      const arr = values.toArray();
      arr.length.should.equal(2);
      key.should.equal(arr[0].key);
      key.should.equal(arr[1].key);
    });
  });

  it('should fail with empty or null group selector', () => {
    const sut = nitter([]);

    (() => sut.groupBy()).should.throw(`Key selector can't be null or undefined`);
    (() => sut.groupBy(null)).should.throw(`Key selector can't be null or undefined`);
  });

  it('should allow for custom element selector', () => {
    const sut = nitter([
      { key: 0 },
      { key: 2 },
      { key: 2 },
      { key: 0 },
      { key: 1 },
      { key: 1 }
    ]);

    sut.groupBy(v => v.key, v => v.key).forEach(([key, values]) => {
      ensureIterable(values);
      ensureNitter(values);

      const arr = values.toArray();
      arr.length.should.equal(2);
      key.should.equal(arr[0]);
      key.should.equal(arr[1]);
    });
  });

  it('should work on iterables', () => {
    const sut = nitter(iterator([
      { key: 0 },
      { key: 2 },
      { key: 2 },
      { key: 0 },
      { key: 1 },
      { key: 1 }
    ]));

    sut.groupBy(v => v.key).forEach(([key, values]) => {
      ensureIterable(values);
      ensureNitter(values);

      const arr = values.toArray();
      arr.length.should.equal(2);
      key.should.equal(arr[0].key);
      key.should.equal(arr[1].key);
    });
  });
});
