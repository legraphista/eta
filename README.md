# ETA
_Progressively determine the eta of a process out of the percentage reported._
_Everything is customizable, no need to define checkpoints or any other shenanigans_

## Constructor
- min `{number=0}` - define the lower limit of your interval
- max `{number=1}` - define the upper limit of your interval
- history `{number=100}` - define how many points of historical data to use
    - `higher history value`: more accurate and time stable
    - `lower  history value`: more adaptive and less memory
- autostart `{boolean=true}` - add the first history point when the class is instantiated or reset

## Methods

### `.start():void`
Add the first point to the history.
Automatically called if `autostart` is `true`

### `.reset():void`
Resets the history of the ETA.

### `.report(number):void`
Report the progress within the defined interval, adding a point to the history.
Values outside the interval will produce false results.

### `.estimate():number`
Estimates the time left from the last `.report` call to complete the interval.
Time is returned in seconds.
