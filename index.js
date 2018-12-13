function makeEta(options) {
  options = options || {};
  var max = options.max || 1;
  var min = options.min || 0;
  var historyLimit = options.history || 100;
  var autostart = options.autostart || true;

  var lastTimestamp = null, lastProgress = null;

  var history = []; // Circular buffer
  var historyIndex = 0;

  function _pushHistory(item) {
    history[historyIndex] = item;
    historyIndex += 1;
    if (historyIndex >= historyLimit) { historyIndex = 0; }
  }

  function start() {
    report(min);
  }

  function reset() {
    history.length = 0;
    historyIndex = 0;
    lastTimestamp = null;
    lastProgress = null;
    if (autostart) {
      start();
    }
  }

  function report(progress, timestamp) {
    if (typeof timestamp !== 'number') {
      timestamp = Date.now();
    }

    if (lastTimestamp !== null && lastProgress !== null) {
      var deltaProgress = progress - lastProgress;
      var deltaTimestamp = timestamp - lastTimestamp;
      _pushHistory({ time: deltaTimestamp, progress: deltaProgress });
    }

    lastProgress = progress;
    lastTimestamp = timestamp;
  }

  function estimate() {
    if (lastProgress === null) {
      return Infinity;
    }

    var totalProgress = 0;
    var totalTime = 0;

    for (var i = 0; i < history.length; i++) {
      var item = history[i];
      var progress = item.progress;
      var time = item.time;
      if (progress >= 0) {
        totalProgress += progress;
        totalTime += time;
      }
    }

    if (totalProgress === 0) { return Infinity; }

    var progressLeft = max - lastProgress;
    return totalTime * 0.001 * (progressLeft / totalProgress);
  }

  return {
    start: start,
    reset: reset,
    report: report,
    estimate: estimate,
  }
}

module.exports = makeEta;
