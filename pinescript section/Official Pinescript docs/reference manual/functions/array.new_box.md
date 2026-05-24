# array.new_box()

The function creates a new array object of box type elements.

Syntax

```
array.new_box(size, initial_value) → array<box>
```

Arguments

size (series int) Initial size of an array. Optional. The default is 0.

initial_value (series box) Initial value of all array elements. Optional. The default is 'na'.

Example

```
//@version=6
indicator("array.new_box example")
boxes = array.new_box()
array.push(boxes, box.new(time, close, time+2, low, xloc=xloc.bar_time))
plot(1)
```

Returns

The ID of an array object which may be used in other array.\*() functions.

Remarks

An array index starts from 0.

See also

[array.new_float()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.new_float) [array.get()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.get) [array.slice()](https://www.tradingview.com/pine-script-reference/v6/#fun_array.slice)
