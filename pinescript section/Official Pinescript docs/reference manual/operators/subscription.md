# \[\]

Series subscript. Provides access to previous values of series expr1. expr2 is the number of bars back, and must be numerical. Floats will be rounded down.

Syntax

```
expr1[expr2]
```

Example

```
//@version=6
indicator("[]")
// [] can be used to "save" variable value between bars
a = 0.0 // declare `a`
a := a[1] // immediately set current value to the same as previous. `na` in the beginning of history
if high == low // if some condition - change `a` value to another
    a := low
plot(a)
```

Returns

A series of values.

See also

[math.floor()](https://www.tradingview.com/pine-script-reference/v6/#fun_math.floor)
