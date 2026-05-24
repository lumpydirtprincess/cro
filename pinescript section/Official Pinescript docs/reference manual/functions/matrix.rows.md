# matrix.rows()

The function returns the number of rows in the matrix.

Syntax

```
matrix.rows(id) → series int
```

Arguments

id (any matrix type) A matrix object.

Example

```
//@version=6
indicator("`matrix.rows()` Example")

// Create a 2x6 matrix with values `0`.
var m = matrix.new<int>(2, 6, 0)

// Get the quantity of rows in the matrix.
var x = matrix.rows(m)

// Display using a label.
if barstate.islastconfirmedhistory
    label.new(bar_index, high, "Rows: " + str.tostring(x) + "\n" + str.tostring(m))
```

Returns

The number of rows in the matrix `id`.

See also

[matrix.new<type>()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.new%3Ctype%3E) [matrix.get()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.get) [matrix.set()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.set) [matrix.columns()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.columns) [matrix.row()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.row)
