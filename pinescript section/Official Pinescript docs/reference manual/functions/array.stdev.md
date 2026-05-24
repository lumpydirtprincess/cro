# array.stdev()

2 overloads

The function returns the standard deviation of an array's elements.

Syntax & Overloads

[```\\
array.stdev(id, biased) → series float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.stdev-0) [```\\
array.stdev(id, biased) → series int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.stdev-1)

Arguments

id (array<int/float>) An array object.

biased (series bool) Determines which estimate should be used. Optional. The default is true.

Example

```
//@version=6
indicator("array.stdev example")
a = array.new_float(0)
for i = 0 to 9
    array.push(a, close[i])
plot(array.stdev(a))
```

Returns

The standard deviation of the array's elements.

Remarks

If `biased` is true, the function calculates using a biased estimate of the entire population. If `biased` is false, it uses an unbiased estimate of a sample.

Returns [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) if the `id` array is empty.

See also

[array.new_float()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.new_float) [array.max()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.max) [array.min()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.min) [array.avg()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.avg)
