# array.standardize()

2 overloads

The function returns the array of standardized elements.

Syntax & Overloads

[```\\
array.standardize(id) → array<float>\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.standardize-0) [```\\
array.standardize(id) → array<int>\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.standardize-1)

Arguments

id (array<int/float>) An array object.

Example

```
//@version=6
indicator("array.standardize example")
a = array.new_float(0)
for i = 0 to 9
    array.push(a, close[i])
b = array.standardize(a)
plot(array.min(b))
plot(array.max(b))
```

Returns

The array of standardized elements.

See also

[array.max()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.max) [array.min()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.min) [array.mode()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.mode) [array.avg()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.avg) [array.variance()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.variance) [array.stdev()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.stdev)
