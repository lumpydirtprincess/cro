# array.push()

The function appends a value to an array.

Syntax

```
array.push(id, value) → void
```

Arguments

id (any array type) An array object.

value (series <type of the array's elements>) The value of the element added to the end of the array.

Example

```
//@version=6
indicator("array.push example")
a = array.new_float(5, 0)
array.push(a, open)
plot(array.get(a, 5))
```

See also

[array.new_float()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.new_float) [array.set()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.set) [array.insert()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.insert) [array.remove()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.remove) [array.pop()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.pop) [array.unshift()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.unshift)
