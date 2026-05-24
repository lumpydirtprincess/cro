# strategy.opentrades.max_drawdown_percent()

Returns the maximum drawdown of the open trade, i.e., the maximum possible loss during the trade, expressed as a percentage and calculated by formula: `Lowest Value During Trade / (Entry Price x Quantity) * 100`.

Syntax

```
strategy.opentrades.max_drawdown_percent(trade_num) → series float
```

Arguments

trade_num (series int) The trade number of the closed trade. The number of the first trade is zero.

See also

[strategy.opentrades.max_drawdown()](https://www.tradingview.com/pine-script-reference/v6/#fun_strategy.opentrades.max_drawdown) [strategy.max_drawdown](https://www.tradingview.com/pine-script-reference/v6/#var_strategy.max_drawdown)
