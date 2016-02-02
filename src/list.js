import { subtype, symb } from './nitter';

const emptySymbol = Symbol('empty-list');

const proto = subtype({
  [Symbol.iterator]() {
    let list = this; // eslint-disable-line consistent-this

    return {
      next() {
        if (list[emptySymbol]) {
          return { done: true };
        }

        const { value, tail } = list;
        list = tail;

        return { done: false, value };
      }
    };
  }
}, null, {
  cons(val) {
    return proto.create({
      value: val,
      tail: this.nitter[symb]._,
      [emptySymbol]: false
    });
  }
});

export const empty = proto.create({ [emptySymbol]: true });
