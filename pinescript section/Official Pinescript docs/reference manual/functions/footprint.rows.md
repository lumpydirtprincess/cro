# footprint.rows()

Creates an array containing all [volume_row](https://www.tradingview.com/pine-script-reference/v6/#type_volume_row) IDs from a [footprint](https://www.tradingview.com/pine-script-reference/v6/#type_footprint) object. Each [volume_row](https://www.tradingview.com/pine-script-reference/v6/#type_volume_row) object referenced in the array contains data for one row in the calculated volume footprint, where the first object represents the lowest row and the last one represents the highest row.

Syntax

```
footprint.rows(id) → array<volume_row>
```

Arguments

id (footprint) The reference (ID) of the [footprint](https://www.tradingview.com/pine-script-reference/v6/#type_footprint) object to analyze.

Returns

The ID of an array containing a [volume_row](https://www.tradingview.com/pine-script-reference/v6/#type_volume_row) ID for each row in the footprint.
