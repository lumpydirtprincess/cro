# +=

Addition assignment. Applicable to numerical expressions or strings.

Syntax

```
expr1 += expr2
```

Example

```
//@version=6
indicator("+=")
// Equals to expr1 = expr1 + expr2.
a = 2
b = 3
a += b
// Result: a = 5.
plot(a)
```

Returns

For strings returns concatenation of expr1 and expr2. For numbers returns integer or float value, or series of values.

Remarks

You may use arithmetic operators with numbers as well as with series variables. In case of usage with series the operators are applied elementwise.
