class PriorityQueue {
  /*
  values = {};
  _size = 0;
  */

  constructor(){
    this.values = {}
    this._size = 0
  }

  enqueue(value, priority) {
    if (this.values[priority] === undefined) {
      this.values[priority] = [];
    }

    this.values[priority].push(value);
    this._size++;

    return this;
  }

  dequeue() {
    const [highestPriority] = Object.keys(this.values);
    if (highestPriority === undefined) {
      return null;
    }

    const value = this.values[highestPriority].shift();
    if (this.values[highestPriority].length === 0) {
      delete this.values[highestPriority];
    }

    this._size--;
    return value;
  }

    head() {
      const [highestPriority] = Object.keys(this.values);
      if (highestPriority === undefined) {
        return null;
      }

      return this.values[highestPriority][0];
    }

    tail() {
      const [lowestPriority] = Object.keys(this.values).reverse();
      if (lowestPriority === undefined) {
        return null;
      }

      const lowestQueue = this.values[lowestPriority];
      return lowestQueue[lowestQueue.length - 1];
    }

    size() {
      return this._size;
    }

    isEmpty() {
      return this.size() === 0;
    }
}

module.exports = PriorityQueue;
