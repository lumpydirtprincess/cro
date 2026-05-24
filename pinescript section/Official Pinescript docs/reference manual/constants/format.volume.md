# format.volume

Is a named constant for selecting the formatting of the script output values as volume in the [indicator()](https://www.tradingview.com/pine-script-reference/v6/#fun_indicator) function, e.g. '5183' will be formatted as '5.183K'.

The decimal precision rules defined by this variable take precedence over other precision settings. When an [indicator()](https://www.tradingview.com/pine-script-reference/v6/#fun_indicator), [strategy()](https://www.tradingview.com/pine-script-reference/v6/#fun_strategy), or `plot*()` call uses this `format` option, the function's `precision` parameter will not affect the result.

Type

const string

See also

[indicator()](https://www.tradingview.com/pine-script-reference/v6/#fun_indicator) [format.inherit](https://www.tradingview.com/pine-script-reference/v6/#const_format.inherit) [format.price](https://www.tradingview.com/pine-script-reference/v6/#const_format.price) [format.percent](https://www.tradingview.com/pine-script-reference/v6/#const_format.percent)
