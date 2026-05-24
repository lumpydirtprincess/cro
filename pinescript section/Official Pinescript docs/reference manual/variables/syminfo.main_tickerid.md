# syminfo.main_tickerid

A ticker identifier representing the current chart's symbol. The value contains an exchange prefix and a symbol name, separated by a colon (e.g., "NASDAQ:AAPL"). It can also include information about data modifications such as dividend adjustment, non-standard chart type, currency conversion, etc. Unlike [syminfo.tickerid](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.tickerid), this variable's value does not change when used in the `expression` argument of a `request.*()` function call.

Type

simple string

See also

[ticker.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.new) [timeframe.main_period](https://www.tradingview.com/pine-script-reference/v6/#var_timeframe.main_period) [syminfo.tickerid](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.tickerid) [syminfo.ticker](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.ticker) [timeframe.period](https://www.tradingview.com/pine-script-reference/v6/#var_timeframe.period) [timeframe.multiplier](https://www.tradingview.com/pine-script-reference/v6/#var_timeframe.multiplier) [syminfo.root](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.root)
