![](../5. Errors_And_Warnings/errors_ce10101.md)

## [The condition of the “X” statement must evaluate to a “bool” value](../5. Errors_And_Warnings/errors_ce10101.md#the-condition-of-the-x-statement-must-evaluate-to-a-bool-value)

This compilation error occurs if one or more of the _conditions_ that control the flow of a [conditional structure](../3. Language/language_conditional-structures.md) (an [if](../../reference manual/keywords/if.md) or [switch](../../reference manual/keywords/switch.md) statement) returns a value that is _not_ of the [“bool” type](../3. Language/language_type-system.md#bool). These structures _cannot_ use values other than `true` and `false` as conditions.

The following sections explain the usual causes of this error and the typical solutions.

### [Using numeric conditions](../5. Errors_And_Warnings/errors_ce10101.md#using-numeric-conditions)

In some programming languages, including earlier versions of Pine Script® up to v5, numeric values of the “int” and “float” types are implicitly converted to `true` or `false` when the script passes them to expressions that require “bool” values. The typical rules for such conversions are as follows:

- A value of `0`, `0.0`, or [na](../../reference manual/variables/na.md) converts to `false`.
- _Any_ other nonzero, non-na value converts to `true`.

Although this logic might offer a marginal amount of convenience for experienced programmers in some rare cases, it can also easily lead to unintended results. Therefore, as of v6, Pine Script no longer implicitly casts numeric values to “bool” values in operations or function calls.

To work around this limitation, programmers can do either of the following:

- Use the [bool()](../../reference manual/functions/bool.md) function to _explicitly_ cast “int” or “float” values to the “bool” type based on the above rules.
- Write conditional expressions that _compare_ numeric values and return “bool” results.

For example, the script below does not compile because it attempts to use the `newMonth` variable, which holds a _“series int”_ value, as the condition in an [if](../../reference manual/keywords/if.md) statement:

```pine
//@version=6
indicator("Invalid numeric condition demo")

//@variable Holds the one-bar change in the value of the `month` variable ("series int").
//          The value is nonzero only on bars where the month changed in the exchange time zone.
newMonth = ta.change(month)

// This code causes the error. The `if` statement requires "bool" conditions for its control criteria.
// It cannot accept an "int" value or a value of any other type.
if newMonth
    label.new(bar_index, high, "New month started")
```

To resolve the error, we can pass the `newMonth` variable to a [bool()](../../reference manual/functions/bool.md) function call, and then use that call’s “series bool” result as the [if](../../reference manual/keywords/if.md) statement’s condition. For example:

```pine
//@version=6
indicator("Explicitly casting a numeric condition demo")

//@variable Holds the one-bar change in the value of the `month` variable ("series int").
//          The value is nonzero only on bars where the month changed in the exchange time zone.
newMonth = ta.change(month)

// This code does not cause the error. The `bool()` call casts the `newMonth` value to the "bool" type.
// The call returns `true` if the variable's value is a nonzero number, and `false` otherwise.
if bool(newMonth)
    label.new(bar_index, high, "New month started")
```

Note that:

- The [bool()](../../reference manual/functions/bool.md) call casts the _value_ retrieved from the variable to `true` or `false`, but it does _not_ change the _variable’s_ type to “bool”. The script can still use the `newMonth` variable in other code that accepts “series int” values.

### [Implicitly testing for ​`na`​ values](../5. Errors_And_Warnings/errors_ce10101.md#implicitly-testing-for-na-values)

Values or references of most types can be [na](../../reference manual/variables/na.md), which means _undefined_. Programmers sometimes tested for [na](../../reference manual/variables/na.md) in Pine v5 and earlier versions by using implicit “bool” casting behaviors in conditional logic. Such logic does not compile in Pine v6. Furthermore, such tests do not distinguish between numeric values that are [na](../../reference manual/variables/na.md) or 0.

Programmers can explicitly test for [na](../../reference manual/variables/na.md) instances of most available types and retrieve a “bool” result by using the [na()](../../reference manual/functions/na.md) function. A call to the function returns `true` if its argument is [na](../../reference manual/variables/na.md), and `false` otherwise.

Consider the following script, which tries to use the result of a [ta.pivothigh()](../../reference manual/functions/ta.pivothigh.md) function call to control an [if](../../reference manual/keywords/if.md) statement. The call returns a “float” price value if it confirms a pivot high point, or [na](../../reference manual/variables/na.md) if no pivot high is confirmed. This script does not compile, because the [if](../../reference manual/keywords/if.md) statement cannot use a “float” value or any [na](../../reference manual/variables/na.md) value as a condition:

```pine
//@version=6
indicator("Invalid test for `na` demo", overlay = true)

//@variable Holds a non-na price value ("series float") if a pivot high is detected, and `na` otherwise.
pivot = ta.pivothigh(10, 10)

// This code causes the error. The `if` statement requires a "bool" condition. It can't use a "float" value.
// It also cannot use `na` in any case because "bool" values are never `na`.
if pivot
    label.new(bar_index[10], pivot, "Pivot High")
```

We can resolve the error and achieve our script’s intended result by replacing `pivot` in the [if](../../reference manual/keywords/if.md) statement with the expression `not na(pivot)`, which returns `true` if the variable’s value is not [na](../../reference manual/variables/na.md), and `false` otherwise. For example:

```pine
//@version=6
indicator("Valid test for `na` demo", overlay = true)

//@variable Holds a non-na price value ("series float") if a pivot high is detected, and `na` otherwise.
pivot = ta.pivothigh(10, 10)

// This code does not cause the error, because the expression used as the condition returns a "bool" result.
if not na(pivot)
    label.new(bar_index[10], pivot, "Pivot High")
```

[Previous 
**Overview**](../5. Errors_And_Warnings/errors_overview.md) [Next 
**CW10003**](../5. Errors_And_Warnings/errors_cw10003.md)