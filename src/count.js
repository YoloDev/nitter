import { addMethods } from './nitter';

addMethods({
  count() {
    const arr = this.arr();
    if (arr !== null) {
      return arr.length;
    }
    
    const iterator = this.iter();
    let count = 0;
    while (true) {
      const next = iterator.next();
      if (next.done) break;
      
      count++;
    }
    
    return count;
  }
});