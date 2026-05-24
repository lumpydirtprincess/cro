# array.mode()

2 overloads

The function returns the mode of an array's elements. If there are several values with the same frequency, it returns the smallest value.

Syntax & Overloads

[```\\
array.mode(id) → series float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.mode-0) [```\\
array.mode(id) → series int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.mode-1)

Arguments

id (array<int/float>) An array object.

Example

```
//@version=6
indicator("array.mode example")
a = array.new_float(0)
for i = 0 to 9
    array.push(a, close[i])
plot(array.mode(a))
```

Returns

The most frequently occurring value from the `id` array. If none exists, returns the smallest value instead.

Remarks

Returns [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) if the `id` array is empty.

See also

[array.new_float()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.new_float) [ta.mode()](https://www.tradingview.com/pine-script-reference/v6/#fun_ta.mode) [matrix.mode()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.mode) [array.avg()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.avg) [array.variance()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.variance) [array.min()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.min)
