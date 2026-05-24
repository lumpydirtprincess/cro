# display.all

A named constant for use with the `display` parameter of the `plot*()`, `input*()`, [fill()](https://www.tradingview.com/pine-script-reference/v6/#fun_fill), [bgcolor()](https://www.tradingview.com/pine-script-reference/v6/#fun_bgcolor), [barcolor()](https://www.tradingview.com/pine-script-reference/v6/#fun_barcolor), and [hline()](https://www.tradingview.com/pine-script-reference/v6/#fun_hline) functions. Specifies that the values or visuals appear in all possible locations by default.

Type

const plot_simple_display

Remarks

The `display.*` constants support [+](https://www.tradingview.com/pine-script-reference/v6/#op_+) and [-](https://www.tradingview.com/pine-script-reference/v6/#op_-) operations, enabling custom combinations of display settings. For example, `display.all - display.data_window` specifies that the data for an input or plot appears in all possible locations except for the Data Window.

Selecting a deselected plot in the script's "Settings/Style" tab changes its display settings, causing the plotted data to appear in all available chart locations. To restore the display settings coded in the script, select "Reset settings" from the "Defaults" dropdown menu at the bottom of the "Settings" dialog box.

See also

[plot()](https://www.tradingview.com/pine-script-reference/v6/#fun_plot) [plotshape()](https://www.tradingview.com/pine-script-reference/v6/#fun_plotshape) [plotchar()](https://www.tradingview.com/pine-script-reference/v6/#fun_plotchar) [plotarrow()](https://www.tradingview.com/pine-script-reference/v6/#fun_plotarrow) [plotbar()](https://www.tradingview.com/pine-script-reference/v6/#fun_plotbar) [plotcandle()](https://www.tradingview.com/pine-script-reference/v6/#fun_plotcandle)
