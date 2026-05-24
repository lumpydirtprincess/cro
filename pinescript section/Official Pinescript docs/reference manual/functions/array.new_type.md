# array.new<type>()

The function creates a new array object of <type> elements.

Syntax

```
array.new<type>(size, initial_value) → array<type>
```

Arguments

size (series int) Initial size of an array. Optional. The default is 0.

initial_value (<array_type>) Initial value of all array elements. Optional. The default is 'na'.

Example

```
//@version=6
indicator("array.new<string> example")
a = array.new<string>(1, "Hello, World!")
label.new(bar_index, close, array.get(a, 0))
```

Example

```
//@version=6
indicator("array.new<color> example")
a = array.new<color>()
array.push(a, color.red)
array.push(a, color.green)
plot(close, color = array.get(a, close > open ? 1 : 0))
```

Example

```
//@version=6
indicator("array.new<float> example")
length = 5
var a = array.new<float>(length, close)
if array.size(a) == length
    array.remove(a, 0)
    array.push(a, close)
plot(array.sum(a) / length, "SMA")
```

Example

```
//@version=6
indicator("array.new<line> example")
// draw last 15 lines
var a = array.new<line>()
array.push(a, line.new(bar_index - 1, close[1], bar_index, close))
if array.size(a) > 15
    ln = array.shift(a)
    line.delete(ln)
```

Returns

The ID of an array object which may be used in other array.\*() functions.

Remarks

An array index starts from 0.

If you want to initialize an array and specify all its elements at the same time, then use the function array.from.

See also

[array.from()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.from) [array.push()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.push) [array.get()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.get) [array.size()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.size) [array.remove()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.remove) [array.shift()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.shift) [array.sum()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.sum)
