# ta.lowestbars()

Lowest value offset for a given number of bars back.

Syntax

```
ta.lowestbars(source, length) → series int
```

Arguments

source (series int/float) Series of values to process.

length (series int) Number of bars back.

Returns

Offset to the lowest bar.

Remarks

Two args version: `source` is a series and `length` is the number of bars back.

One arg version: `length` is the number of bars back. Algorithm uses low as a `source` series.

`na` values in the `source` series are ignored.

See also

[ta.lowest()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.lowest) [ta.highest()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.highest) [ta.highestbars()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.highestbars) [ta.barssince()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.barssince) [ta.valuewhen()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.valuewhen)
