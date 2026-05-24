# array.sort_indices()

2 overloads

Returns an array of indices which, when used to index the original array, will access its elements in their sorted order. It does not modify the original array.

Syntax & Overloads

[```\\
array.sort_indices(id, order) → array<int>\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.sort_indices-0) [```\\
array.sort_indices(id, order, sort_field) → array<int>\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.sort_indices-1)

Arguments

id (array<int/float/string>) An array object.

order (series sort_order) The sort order: order.ascending or order.descending. Optional. The default is order.ascending.

Example

```
//@version=6
indicator("array.sort_indices")
a = array.from(5, -2, 0, 9, 1)
sortedIndices = array.sort_indices(a) // [1, 2, 4, 0, 3]
indexOfSmallestValue = array.get(sortedIndices, 0) // 1
smallestValue = array.get(a, indexOfSmallestValue) // -2
plot(smallestValue)
```

See also

[array.new_float()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.new_float) [array.insert()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.insert) [array.slice()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.slice) [array.reverse()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.reverse) [order.ascending](https://www.tradingview.com/pine-script-reference/v6/#const_order.ascending) [order.descending](https://www.tradingview.com/pine-script-reference/v6/#const_order.descending)
