// @flow

const makeEta = require('.');

const MIN = 100;
const MAX = 200;
const INT = MAX - MIN;
const ITER = 1000;
const TIME = 10; // seconds
const DELAY = TIME / ITER * 1000;
const MAX_HISTORY = 100; // or Infinity ¯\_(ツ)_/¯

const eta = makeEta({
  min: MIN,
  max: MAX,
  history: MAX_HISTORY
});

(async () => {

  for (let i = 0; i < 2; i++) {

    console.time('took');
    for (let i = 0; i < ITER; i++) {
      // await new Promise(_ => setTimeout(_, DELAY));
      await new Promise(_ => setTimeout(_, DELAY * Math.random()));
      eta.report(i / ITER * INT + MIN);
      console.log(eta.estimate());
    }
    console.timeEnd('took');

    eta.reset();
    await new Promise(_ => setTimeout(_, 3000));
  }
})();
