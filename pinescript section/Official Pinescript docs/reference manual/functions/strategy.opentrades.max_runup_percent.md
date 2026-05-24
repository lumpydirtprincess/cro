# strategy.opentrades.max_runup_percent()

Returns the maximum run-up of the open trade, i.e., the maximum possible profit during the trade, expressed as a percentage and calculated by formula: `Highest Value During Trade / (Entry Price x Quantity) * 100`.

Syntax

```
strategy.opentrades.max_runup_percent(trade_num) → series float
```

Arguments

trade_num (series int) The trade number of the closed trade. The number of the first trade is zero.

See also

[strategy.opentrades.max_runup()](https://www.tradingview.com/pine-script-reference/v6/#fun_strategy.opentrades.max_runup) [strategy.max_runup](https://www.tradingview.com/pine-script-reference/v6/#var_strategy.max_runup)
