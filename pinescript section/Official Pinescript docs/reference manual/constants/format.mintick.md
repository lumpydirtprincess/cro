# format.mintick

Is a named constant to use with the [str.tostring()](https://www.tradingview.com/pine-script-reference/v6/#fun_str.tostring) function. Passing a number to [str.tostring()](https://www.tradingview.com/pine-script-reference/v6/#fun_str.tostring) with this argument rounds the number to the nearest value that can be divided by [syminfo.mintick](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.mintick), without the remainder, with ties rounding up, and returns the string version of said value with trailing zeros.

Type

const string

See also

[indicator()](https://www.tradingview.com/pine-script-reference/v6/#fun_indicator) [format.inherit](https://www.tradingview.com/pine-script-reference/v6/#const_format.inherit) [format.price](https://www.tradingview.com/pine-script-reference/v6/#const_format.price) [format.volume](https://www.tradingview.com/pine-script-reference/v6/#const_format.volume)
