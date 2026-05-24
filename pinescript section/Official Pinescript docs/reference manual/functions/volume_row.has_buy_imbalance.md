# volume_row.has_buy_imbalance()

Checks whether the volume footprint row represented by a [volume_row](https://www.tradingview.com/pine-script-reference/v6/#type_volume_row) object has a "buy" imbalance, based on the `imbalance_percent` argument of the [request.footprint()](https://www.tradingview.com/pine-script-reference/v6/#fun_request.footprint) call that the object depends on. Returns `true` if the row's "buy" volume exceeds the "sell" volume of the row below it in the footprint by the specified percentage, and `false` otherwise.

Syntax

```
volume_row.has_buy_imbalance(id) → series bool
```

Arguments

id (volume_row) The reference (ID) of the [volume_row](https://www.tradingview.com/pine-script-reference/v6/#type_volume_row) object to analyze.

Returns

A value of `true` if the footprint row has a detected buy imbalance, and `false` otherwise.
