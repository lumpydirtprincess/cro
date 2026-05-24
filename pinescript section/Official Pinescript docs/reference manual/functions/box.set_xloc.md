# box.set_xloc()

Sets the left and right borders of a [box](https://www.tradingview.com/pine-script-reference/v6/#type_box) and updates its `xloc` property.

Syntax

```
box.set_xloc(id, left, right, xloc) → void
```

Arguments

id (series box) The ID of the box object to update.

left (series int) The bar index or timestamp for the left border of the box.

right (series int) The bar index or timestamp for the right border of the box.

xloc (series string) Determines whether the box treats the `left` and `right` arguments as bar indices or timestamps. Possible values: [xloc.bar_index](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_index) and [xloc.bar_time](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_time). If the value is [xloc.bar_index](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_index), the arguments represent bar indices. If [xloc.bar_time](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_time), the arguments represent [UNIX timestamps](https://www.tradingview.com/pine-script-docs/concepts/time/#unix-timestamps).

See also

[box.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.new) [xloc.bar_index](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_index) [xloc.bar_time](https://www.tradingview.com/pine-script-reference/v6/#const_xloc.bar_time)
