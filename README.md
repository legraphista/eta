# Simple ETA
_Progressively determine the eta of a process out of the percentage reported._<br/>
_Everything is customizable, no need to define checkpoints or any other shenanigans_

# Install
```
npm i simple-eta
```

```javascript
const makeEta = require('simple-eta');

const eta = makeEta({ min: 0, max: 100 });

eta.start();
for (let progress = 1; progress <= 100; i += 1) {
  // Operation that takes time
  eta.report(progress);
  console.log(`Aprox. ${eta.estimate()} seconds left`);
}
```

## Constructor
- min `{number=0}` - define the lower limit of your interval
- max `{number=1}` - define the upper limit of your interval
- historyTimeConstant `{number=2.5}` - define (in seconds) how far into the past to consider data points as still relevant
    - `higher history value`: more time stable. spikes in progress speed will affect ETA less
    - `lower  history value`: more adaptive to changes. spikes in progress speed will affect ETA more
- autostart `{boolean=true}` - add the first history point when the class is instantiated or reset

## Methods

### `.start():void`
Add the first point to the history. Equivalent to `.report(min)`. <br/>
Automatically called if `autostart` is `true`.

### `.reset():void`
Resets the history of the ETA.

### `.report(number):void`
Report the progress within the defined interval, adding a point to the history.<br/>
Values outside the interval will produce false results.

### `.estimate():number`
Estimates the time left from the last `.report` call to complete the interval.<br/>
Time is returned in seconds. Returns `Infinity` when an ETA is not available.

### `.rate():number`
Gets the estimated progress speed (progress per second).
