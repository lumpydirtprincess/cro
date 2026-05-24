# ?:

Ternary conditional operator.

Syntax

```
expr1 ? expr2 : expr3
```

Example

```
//@version=6
indicator("?:")
// Draw circles at the bars where open crosses close
s2 = ta.cross(open, close) ? math.avg(open,close) : na
plot(s2, style=plot.style_circles, linewidth=2, color=color.red)

// Combination of ?: operators for 'switch'-like logic
c = timeframe.isintraday ? color.red : timeframe.isdaily ? color.green : timeframe.isweekly ? color.blue : color.gray
plot(hl2, color=c)
```

Returns

expr2 if expr1 is evaluated to true, expr3 otherwise. Zero value (0 and also NaN, +Infinity, -Infinity) is considered to be false, any other value is true.

Remarks

Use [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) for 'else' branch if you do not need it.

You can combine two or more [?:](https://www.tradingview.com/pine-script-reference/v6/#op_?:) operators to achieve the equivalent of a 'switch'-like statement (see examples above).

You may use arithmetic operators with numbers as well as with series variables. In case of usage with series the operators are applied elementwise.

See also

[na](https://www.tradingview.com/pine-script-reference/v6/#var_na)
