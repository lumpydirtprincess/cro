# ta.median()

2 overloads

Returns the median of the series.

Syntax & Overloads

[```\\
ta.median(source, length) → series int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.median-0) [```\\
ta.median(source, length) → series float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.median-1)

Arguments

source (series int) Series of values to process.

length (series int) Number of bars (length).

Returns

The median of the series.

Remarks

`na` values in the `source` series are ignored; the function calculates on the `length` quantity of non-`na` values.
