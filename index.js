// @flow

/*::
type Options = {
  max?: number,
  min?: number,
  historyTimeConstant?: number,
  autostart?: boolean,
  ignoreSameProgress?: boolean,
}
*/

function makeLowPassFilter(RC/*: number*/) {
  return function (previousOutput, input, dt) {
    const alpha = dt / (dt + RC);
    return previousOutput + alpha * (input - previousOutput);
  }
}

function def/*:: <T>*/(x/*: ?T*/, d/*: T*/)/*: T*/ {
  return (x === undefined || x === null) ? d : x;
}

function makeEta(options/*::?: Options */) {
  options = options || {};
  var max = def(options.max, 1);
  var min = def(options.min, 0);
  var autostart = def(options.autostart, true);
  var ignoreSameProgress = def(options.ignoreSameProgress, false);

  var rate/*: number | null */ = null;
  var lastTimestamp/*: number | null */ = null;
  var lastProgress/*: number | null */ = null;

  var filter = makeLowPassFilter(def(options.historyTimeConstant, 2.5));

  function start() {
    report(min);
  }

  function reset() {
    rate = null;
    lastTimestamp = null;
    lastProgress = null;
    if (autostart) {
      start();
    }
  }

  function report(progress /*: number */, timestamp/*::?: number */) {
    if (typeof timestamp !== 'number') {
      timestamp = Date.now();
    }

    if (lastTimestamp === timestamp) { return; }
    if (ignoreSameProgress && lastProgress === progress) { return; }

    if (lastTimestamp === null || lastProgress === null) {
      lastProgress = progress;
      lastTimestamp = timestamp;
      return;
    }

    var deltaProgress = progress - lastProgress;
    var deltaTimestamp = 0.001 * (timestamp - lastTimestamp);
    var currentRate = deltaProgress / deltaTimestamp;

    rate = rate === null
      ? currentRate
      : filter(rate, currentRate, deltaTimestamp);
    lastProgress = progress;
    lastTimestamp = timestamp;
  }

  function estimate(timestamp/*::?: number*/) {
    if (lastProgress === null) { return Infinity; }
    if (lastProgress >= max) { return 0; }
    if (rate === null) { return Infinity; }

    var estimatedTime = (max - lastProgress) / rate;
    if (typeof timestamp === 'number' && typeof lastTimestamp === 'number') {
      estimatedTime -= (timestamp - lastTimestamp) * 0.001;
    }
    return Math.max(0, estimatedTime);
  }

  function getRate() {
    return rate === null ? 0 : rate;
  }

  return {
    start: start,
    reset: reset,
    report: report,
    estimate: estimate,
    rate: getRate,
  }
}

module.exports = makeEta;
