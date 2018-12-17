const assert = require('assert');

(function test_eta() {

  const tolerance = 10 ** -5;
  const makeEta = require('.');

  const eta = makeEta({ autostart: false });
  eta.report(0, 0);


  eta.report(0, 0);
  assert(eta.estimate() === Infinity);

  for (let i = 1; i <= 10; i++) {
    eta.report(i / 10, i * 1000);

    const estimate = eta.estimate();

    const absDiff = Math.abs((10 - i) - estimate);

    assert(absDiff < tolerance, 'bad eta');
  }

})();

console.log('OK');
