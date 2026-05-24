# time_close

The time of the current bar's close in UNIX format. It represents the number of milliseconds elapsed since 00:00:00 UTC, 1 January 1970. On tick charts and price-based charts such as Renko, line break, Kagi, point & figure, and range, this variable's series holds an [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) timestamp for the latest realtime bar (because the future closing time is unpredictable), but valid timestamps for all previous bars.

Type

series int

See also

[time](https://www.tradingview.com/pine-script-reference/v6/#var_time) [timenow](https://www.tradingview.com/pine-script-reference/v6/#var_timenow) [year](https://www.tradingview.com/pine-script-reference/v6/#var_year) [month](https://www.tradingview.com/pine-script-reference/v6/#var_month) [weekofyear](https://www.tradingview.com/pine-script-reference/v6/#var_weekofyear) [dayofmonth](https://www.tradingview.com/pine-script-reference/v6/#var_dayofmonth) [dayofweek](https://www.tradingview.com/pine-script-reference/v6/#var_dayofweek) [hour](https://www.tradingview.com/pine-script-reference/v6/#var_hour) [minute](https://www.tradingview.com/pine-script-reference/v6/#var_minute) [second](https://www.tradingview.com/pine-script-reference/v6/#var_second)
