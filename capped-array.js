class CappedArray {
  constructor({ length = Infinity }) {
    this._arr = [];
    this._max = length;
  }

  _push(val) {
    this._arr.push(val);
    if (this._max < this._arr.length) {
      this._arr.shift();
    }
  }

  push(...values) {
    for (let i = 0; i < values.length; i++) {
      this._push(values[i]);
    }
  }

  get last() {
    return this._arr[this._arr.length - 1];
  }

  get length() {
    return this._arr.length;
  }

  get(i) {
    return this._arr[i];
  }
}

module.exports = CappedArray;
