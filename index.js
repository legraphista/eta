const CappedArray = require('./capped-array');

class ETA {
  constructor({ max = 1, min = 0, history = 100, autostart = true } = {}) {

    this._max = max;
    this._min = min;
    this._historyLen = history;
    this._autostart = autostart;

    this.reset();
  }

  start() {
    this._history.push({ when: Date.now(), val: this._min });
  }

  reset() {
    this._history = new CappedArray({ length: this._historyLen });
    if (this._autostart) {
      this.start();
    }
  }

  report(progress) {
    this._history.push({ when: Date.now(), val: progress });
  }

  estimate() {
    const interval = this._max - this._min;
    const intervalLeft = interval - (this._history.last.val - this._min);

    const timesPerUnit = [];
    for (let i = 1; i < this._history.length; i++) {
      const last = this._history.get(i - 1);
      const current = this._history.get(i);

      const timeInterval = (current.when - last.when) / 1000;
      const valInterval = (current.val - last.val) / interval;

      const timePerUnit = timeInterval / valInterval;

      if (timePerUnit !== Infinity && timePerUnit > 0 && !isNaN(timePerUnit)) {
        timesPerUnit.push(timePerUnit);
      }
    }

    if (timesPerUnit.length === 0) {
      return Infinity;
    }

    const avgTimePerUnit = timesPerUnit.reduce((a, c) => a + c, 0) / timesPerUnit.length;

    return intervalLeft * avgTimePerUnit / interval;
  }
}

module.exports = ETA;
