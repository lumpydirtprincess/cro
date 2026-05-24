# dayofweek

The day number of the week, in the exchange time zone, calculated from the bar's opening UNIX timestamp.

Type

series int

Remarks

This variable always references the day number corresponding to the bar's opening time. Consequently, for symbols with overnight sessions (e.g., "EURUSD", where the "Monday" session starts on Sunday at 17:00 in exchange time), the value may represent a day from the previous week rather than the session's primary trading day.

You can use [dayofweek.sunday](https://www.tradingview.com/pine-script-reference/v6/#const_dayofweek.sunday), [dayofweek.monday](https://www.tradingview.com/pine-script-reference/v6/#const_dayofweek.monday), [dayofweek.tuesday](https://www.tradingview.com/pine-script-reference/v6/#const_dayofweek.tuesday), [dayofweek.wednesday](https://www.tradingview.com/pine-script-reference/v6/#const_dayofweek.wednesday), [dayofweek.thursday](https://www.tradingview.com/pine-script-reference/v6/#const_dayofweek.thursday), [dayofweek.friday](https://www.tradingview.com/pine-script-reference/v6/#const_dayofweek.friday) and [dayofweek.saturday](https://www.tradingview.com/pine-script-reference/v6/#const_dayofweek.saturday) variables for comparisons.

See also

[dayofweek()](https://www.tradingview.com/pine-script-reference/v6/#fun_dayofweek) [time](https://www.tradingview.com/pine-script-reference/v6/#var_time) [year](https://www.tradingview.com/pine-script-reference/v6/#var_year) [month](https://www.tradingview.com/pine-script-reference/v6/#var_month) [weekofyear](https://www.tradingview.com/pine-script-reference/v6/#var_weekofyear) [dayofmonth](https://www.tradingview.com/pine-script-reference/v6/#var_dayofmonth) [hour](https://www.tradingview.com/pine-script-reference/v6/#var_hour) [minute](https://www.tradingview.com/pine-script-reference/v6/#var_minute) [second](https://www.tradingview.com/pine-script-reference/v6/#var_second)
