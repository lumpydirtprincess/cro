# array.fill()

The function sets elements of an array to a single value. If no index is specified, all elements are set. If only a start index (default 0) is supplied, the elements starting at that index are set. If both index parameters are used, the elements from the starting index up to but not including the end index (default na) are set.

Syntax

```
array.fill(id, value, index_from, index_to) → void
```

Arguments

id (any array type) An array object.

value (series <type of the array's elements>) Value to fill the array with.

index_from (series int) Start index, default is 0.

index_to (series int) End index, default is na. Must be one greater than the index of the last element to set.

Example

```
//@version=6
indicator("array.fill example")
a = array.new_float(10)
array.fill(a, close)
plot(array.sum(a))
```

See also

[array.new_float()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.new_float) [array.set()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.set) [array.slice()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.slice)
