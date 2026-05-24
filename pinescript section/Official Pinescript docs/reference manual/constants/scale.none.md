# scale.none

A named constant for use as the `scale` argument in [indicator()](https://www.tradingview.com/pine-script-reference/v6/#fun_indicator) and [strategy()](https://www.tradingview.com/pine-script-reference/v6/#fun_strategy) declaration statements. A declaration statement can use this constant only if its `overlay` argument is `true`. Specifies that the script scales its visuals independently to fit the visual space of the main chart pane or another script's pane without displaying a separate scale. The script displays plotted numbers directly on the pane's existing price scale if the chart's settings allow it. If the user moves the script to a new pane, the script displays the values on a new scale to the left or right of that pane, depending on the chart's "Scales placement" setting.

Type

const scale_type

See also

[indicator()](https://www.tradingview.com/pine-script-reference/v6/#fun_indicator)
