# array.percentrank()

2 overloads

Returns the percentile rank of the element at the specified `index`.

Syntax & Overloads

[```\\
array.percentrank(id, index) → series float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.percentrank-0) [```\\
array.percentrank(id, index) → series int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.percentrank-1)

Arguments

id (array<int/float>) An array object.

index (series int) The index of the element for which the percentile rank should be calculated.

Remarks

Percentile rank is the number of elements in the array that are less than or equal to the reference value, expressed as a percentage.

Returns [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) if the `id` array is empty.

See also

[array.new_float()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.new_float) [array.insert()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.insert) [array.slice()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.slice) [array.reverse()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.reverse) [order.ascending](https://www.tradingview.com/pine-script-reference/v6/#const_order.ascending) [order.descending](https://www.tradingview.com/pine-script-reference/v6/#const_order.descending)
