# array.some()

Returns [true](https://www.tradingview.com/pine-script-reference/v6/#const_true) if at least one element of the `id` array is [true](https://www.tradingview.com/pine-script-reference/v6/#const_true), [false](https://www.tradingview.com/pine-script-reference/v6/#const_false) otherwise.

Syntax

```
array.some(id) → series bool
```

Arguments

id (array<bool>) An array object.

Remarks

This function also works with arrays of [int](https://www.tradingview.com/pine-script-reference/v6/#type_int) and [float](https://www.tradingview.com/pine-script-reference/v6/#type_float) types, in which case zero values are considered [false](https://www.tradingview.com/pine-script-reference/v6/#const_false), and all others [true](https://www.tradingview.com/pine-script-reference/v6/#const_true).

See also

[array.every()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.every) [array.get()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.get)
