# request.footprint()

Requests the ID of a [footprint](https://www.tradingview.com/pine-script-reference/v6/#type_footprint) object that contains data for calculating [volume footprint](https://www.tradingview.com/support/solutions/43000726164/) information for the current chart bar. Scripts can use the returned ID in calls to the `footprint.*()` functions to retrieve footprint data, including footprint rows, categorized volume sums, and volume delta.

Syntax

```
request.footprint(ticks_per_row, va_percent, imbalance_percent) → footprint
```

Arguments

ticks_per_row (simple int) The price range of each footprint row, expressed in ticks.

va_percent (simple int/float) Optional. The percentage of each footprint's total volume to use for calculating the value area (VA). The default is 70.

imbalance_percent (simple int/float) Optional. The percentage difference in volume for detecting row imbalances. Scripts can use [volume_row](https://www.tradingview.com/pine-script-reference/v6/#type_volume_row) IDs retrieved from the returned [footprint](https://www.tradingview.com/pine-script-reference/v6/#type_footprint) object in calls to [volume_row.has_buy_imbalance()](https://www.tradingview.com/pine-script-reference/v6/#fun_volume_row.has_buy_imbalance) and [volume_row.has_sell_imbalance()](https://www.tradingview.com/pine-script-reference/v6/#fun_volume_row.has_sell_imbalance) to identify imbalanced rows. A row is imbalanced if its "buy" volume exceeds the "sell" volume of the row below it by the specified percentage, or if its "sell" volume exceeds the "buy" volume of the row above it by the percentage. The default is 300.

Returns

The ID of a [footprint](https://www.tradingview.com/pine-script-reference/v6/#type_footprint) object containing volume footprint data for the current bar, or [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) if no data is available.

Remarks

Only accounts with Premium or Ultimate [plans](https://www.tradingview.com/pricing/?status=pro#comparison) can use scripts that call this function.

A single script cannot include more than one `request.footprint()` call.
