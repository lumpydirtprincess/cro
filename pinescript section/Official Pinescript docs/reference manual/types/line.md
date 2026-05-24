# line

Keyword used to explicitly declare the "line" type of a variable or a parameter. Line objects (or IDs) can be created with the [line.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_line.new) function.

Example

```
//@version=6
indicator("line")
// Empty `line1` line ID.
var line line1 = na
// `line` type is unnecessary because `line.new()` returns "line" type.
var line2 = line.new(na, na, na, na)
line3 = line.new(bar_index - 1, high, bar_index, high, extend = extend.right)
```

Remarks

Line objects are always of "series" form.

See also

[var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) [label](https://www.tradingview.com/pine-script-reference/v6/#type_label) [box](https://www.tradingview.com/pine-script-reference/v6/#type_box) [line.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_line.new)
