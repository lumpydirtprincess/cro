# array

Keyword used to explicitly declare the "array" type of a variable or a parameter. Array objects (or IDs) can be created with the [array.new<type>()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.new%3Ctype%3E), [array.from()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.from) function.

Example

```
//@version=6
indicator("array", overlay=true)
array<float> a = na
a := array.new<float>(1, close)
plot(array.get(a, 0))
```

Remarks

Array objects are always of "series" form.

See also

[var](https://www.tradingview.com/pine-script-reference/v6/#kw_var) [line](https://www.tradingview.com/pine-script-reference/v6/#type_line) [label](https://www.tradingview.com/pine-script-reference/v6/#type_label) [table](https://www.tradingview.com/pine-script-reference/v6/#type_table) [box](https://www.tradingview.com/pine-script-reference/v6/#type_box) [array.new<type>()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.new%3Ctype%3E) [array.from()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.from)
