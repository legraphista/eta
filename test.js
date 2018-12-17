const assert = require('assert');

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

console.log('OK');
