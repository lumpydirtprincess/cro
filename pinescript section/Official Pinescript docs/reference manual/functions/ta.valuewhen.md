# ta.valuewhen()

4 overloads

Returns the value of the `source` series on the bar where the `condition` was true on the nth most recent occurrence.

Syntax & Overloads

[```\\
ta.valuewhen(condition, source, occurrence) → series color\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.valuewhen-0) [```\\
ta.valuewhen(condition, source, occurrence) → series int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.valuewhen-1) [```\\
ta.valuewhen(condition, source, occurrence) → series float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.valuewhen-2) [```\\
ta.valuewhen(condition, source, occurrence) → series bool\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.valuewhen-3)

Arguments

condition (series bool) The condition to search for.

source (series color) The value to be returned from the bar where the condition is met.

occurrence (simple int) The occurrence of the condition. The numbering starts from 0 and goes back in time, so '0' is the most recent occurrence of `condition`, '1' is the second most recent and so forth. Must be an integer >= 0.

Example

```
//@version=6
indicator("ta.valuewhen")
slow = ta.sma(close, 7)
fast = ta.sma(close, 14)
// Get value of `close` on second most recent cross
plot(ta.valuewhen(ta.cross(slow, fast), close, 1))
```

Remarks

This function requires execution on every bar. It is not recommended to use it inside a [for](https://www.tradingview.com/pine-script-reference/v6/#kw_for) or [while](https://www.tradingview.com/pine-script-reference/v6/#kw_while) loop structure, where its behavior can be unexpected. Please note that using this function can cause [indicator repainting](https://www.tradingview.com/pine-script-docs/concepts/repainting/).

See also

[ta.lowestbars()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.lowestbars) [ta.highestbars()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.highestbars) [ta.barssince()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.barssince) [ta.highest()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.highest) [ta.lowest()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.lowest)
