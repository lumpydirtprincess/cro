# array.lastindexof()

The function returns the index of the last occurrence of the value, or -1 if the value is not found.

Syntax

```
array.lastindexof(id, value) → series int
```

Arguments

id (any array type) An array object.

value (series <type of the array's elements>) The value to search in the array.

Example

```
//@version=6
indicator("array.lastindexof example")
a = array.new_float(5,high)
index = array.lastindexof(a, high)
plot(index)
```

Returns

The index of an element.

See also

[array.new_float()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.new_float) [array.set()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.set) [array.push()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.push) [array.remove()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.remove) [array.insert()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.insert)
