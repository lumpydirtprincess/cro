# session.islastbar

Returns [true](https://www.tradingview.com/pine-script-reference/v6/#const_true) if the current bar is the last bar of the day's session, [false](https://www.tradingview.com/pine-script-reference/v6/#const_false) otherwise. If extended session information is used, only returns `true` on the last bar of the post-market bars.

Type

series bool

Example

```
//@version=6
strategy("`session.islastbar` Example", overlay = true)
longCondition = year >= 2022
// Place a long order at the `close` of the trading session's last bar.
// The position will enter on the `open` of next session's first bar.
if session.islastbar and longCondition
    strategy.entry("Long", strategy.long)
 // Close 'Long' position at the close of the last bar of the trading session
if session.islastbar and barstate.isconfirmed
    strategy.close("Long", immediately = true)
```

Remarks

This variable is not guaranteed to return [true](https://www.tradingview.com/pine-script-reference/v6/#const_true) once in every session because the last bar of the session might not exist if no trades occur during what should be the session's last bar.

This variable is not guaranteed to work as expected on non-standard chart types, e.g., Renko.

See also

[session.isfirstbar](https://www.tradingview.com/pine-script-reference/v6/#var_session.isfirstbar) [session.islastbar_regular](https://www.tradingview.com/pine-script-reference/v6/#var_session.islastbar_regular)
