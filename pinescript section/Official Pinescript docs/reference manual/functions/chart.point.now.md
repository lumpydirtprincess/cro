# chart.point.now()

Returns a [chart.point](https://www.tradingview.com/pine-script-reference/v6/#type_chart.point) object with `price` as the y-coordinate

Syntax

```
chart.point.now(price) → chart.point
```

Arguments

price (series int/float) The y-coordinate of the point. Optional. The default is [close](https://www.tradingview.com/pine-script-reference/v6/#var_close).

Remarks

The [chart.point](https://www.tradingview.com/pine-script-reference/v6/#type_chart.point) instance returned from this function records values for its `index` and `time` fields on the bar it executed on, making it suitable for use with drawing objects of any `xloc` type.
