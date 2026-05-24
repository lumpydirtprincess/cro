# math.sum()

The sum function returns the sliding sum of last y values of x.

Syntax

```
math.sum(source, length) → series float
```

Arguments

source (series int/float) Series of values to process.

length (series int) Number of bars (length).

Returns

Sum of `source` for `length` bars back.

Remarks

`na` values in the `source` series are ignored; the function calculates on the `length` quantity of non-`na` values.

See also

[ta.cum()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.cum) [for](https://www.tradingview.com/pine-script-reference/v6/#kw_for)
