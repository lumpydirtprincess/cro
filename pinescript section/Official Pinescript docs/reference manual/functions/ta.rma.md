# ta.rma()

Moving average used in RSI. It is the exponentially weighted moving average with alpha = 1 / length.

Syntax

```
ta.rma(source, length) → series float
```

Arguments

source (series int/float) Series of values to process.

length (simple int) Number of bars (length).

Example

```
//@version=6
indicator("ta.rma")
plot(ta.rma(close, 15))

//the same on pine
pine_rma(src, length) =>
    alpha = 1/length
    sum = 0.0
    sum := na(sum[1]) ? ta.sma(src, length) : alpha * src + (1 - alpha) * nz(sum[1])
plot(pine_rma(close, 15))
```

Returns

Exponential moving average of `source` with alpha = 1 / `length`.

Remarks

`na` values in the `source` series are ignored; the function calculates on the `length` quantity of non-`na` values.

See also

[ta.sma()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.sma) [ta.ema()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.ema) [ta.wma()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.wma) [ta.vwma()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.vwma) [ta.swma()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.swma) [ta.alma()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.alma) [ta.rsi()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.rsi)
