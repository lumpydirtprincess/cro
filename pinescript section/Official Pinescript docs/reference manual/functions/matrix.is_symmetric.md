# matrix.is_symmetric()

The function determines if a [square matrix](https://en.wikipedia.org/wiki/Square_matrix) is [symmetric](https://en.wikipedia.org/wiki/Symmetric_matrix) (elements are symmetric with respect to the [main diagonal](https://en.wikipedia.org/wiki/Main_diagonal)).

Syntax

```
matrix.is_symmetric(id) → series bool
```

Arguments

id (matrix<int/float>) Matrix object to test.

Returns

Returns true if the `id` matrix is symmetric, false otherwise.

Remarks

Returns false with non-square matrices.

See also

[matrix.new<type>()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.new%3Ctype%3E) [matrix.get()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.get) [matrix.set()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.set) [matrix.is_square()](https://www.tradingview.com/pine-script-reference/v6/#fun_matrix.is_square)
