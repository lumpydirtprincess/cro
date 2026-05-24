# array.reverse()

The function reverses an array. The first array element becomes the last, and the last array element becomes the first.

Syntax

```
array.reverse(id) → void
```

Arguments

id (any array type) An array object.

Example

```
//@version=6
indicator("array.reverse example")
a = array.new_float(0)
for i = 0 to 9
    array.push(a, close[i])
plot(array.get(a, 0))
array.reverse(a)
plot(array.get(a, 0))
```

See also

[array.new_float()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.new_float) [array.sort()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.sort) [array.push()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.push) [array.set()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.set) [array.avg()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.avg)
