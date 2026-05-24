# footprint.get_row_by_price()

Analyzes the volume footprint represented by a [footprint](https://www.tradingview.com/pine-script-reference/v6/#type_footprint) object to find the row whose price range includes the specified price level. If the price belongs to one of the rows, the function returns the ID of the [volume_row](https://www.tradingview.com/pine-script-reference/v6/#type_volume_row) object that contains the data for that row. Otherwise, it returns [na](https://www.tradingview.com/pine-script-reference/v6/#var_na).

Syntax

```
footprint.get_row_by_price(id, price) → volume_row
```

Arguments

id (footprint) The reference (ID) of the [footprint](https://www.tradingview.com/pine-script-reference/v6/#type_footprint) object to analyze.

price (series int/float) The price value for which to find the corresponding footprint row.

Returns

The ID of a [volume_row](https://www.tradingview.com/pine-script-reference/v6/#type_volume_row) object representing the footprint row that contains the specified price, or [na](https://www.tradingview.com/pine-script-reference/v6/#var_na) if the price is outside the footprint's price range.
