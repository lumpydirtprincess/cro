# ta.tr()

Calculates the current bar's true range. Unlike a bar's actual range (`high - low`), true range accounts for potential gaps by taking the maximum of the current bar's actual range and the absolute distances from the previous bar's [close](https://www.tradingview.com/pine-script-reference/v6/#var_close) to the current bar's [high](https://www.tradingview.com/pine-script-reference/v6/#var_high) and [low](https://www.tradingview.com/pine-script-reference/v6/#var_low). The formula is: `math.max(high - low, math.abs(high - close[1]), math.abs(low - close[1]))`.

Syntax

```
ta.tr(handle_na) → series float
```

Arguments

handle_na (simple bool) Defines how the function calculates the result when the previous bar's [close](https://www.tradingview.com/pine-script-reference/v6/#var_close) is [na](https://www.tradingview.com/pine-script-reference/v6/#var_na). If [true](https://www.tradingview.com/pine-script-reference/v6/#const_true), the function returns the bar's `high - low` value. If [false](https://www.tradingview.com/pine-script-reference/v6/#const_false), it returns [na](https://www.tradingview.com/pine-script-reference/v6/#var_na).

Returns

True range. It is math.max(high - low, math.abs(high - close\[1\]), math.abs(low - close\[1\])).

Remarks

ta.tr(false) is exactly the same as [ta.tr](https://www.tradingview.com/pine-script-reference/v6/#var_ta.tr).

See also

[ta.tr](https://www.tradingview.com/pine-script-reference/v6/#var_ta.tr) [ta.atr()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.atr)
