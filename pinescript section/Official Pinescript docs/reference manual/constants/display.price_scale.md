# display.price_scale

A named constant for use with the `display` parameter of the `plot*()` functions. Specifies that the price scale displays a label for the plot's data, but only if the chart's settings allow it.

Type

const plot_display

Remarks

The `display.*` constants support [+](https://www.tradingview.com/pine-script-reference/v6/#op_+) and [-](https://www.tradingview.com/pine-script-reference/v6/#op_-) operations, enabling custom combinations of display settings. For example, `display.price_scale + display.data_window` specifies that the plot's data appears on the price scale and in the Data Window, and `display.all - display.price_scale` specifies that the data appears in all possible locations except for the price scale.

Selecting a deselected plot in the script's "Settings/Style" tab changes its display settings, causing the plotted data to appear in all available chart locations. To restore the display settings coded in the script, select "Reset settings" from the "Defaults" dropdown menu at the bottom of the "Settings" dialog box.

See also

[plot()](https://www.tradingview.com/pine-script-reference/v6/#fun_plot) [plotshape()](https://www.tradingview.com/pine-script-reference/v6/#fun_plotshape) [plotchar()](https://www.tradingview.com/pine-script-reference/v6/#fun_plotchar) [plotarrow()](https://www.tradingview.com/pine-script-reference/v6/#fun_plotarrow) [plotbar()](https://www.tradingview.com/pine-script-reference/v6/#fun_plotbar) [plotcandle()](https://www.tradingview.com/pine-script-reference/v6/#fun_plotcandle)
