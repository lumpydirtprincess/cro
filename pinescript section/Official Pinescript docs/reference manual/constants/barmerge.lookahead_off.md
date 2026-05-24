# barmerge.lookahead_off

Merge strategy for the requested data position. Requested barset is merged with current barset in the order of sorting bars by their close time. This merge strategy disables effect of getting data from "future" on calculation on history.

Type

const barmerge_lookahead

See also

[request.security()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.security) [barmerge.lookahead_on](https://www.tradingview.com/pine-script-reference/v6/#const_barmerge.lookahead_on)
