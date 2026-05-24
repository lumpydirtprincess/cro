# dayofmonth

The day number of the month, in the exchange time zone, calculated from the bar's opening UNIX timestamp.

Type

series int

Remarks

This variable always references the day number corresponding to the bar's opening time. Consequently, for symbols with overnight sessions (e.g., "EURUSD", where the "Monday" session starts on Sunday at 17:00 in exchange time), the value may represent a day from the previous week rather than the session's primary trading day.

See also

[dayofmonth()](https://www.tradingview.com/pine-script-reference/v6/#fun_dayofmonth) [dayofweek](https://www.tradingview.com/pine-script-reference/v6/#var_dayofweek) [weekofyear](https://www.tradingview.com/pine-script-reference/v6/#var_weekofyear) [time](https://www.tradingview.com/pine-script-reference/v6/#var_time) [year](https://www.tradingview.com/pine-script-reference/v6/#var_year) [month](https://www.tradingview.com/pine-script-reference/v6/#var_month) [hour](https://www.tradingview.com/pine-script-reference/v6/#var_hour) [minute](https://www.tradingview.com/pine-script-reference/v6/#var_minute) [second](https://www.tradingview.com/pine-script-reference/v6/#var_second)
