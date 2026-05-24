# matrix.sort()

2 overloads

The function rearranges the rows in the `id` matrix following the sorted order of the values in the `column`.

Syntax & Overloads

[```\\
matrix.sort(id, column, order) → void\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.sort-0) [```\\
matrix.sort(id, column, order, sort_field) → void\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.sort-1)

Arguments

id (matrix<int/float/string>) A matrix object to be sorted.

column (series int) Index of the column whose sorted values determine the new order of rows. Optional. The default value is 0.

order (series sort_order) The sort order. Possible values: [order.ascending](https://www.tradingview.com/pine-script-reference/v6/#const_order.ascending) (default), [order.descending](https://www.tradingview.com/pine-script-reference/v6/#const_order.descending).

Example

```
//@version=6
indicator("`matrix.sort()` Example")

// For efficiency, execute this code only once.
if barstate.islastconfirmedhistory
    // Create a 2x2 matrix.
    var m1 = matrix.new<float>(2, 2, na)
    // Fill the matrix with values.
    matrix.set(m1, 0, 0, 3)
    matrix.set(m1, 0, 1, 4)
    matrix.set(m1, 1, 0, 1)
    matrix.set(m1, 1, 1, 2)

    // Copy the matrix to a new one.
    var m2 = matrix.copy(m1)
    // Sort the rows of `m2` using the default arguments (first column and ascending order).
    matrix.sort(m2)

    // Display using a table.
    if barstate.islastconfirmedhistory
        var t = table.new(position.top_right, 2, 2, color.green)
        table.cell(t, 0, 0, "Original matrix:")
        table.cell(t, 0, 1, str.tostring(m1))
        table.cell(t, 1, 0, "Sorted matrix:")
        table.cell(t, 1, 1, str.tostring(m2))
```

See also

[matrix.new<type>()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.new%3Ctype%3E) [matrix.max()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.max) [matrix.min()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.min) [matrix.avg()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.avg)
