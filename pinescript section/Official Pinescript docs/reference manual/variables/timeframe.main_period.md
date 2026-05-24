# timeframe.main_period

A string representation of the script's main timeframe. If the script is an [indicator()](https://www.tradingview.com/pine-script-reference/v6/#fun_indicator) that specifies a `timeframe` value in its declaration statement, this variable holds that value. Otherwise, its value represents the chart's timeframe. Unlike [timeframe.period](https://www.tradingview.com/pine-script-reference/v6/#var_timeframe.period), this variable's value does not change when used in the `expression` argument of a `request.*()` function call.

The string's format is "<quantity>\[<unit>\]", where <unit> is "T" for ticks, "S" for seconds, "D" for days, "W" for weeks, and "M" for months, but is absent for minutes. No <unit> exists for hours: hourly timeframes are expressed in minutes.

The variable's value is: "10S" for 10 seconds, "30" for 30 minutes, "240" for four hours, "1D" for one day, "2W" for two weeks, and "3M" for one quarter.

Type

simple string

See also

[timeframe.period](https://www.tradingview.com/pine-script-reference/v6/#var_timeframe.period) [syminfo.main_tickerid](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.main_tickerid) [syminfo.ticker](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.ticker) [syminfo.tickerid](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.tickerid) [timeframe.multiplier](https://www.tradingview.com/pine-script-reference/v6/#var_timeframe.multiplier)
