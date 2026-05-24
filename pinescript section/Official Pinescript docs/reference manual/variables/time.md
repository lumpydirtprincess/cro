# time

Current bar time in UNIX format. It is the number of milliseconds that have elapsed since 00:00:00 UTC, 1 January 1970.

Type

series int

Remarks

Note that this variable returns the timestamp based on the time of the bar's open. Because of that, for overnight sessions (e.g. EURUSD, where Monday session starts on Sunday, 17:00) this variable can return time before the specified date of the trading day. For example, on EURUSD, `dayofmonth(time)` can be lower by 1 than the date of the trading day, because the bar for the current day actually opens one day prior.

See also

[time()](https://www.tradingview.com/pine-script-reference/v6/#fun_time) [time_close](https://www.tradingview.com/pine-script-reference/v6/#var_time_close) [timenow](https://www.tradingview.com/pine-script-reference/v6/#var_timenow) [year](https://www.tradingview.com/pine-script-reference/v6/#var_year) [month](https://www.tradingview.com/pine-script-reference/v6/#var_month) [weekofyear](https://www.tradingview.com/pine-script-reference/v6/#var_weekofyear) [dayofmonth](https://www.tradingview.com/pine-script-reference/v6/#var_dayofmonth) [dayofweek](https://www.tradingview.com/pine-script-reference/v6/#var_dayofweek) [hour](https://www.tradingview.com/pine-script-reference/v6/#var_hour) [minute](https://www.tradingview.com/pine-script-reference/v6/#var_minute) [second](https://www.tradingview.com/pine-script-reference/v6/#var_second)
