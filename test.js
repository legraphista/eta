const assert = require('assert');

(function test_capped_array() {

  const CappedArray = require('./capped-array');

  const ca = new CappedArray({ length: 10 });

  ca.push(...new Array(5).fill(0).map((_, i) => i));

  assert(ca.length === 5);
  assert(ca._arr.join('') === '01234');

  ca.push(...new Array(5).fill(0).map((_, i) => i));

  assert(ca.length === 10);
  assert(ca._arr.join('') === '0123401234');

  ca.push(11);

  assert(ca.length === 10);
  assert(ca._arr.join('') === '11123401234');

  assert(ca.last === 11);
  assert(ca.get(9) === 4);
})();

(function test_eta() {

  const tolerance = 10 ** -5;
  const ETA = require('.');

  const eta = new ETA();
  eta._history._arr[0] = { when: 0, val: 0 };

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
