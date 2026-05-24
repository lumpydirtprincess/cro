# matrix.avg()

2 overloads

The function calculates the average of all elements in the matrix.

Syntax & Overloads

[```\\
matrix.avg(id) → series float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.avg-0) [```\\
matrix.avg(id) → series int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.avg-1)

Arguments

id (matrix<int/float>) A matrix object.

Example

```
//@version=6
indicator("`matrix.avg()` Example")

// Create a 2x2 matrix.
var m = matrix.new<int>(2, 2, na)
// Fill the matrix with values.
matrix.set(m, 0, 0, 1)
matrix.set(m, 0, 1, 2)
matrix.set(m, 1, 0, 3)
matrix.set(m, 1, 1, 4)

// Get the average value of the matrix.
var x = matrix.avg(m)

plot(x, 'Matrix average value')
```

Returns

The average value from the `id` matrix.

See also

[matrix.new<type>()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.new%3Ctype%3E) [matrix.get()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.get) [matrix.set()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.set) [matrix.columns()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.columns) [matrix.rows()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.rows)
