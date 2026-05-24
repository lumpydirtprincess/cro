# array.sort()

2 overloads

The function sorts the elements of an array.

Syntax & Overloads

[```\\
array.sort(id, order) → void\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.sort-0) [```\\
array.sort(id, order, sort_field) → void\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_array.sort-1)

Arguments

id (array<int/float/string>) An array object.

order (series sort_order) The sort order: order.ascending (default) or order.descending.

Example

```
//@version=6
indicator("array.sort example")
a = array.new_float(0,0)
for i = 0 to 5
    array.push(a, high[i])
array.sort(a, order.descending)
if barstate.islast
    label.new(bar_index, close, str.tostring(a))
```

See also

[array.new_float()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.new_float) [array.insert()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.insert) [array.slice()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.slice) [array.reverse()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.reverse) [order.ascending](https://www.tradingview.com/pine-script-reference/v6/#const_order.ascending) [order.descending](https://www.tradingview.com/pine-script-reference/v6/#const_order.descending)
