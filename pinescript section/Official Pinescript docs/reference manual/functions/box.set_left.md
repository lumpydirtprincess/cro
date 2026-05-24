# box.set_left()

Sets the left coordinate of the box.

Syntax

```
box.set_left(id, left) → void
```

Arguments

id (series box) A box object.

left (series int) Bar index or bar time of the left border. Note that objects positioned using [xloc.bar_index](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_index) cannot be drawn further than 500 bars into the future.

See also

[box.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.new) [box.get_left()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.get_left)
