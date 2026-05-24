# volume_row.delta()

Calculates the volume delta for the volume footprint row represented by a [volume_row](https://www.tradingview.com/pine-script-reference/v6/#type_volume_row) object. The value represents the difference between the row's "buy" volume and "sell" volume. A positive value indicates that the "buy" volume for the row exceeds the "sell" volume, and a negative value indicates the opposite.

Syntax

```
volume_row.delta(id) → series float
```

Arguments

id (volume_row) The reference (ID) of the [volume_row](https://www.tradingview.com/pine-script-reference/v6/#type_volume_row) object to analyze.

Returns

The volume delta for the footprint row.
