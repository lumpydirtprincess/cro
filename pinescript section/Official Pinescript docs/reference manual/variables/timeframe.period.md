# timeframe.period

A string representation of the script's main timeframe or a requested timeframe, depending on how the script uses it. The variable's value represents the timeframe of a requested dataset when used in the `expression` argument of a `request.*()` function call. Otherwise, its value represents the script's main timeframe ( [timeframe.main_period](https://www.tradingview.com/pine-script-reference/v6/#var_timeframe.main_period)), which equals either the `timeframe` argument of the [indicator()](https://www.tradingview.com/pine-script-reference/v6/#fun_indicator) declaration statement or the chart's timeframe.

The string's format is "<quantity>\[<unit>\]", where <unit> is "T" for ticks, "S" for seconds, "D" for days, "W" for weeks, and "M" for months, but is absent for minutes. No <unit> exists for hours: hourly timeframes are expressed in minutes.

The variable's value is: "10S" for 10 seconds, "30" for 30 minutes, "240" for four hours, "1D" for one day, "2W" for two weeks, and "3M" for one quarter.

Type

simple string

Remarks

To always access the script's main timeframe, even within another context, use the [timeframe.main_period](https://www.tradingview.com/pine-script-reference/v6/#var_timeframe.main_period) variable.

See also

[timeframe.main_period](https://www.tradingview.com/pine-script-reference/v6/#var_timeframe.main_period) [syminfo.main_tickerid](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.main_tickerid) [syminfo.ticker](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.ticker) [syminfo.tickerid](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.tickerid) [timeframe.multiplier](https://www.tradingview.com/pine-script-reference/v6/#var_timeframe.multiplier)
