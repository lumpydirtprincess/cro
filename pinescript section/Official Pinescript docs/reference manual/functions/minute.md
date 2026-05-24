# minute()

Syntax

```
minute(time, timezone) → series int
```

Arguments

time (series int) UNIX time in milliseconds.

timezone (series string) Allows adjusting the returned value to a time zone specified in either UTC/GMT notation (e.g., "UTC-5", "GMT+0530") or as an IANA time zone database name (e.g., "America/New_York"). Optional. The default is [syminfo.timezone](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.timezone).

Returns

Minute (in exchange timezone) for provided UNIX time.

Remarks

UNIX time is the number of milliseconds that have elapsed since 00:00:00 UTC, 1 January 1970.

See also

[minute](https://www.tradingview.com/pine-script-reference/v6/#var_minute) [time()](https://www.tradingview.com/pine-script-reference/v6/#fun_time) [year()](https://www.tradingview.com/pine-script-reference/v6/#fun_year) [month()](https://www.tradingview.com/pine-script-reference/v6/#fun_month) [dayofmonth()](https://www.tradingview.com/pine-script-reference/v6/#fun_dayofmonth) [dayofweek()](https://www.tradingview.com/pine-script-reference/v6/#fun_dayofweek) [hour()](https://www.tradingview.com/pine-script-reference/v6/#fun_hour) [second()](https://www.tradingview.com/pine-script-reference/v6/#fun_second)
