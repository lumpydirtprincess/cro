# syminfo.pricescale

Returns a whole number used to calculate the smallest increment between a symbol's price movements ( [syminfo.mintick](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.mintick)). It is the denominator in the [syminfo.mintick](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.mintick) formula: `syminfo.minmove / syminfo.pricescale = syminfo.mintick`.

Type

simple int

See also

[ticker.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_ticker.new) [syminfo.ticker](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.ticker) [timeframe.period](https://www.tradingview.com/pine-script-reference/v6/#var_timeframe.period) [timeframe.multiplier](https://www.tradingview.com/pine-script-reference/v6/#var_timeframe.multiplier) [syminfo.root](https://www.tradingview.com/pine-script-reference/v6/#var_syminfo.root)
