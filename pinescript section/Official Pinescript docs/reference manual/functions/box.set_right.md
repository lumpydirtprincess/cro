# box.set_right()

Sets the right coordinate of the box.

Syntax

```
box.set_right(id, right) → void
```

Arguments

id (series box) A box object.

right (series int) Bar index or bar time of the right border. Note that objects positioned using [xloc.bar_index](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_index) cannot be drawn further than 500 bars into the future.

See also

[box.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.new) [box.get_right()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.get_right)
