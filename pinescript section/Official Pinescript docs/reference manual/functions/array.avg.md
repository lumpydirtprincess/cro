# array.avg()

2 overloads

The function returns the mean of an array's elements.

Syntax & Overloads

[```\\
array.avg(id) → series float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.avg-0) [```\\
array.avg(id) → series int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.avg-1)

Arguments

id (array<int/float>) An array object.

Example

```
//@version=6
indicator("array.avg example")
a = array.new_float(0)
for i = 0 to 9
    array.push(a, close[i])
plot(array.avg(a))
```

Returns

Mean of array's elements.

Remarks

Returns [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) if the `id` array is empty.

See also

[array.new_float()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.new_float) [array.max()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.max) [array.min()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.min) [array.stdev()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.stdev)
