# bid

The bid price at the time of the current tick, which represents the highest price an active buyer is willing to pay for the instrument at its current value. This information is available only on the "1T" timeframe. On other timeframes, the variable's value is [na](https://www.tradingview.com/pine-script-reference/v6/#var_na).

Type

series float

Remarks

If the bid/ask values change since the last tick but no new trades are made, these changes will not be reflected in the value of this variable. It is only updated on new ticks.

See also

[open](https://www.tradingview.com/pine-script-reference/v6/#var_open) [high](https://www.tradingview.com/pine-script-reference/v6/#var_high) [low](https://www.tradingview.com/pine-script-reference/v6/#var_low) [volume](https://www.tradingview.com/pine-script-reference/v6/#var_volume) [time()](https://www.tradingview.com/pine-script-reference/v6/#fun_time) [hl2](https://www.tradingview.com/pine-script-reference/v6/#var_hl2) [hlc3](https://www.tradingview.com/pine-script-reference/v6/#var_hlc3) [hlcc4](https://www.tradingview.com/pine-script-reference/v6/#var_hlcc4) [ohlc4](https://www.tradingview.com/pine-script-reference/v6/#var_ohlc4) [ask](https://www.tradingview.com/pine-script-reference/v6/#var_ask)
