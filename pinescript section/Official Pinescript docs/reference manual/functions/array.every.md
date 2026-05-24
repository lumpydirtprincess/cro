# array.every()

Returns [true](https://www.tradingview.com/pine-script-reference/v6/#const_true) if all elements of the `id` array are [true](https://www.tradingview.com/pine-script-reference/v6/#const_true), [false](https://www.tradingview.com/pine-script-reference/v6/#const_false) otherwise.

Syntax

```
array.every(id) → series bool
```

Arguments

id (array<bool>) An array object.

Remarks

This function also works with arrays of [int](https://www.tradingview.com/pine-script-reference/v6/#type_int) and [float](https://www.tradingview.com/pine-script-reference/v6/#type_float) types, in which case zero values are considered [false](https://www.tradingview.com/pine-script-reference/v6/#const_false), and all others [true](https://www.tradingview.com/pine-script-reference/v6/#const_true).

See also

[array.some()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.some) [array.get()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.get)
