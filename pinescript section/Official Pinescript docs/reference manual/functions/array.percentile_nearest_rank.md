# array.percentile_nearest_rank()

2 overloads

Returns the value for which the specified percentage of array values (percentile) are less than or equal to it, using the nearest-rank method.

Syntax & Overloads

[```\\
array.percentile_nearest_rank(id, percentage) → series float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.percentile_nearest_rank-0) [```\\
array.percentile_nearest_rank(id, percentage) → series int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.percentile_nearest_rank-1)

Arguments

id (array<int/float>) An array object.

percentage (series int/float) The percentage of values that must be equal or less than the returned value.

Remarks

In statistics, the percentile is the percent of ranking items that appear at or below a certain score. This measurement shows the percentage of scores within a standard frequency distribution that is lower than the percentile rank you're measuring.

Returns [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) if the `id` array is empty.

See also

[array.new_float()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.new_float) [array.insert()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.insert) [array.slice()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.slice) [array.reverse()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.reverse) [order.ascending](https://www.tradingview.com/pine-script-reference/v6/#const_order.ascending) [order.descending](https://www.tradingview.com/pine-script-reference/v6/#const_order.descending)
