# weekofyear()

Calculates the week number of the year, in a specified time zone, from a UNIX timestamp.

Syntax

```
weekofyear(time, timezone) → series int
```

Arguments

time (series int) A UNIX timestamp in milliseconds.

timezone (series string) Optional. Specifies the time zone of the returned week number. The value can be a time zone string in UTC/GMT offset notation (e.g., "UTC-5") or IANA time zone database notation (e.g., "America/New_York"). The default is [syminfo.timezone](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.timezone).

Returns

The calculated week number, expressed in the specified time zone.

Remarks

A [UNIX timestamp](https://www.tradingview.com/pine-script-docs/concepts/time/#unix-timestamps) represents the number of milliseconds elapsed since 00:00 UTC on 1970-01-01. The meaning of a UNIX timestamp does not change relative to any time zone.

See also

[weekofyear](https://www.tradingview.com/pine-script-reference/v6/#var_weekofyear) [dayofmonth()](https://www.tradingview.com/pine-script-reference/v6/#fun_dayofmonth) [dayofweek()](https://www.tradingview.com/pine-script-reference/v6/#fun_dayofweek) [time()](https://www.tradingview.com/pine-script-reference/v6/#fun_time) [year()](https://www.tradingview.com/pine-script-reference/v6/#fun_year) [month()](https://www.tradingview.com/pine-script-reference/v6/#fun_month) [hour()](https://www.tradingview.com/pine-script-reference/v6/#fun_hour) [minute()](https://www.tradingview.com/pine-script-reference/v6/#fun_minute) [second()](https://www.tradingview.com/pine-script-reference/v6/#fun_second)
