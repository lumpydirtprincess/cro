# matrix.is_antisymmetric()

The function determines if a matrix is [antisymmetric](https://en.wikipedia.org/wiki/Skew-symmetric_matrix) (its [transpose](https://en.wikipedia.org/wiki/Transpose) equals its negative).

Syntax

```
matrix.is_antisymmetric(id) → series bool
```

Arguments

id (matrix<int/float>) Matrix object to test.

Returns

Returns true, if the `id` matrix is antisymmetric, false otherwise.

Remarks

Returns false with non-square matrices.

See also

[matrix.new<type>()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.new%3Ctype%3E) [matrix.get()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.get) [matrix.set()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.set) [matrix.is_square()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.is_square)
