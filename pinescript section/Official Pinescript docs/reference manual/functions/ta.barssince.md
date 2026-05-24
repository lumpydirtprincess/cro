# ta.barssince()

Counts the number of bars since the last time the condition was true.

Syntax

```
ta.barssince(condition) → series int
```

Arguments

condition (series bool) The condition to check for.

Example

```
//@version=6
indicator("ta.barssince")
// get number of bars since last color.green bar
plot(ta.barssince(close >= open))
```

Returns

Number of bars since condition was true.

Remarks

If the condition has never been met prior to the current bar, the function returns na.

Please note that using this variable/function can cause [indicator repainting](https://www.tradingview.com/pine-script-docs/concepts/repainting/).

See also

[ta.lowestbars()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.lowestbars) [ta.highestbars()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.highestbars) [ta.valuewhen()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.valuewhen) [ta.highest()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.highest) [ta.lowest()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.lowest)
