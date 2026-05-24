# array.indexof()

The function returns the index of the first occurrence of the value, or -1 if the value is not found.

Syntax

```
array.indexof(id, value) → series int
```

Arguments

id (any array type) An array object.

value (series <type of the array's elements>) The value to search in the array.

Example

```
//@version=6
indicator("array.indexof example")
a = array.new_float(5,high)
index = array.indexof(a, high)
plot(index)
```

Returns

The index of an element.

See also

[array.lastindexof()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.lastindexof) [array.get()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.get) [array.lastindexof()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.lastindexof) [array.remove()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.remove) [array.insert()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.insert)
