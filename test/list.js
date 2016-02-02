import 'should';
import { list } from '../src/index';
import { ensureIterable, ensureNitter } from './utils';

describe('list', () => {
  it('should be an empty nitter itterable', () => {
    ensureIterable(list);
    ensureNitter(list);

    list.toArray().should.eql([]);
  });

  it('should be able to construct longer lists', () => {
    const sut = list.cons(1).cons(2).cons(3);

    ensureIterable(sut);
    ensureNitter(sut);

    sut.toArray().should.eql([3, 2, 1]);
  });
});
