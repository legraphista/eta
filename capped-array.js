class CappedArray {
  constructor({ length = Infinity }) {
    this._arr = new Array(length);
    this._index = 0;
    this._len = 0;
    this._max = length;
  }

  _push(val) {
    this._arr[this._index] = val;
    this._len = Math.max(this._len, this._index + 1);

    this._index = (this._index + 1) % this._max;
  }

  push(...values) {
    for (let i = 0; i < values.length; i++) {
      this._push(values[i]);
    }
  }

  get last() {
    return this._arr[this._index === 0 ? this._len - 1 : this._index - 1];
  }

  get length() {
    return this._len;
  }

  get(i) {
    return this._arr[i];
  }
}

module.exports = CappedArray;
