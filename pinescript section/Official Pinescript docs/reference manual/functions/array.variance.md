# array.variance()

2 overloads

The function returns the variance of an array's elements.

Syntax & Overloads

[```\\
array.variance(id, biased) → series float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.variance-0) [```\\
array.variance(id, biased) → series int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.variance-1)

Arguments

id (array<int/float>) An array object.

biased (series bool) Determines which estimate should be used. Optional. The default is true.

Example

```
//@version=6
indicator("array.variance example")
a = array.new_float(0)
for i = 0 to 9
    array.push(a, close[i])
plot(array.variance(a))
```

Returns

The variance of the array's elements.

Remarks

If `biased` is true, function will calculate using a biased estimate of the entire population, if false - unbiased estimate of a sample.

Returns [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) if the `id` array is empty.

See also

[array.new_float()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.new_float) [array.stdev()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.stdev) [array.min()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.min) [array.avg()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.avg) [array.covariance()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.covariance)
