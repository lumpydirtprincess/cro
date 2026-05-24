# barmerge.lookahead_on

Merge strategy for the requested data position. Requested barset is merged with current barset in the order of sorting bars by their opening time. This merge strategy can lead to undesirable effect of getting data from "future" on calculation on history. This is unacceptable in backtesting strategies, but can be useful in indicators.

Type

const barmerge_lookahead

See also

[request.security()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.security) [barmerge.lookahead_off](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.lookahead_off)
