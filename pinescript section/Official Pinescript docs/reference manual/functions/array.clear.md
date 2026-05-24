# array.clear()

The function removes all elements from an array.

Syntax

```
array.clear(id) → void
```

Arguments

id (any array type) An array object.

Example

```
//@version=6
indicator("array.clear example")
a = array.new_float(5,high)
array.clear(a)
array.push(a, close)
plot(array.get(a,0))
plot(array.size(a))
```

See also

[array.new_float()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.new_float) [array.insert()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.insert) [array.push()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.push) [array.remove()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.remove) [array.pop()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.pop)
