![](../3. Language/language_conditional-structures.md)

# [Conditional structures](../3. Language/language_conditional-structures.md#conditional-structures)

## [Introduction](../3. Language/language_conditional-structures.md#introduction)

The conditional structures in Pine Script® are
[if](../../reference manual/keywords/if.md) and
[switch](../../reference manual/keywords/switch.md).
They can be used:

- For their side effects, i.e., when they don’t return a value but do
things, like reassign values to variables or call functions.
- To return a value or a tuple which can then be assigned to one (or
more, in the case of tuples) variable.

Conditional structures, like the
[for](../../reference manual/keywords/for.md) and
[while](../../reference manual/keywords/while.md)
structures, can be embedded; you can use an
[if](../../reference manual/keywords/if.md) or
[switch](../../reference manual/keywords/switch.md)
inside another structure.

Some Pine Script built-in functions are **not** callable from within the
local blocks of conditional structures, including [barcolor()](../../reference manual/functions/barcolor.md), [bgcolor()](../../reference manual/functions/bgcolor.md), [plot()](../../reference manual/functions/plot.md), [plotshape()](../../reference manual/functions/plotshape.md), [plotchar()](../../reference manual/functions/plotchar.md), [plotarrow()](../../reference manual/functions/plotarrow.md), [plotcandle()](../../reference manual/functions/plotcandle.md), [plotbar()](../../reference manual/functions/plotbar.md), [hline()](../../reference manual/functions/hline.md), [fill()](../../reference manual/functions/fill.md), [alertcondition()](../../reference manual/functions/alertcondition.md), [indicator()](../../reference manual/functions/indicator.md), [strategy()](../../reference manual/functions/strategy.md), and [library()](../../reference manual/functions/library.md).

This restriction does not entail their functionality cannot be controlled by
conditions evaluated by your script — only that it cannot be done by
including them in conditional structures. Note that while `input*.()`
function calls are allowed in local blocks, their functionality is the
same as if they were in the script’s _global scope_.

The local blocks in conditional structures must be indented by four
spaces or a tab.

## [​`if`​ structure](../3. Language/language_conditional-structures.md#if-structure)

### [​`if`​ used for its side effects](../3. Language/language_conditional-structures.md#if-used-for-its-side-effects)

An [if](../../reference manual/keywords/if.md)
structure used for its side effects has the following syntax:

```
if <expression>

    <local_block>

{else if <expression>

    <local_block>}

[else\
\
    <local_block>]
```

where:

- Parts enclosed in square brackets (`[]`) can appear zero or one
time, and those enclosed in curly braces (`{}`) can appear zero or
more times.
- <expression> must be of “bool” type or be auto-castable to that
type, which is only possible for “int” or “float” values (see
the [Type system](../3. Language/language_type-system.md#types) page).
- <local\_block> consists of zero or more statements followed by a
return value, which can be a tuple of values. It must be indented by
four spaces or a tab.
- There can be zero or more `else if` clauses.
- There can be zero or one `else` clause.

When the <expression> following the
[if](../../reference manual/keywords/if.md)
evaluates to
[true](../../reference manual/constants/true.md),
the first local block is executed, the
[if](../../reference manual/keywords/if.md)
structure’s execution ends, and the value(s) evaluated at the end of
the local block are returned.

When the <expression> following the
[if](../../reference manual/keywords/if.md)
evaluates to
[false](../../reference manual/constants/false.md),
the successive `else if` clauses are evaluated, if there are any. When
the <expression> of one evaluates to
[true](../../reference manual/constants/true.md),
its local block is executed, the
[if](../../reference manual/keywords/if.md)
structure’s execution ends, and the value(s) evaluated at the end of
the local block are returned.

When no <expression> has evaluated to
[true](../../reference manual/constants/true.md)
and an `else` clause exists, its local block is executed, the
[if](../../reference manual/keywords/if.md)
structure’s execution ends, and the value(s) evaluated at the end of
the local block are returned.

When no <expression> has evaluated to [true](../../reference manual/constants/true.md) and no `else` clause exists, [na](../../reference manual/variables/na.md) is returned. The only exception to this is if the structure returns “bool” values — in that case, [false](../../reference manual/constants/false.md) is returned instead.

Using [if](../../reference manual/keywords/if.md)
structures for their side effects can be useful to manage the order flow
in strategies, for example. While the same functionality can often be
achieved using the `when` parameter in `strategy.*()` calls, code using
[if](../../reference manual/keywords/if.md)
structures is easier to read:

```pine
if (ta.crossover(source, lower))
    strategy.entry("BBandLE", strategy.long, stop=lower,
                   oca_name="BollingerBands",
                   oca_type=strategy.oca.cancel, comment="BBandLE")
else
    strategy.cancel(id="BBandLE")
```

Restricting the execution of your code to specific bars ican be done
using [if](../../reference manual/keywords/if.md)
structures, as we do here to restrict updates to our label to the
chart’s last bar:

```pine
//@version=6
indicator("", "", true)
var ourLabel = label.new(bar_index, na, na, color = color(na), textcolor = color.orange)
if barstate.islast
    label.set_xy(ourLabel, bar_index + 2, hl2[1])
    label.set_text(ourLabel, str.tostring(bar_index + 1, "# bars in chart"))
```

Note that:

- We initialize the `ourLabel` variable on the script’s first bar
only, as we use the
[var](../../reference manual/keywords/var.md)
declaration mode. The value used to initialize the variable is
provided by the
[label.new()](../../reference manual/functions/label.new.md)
function call, which returns a label ID pointing to the label it
creates. We use that call to set the label’s properties because
once set, they will persist until we change them.
- What happens next is that on each successive bar the Pine Script
runtime will skip the initialization of `ourLabel`, and the
[if](../../reference manual/keywords/if.md)
structure’s condition
( [barstate.islast](../../reference manual/variables/barstate.islast.md))
is evaluated. It returns `false` on all bars until the last one, so
the script does nothing on most historical bars after bar zero.
- On the last bar,
[barstate.islast](../../reference manual/variables/barstate.islast.md)
becomes true and the structure’s local block executes, modifying on
each chart update the properties of our label, which displays the
number of bars in the dataset.
- We want to display the label’s text without a background, so we
make the label’s background
[na](../../reference manual/variables/na.md)
in the
[label.new()](../../reference manual/functions/label.new.md)
function call, and we use `hl2[1]` for the label’s _y_ position
because we don’t want it to move all the time. By using the average
of the **previous** bar’s
[high](../../reference manual/variables/high.md)
and
[low](../../reference manual/variables/low.md)
values, the label doesn’t move until the moment when the next
realtime bar opens.
- We use `bar_index + 2` in our
[label.set\_xy()](../../reference manual/functions/label.set_xy.md)
call to offset the label to the right by two bars.

### [​`if`​ used to return a value](../3. Language/language_conditional-structures.md#if-used-to-return-a-value)

An [if](../../reference manual/keywords/if.md)
structure used to return one or more values has the following syntax:

```
[<declaration_mode>] [<type>] <identifier> = if <expression>

    <local_block>

{else if <expression>

    <local_block>}

[else\
\
    <local_block>]
```

where:

- Parts enclosed in square brackets (`[]`) can appear zero or one
time, and those enclosed in curly braces (`{}`) can appear zero or
more times.
- <declaration\_mode> is the variable’s
[declaration mode](../3. Language/language_variable-declarations.md#declaration-modes)
- <type> is optional, as in almost all Pine Script variable
declarations (see [types](../3. Language/language_type-system.md#types))
- <identifier> is the variable’s
[name](../3. Language/language_identifiers.md)
- <expression> can be a literal, a variable, an expression or a
function call.
- <local\_block> consists of zero or more statements followed by a
return value, which can be a tuple of values. It must be indented by
four spaces or a tab.
- The value assigned to the variable is the return value of the
<local\_block>, or
[na](../../reference manual/variables/na.md)
if no local block is executed. If other local blocks return “bool” values, [false](../../reference manual/constants/false.md) will be returned instead.

This is an example:

```pine
//@version=6
indicator("", "", true)
string barState = if barstate.islastconfirmedhistory
    "islastconfirmedhistory"
else if barstate.isnew
    "isnew"
else if barstate.isrealtime
    "isrealtime"
else
    "other"

f_print(_text) =>
    var table _t = table.new(position.middle_right, 1, 1)
    table.cell(_t, 0, 0, _text, bgcolor = color.yellow)
f_print(barState)
```

It is possible to omit the _else_ block. In this case, if the
`condition` is false, an _empty_ value (`na`, `false`, or `""`) will be
assigned to the `var_declarationX` variable.

This is an example showing how
[na](../../reference manual/variables/na.md) is
returned when no local block is executed. If `close > open` is `false`
in here,
[na](../../reference manual/variables/na.md) is
returned:

```pine
x = if close > open
    close
```

Scripts can contain `if` structures with nested `if` and other
conditional structures. For example:

```pine
if condition1
    if condition2
        if condition3
            expression
```

However, nesting these structures is not recommended from a performance
perspective. When possible, it is typically more optimal to compose a
single `if` statement with multiple logical operators rather than
several nested `if` blocks:

```pine
if condition1 and condition2 and condition3
    expression
```

## [​`switch`​ structure](../3. Language/language_conditional-structures.md#switch-structure)

The
[switch](../../reference manual/keywords/switch.md)
structure exists in two forms. One switches on the different values of a
key expression:

```
[[<declaration_mode>] [<type>] <identifier> = ]switch <expression>

    {<expression> => <local_block>}

    => <local_block>
```

The other form does not use an expression as a key; it switches on the
evaluation of different expressions:

```
[[<declaration_mode>] [<type>] <identifier> = ]switch

    {<expression> => <local_block>}

    => <local_block>
```

where:

- Parts enclosed in square brackets (`[]`) can appear zero or one
time, and those enclosed in curly braces (`{}`) can appear zero or
more times.
- <declaration\_mode> is the variable’s
[declaration mode](../3. Language/language_variable-declarations.md#declaration-modes)
- <type> is optional, as in almost all Pine Script variable
declarations (see [types](../3. Language/language_type-system.md#types))
- <identifier> is the variable’s
[name](../3. Language/language_identifiers.md)
- <expression> can be a literal, a variable, an expression or a
function call.
- <local\_block> consists of zero or more statements followed by a
return value, which can be a tuple of values. It must be indented by
four spaces or a tab.
- The value assigned to the variable is the return value of the
<local\_block>, or
[na](../../reference manual/variables/na.md)
if no local block is executed.
- The `=> <local_block>` at the end allows you to specify a return
value which acts as a default to be used when no other case in the
structure is executed.

Only one local block of a
[switch](../../reference manual/keywords/switch.md)
structure is executed. It is thus a _structured switch_ that doesn’t
_fall through_ cases. Consequently, `break` statements are unnecessary.

Both forms are allowed as the value used to initialize a variable.

As with the
[if](../../reference manual/keywords/if.md)
structure, if no local block is exectuted,
the expression returns either [false](../../reference manual/constants/false.md) (when other local blocks return a “bool” value) or [na](../../reference manual/variables/na.md) (in all other cases).

### [​`switch`​ with an expression](../3. Language/language_conditional-structures.md#switch-with-an-expression)

Let’s look at an example of a
[switch](../../reference manual/keywords/switch.md)
using an expression:

```pine
//@version=6
indicator("Switch using an expression", "", true)

string maType = input.string("EMA", "MA type", options = ["EMA", "SMA", "RMA", "WMA"])
int maLength = input.int(10, "MA length", minval = 2)

float ma = switch maType
    "EMA" => ta.ema(close, maLength)
    "SMA" => ta.sma(close, maLength)
    "RMA" => ta.rma(close, maLength)
    "WMA" => ta.wma(close, maLength)
    =>
        runtime.error("No matching MA type found.")
        float(na)

plot(ma)
```

Note that:

- The expression we are switching on is the variable `maType`, which
is of “input int” type (see here for an explanation of what the
“ [input](../3. Language/language_type-system.md#input)” qualifier is). Since it cannot change during the
execution of the script, this guarantees that whichever MA type the
user selects will be executing on each bar, which is a requirement
for functions like
[ta.ema()](../../reference manual/functions/ta.ema.md)
which require a “simple int” argument for their `length`
parameter.
- If no matching value is found for `maType`, the
[switch](../../reference manual/keywords/switch.md)
executes the last local block introduced by `=>`, which acts as a
catch-all. We generate a runtime error in that block. We also end it
with `float(na)` so the local block returns a value whose type is
compatible with that of the other local blocks in the structure, to
avoid a compilation error.

### [​`switch`​ without an expression](../3. Language/language_conditional-structures.md#switch-without-an-expression)

This is an example of a
[switch](../../reference manual/keywords/switch.md)
structure which does not use an expression:

```pine
//@version=6
strategy("Switch without an expression", "", true)

bool longCondition  = ta.crossover( ta.sma(close, 14), ta.sma(close, 28))
bool shortCondition = ta.crossunder(ta.sma(close, 14), ta.sma(close, 28))

switch
    longCondition  => strategy.entry("Long ID", strategy.long)
    shortCondition => strategy.entry("Short ID", strategy.short)
```

Note that:

- We are using the
[switch](../../reference manual/keywords/switch.md)
to select the appropriate strategy order to emit, depending on
whether the `longCondition` or `shortCondition` “bool” variables
are `true`.
- The building conditions of `longCondition` and `shortCondition` are
exclusive. While they can both be `false` simultaneously, they
cannot be `true` at the same time. The fact that only **one** local
block of the
[switch](../../reference manual/keywords/switch.md)
structure is ever executed is thus not an issue for us.
- We evaluate the calls to
[ta.crossover()](../../reference manual/functions/ta.crossover.md)
and
[ta.crossunder()](../../reference manual/functions/ta.crossunder.md) **prior** to entry in the
[switch](../../reference manual/keywords/switch.md)
structure. Not doing so, as in the following example, would prevent
the functions to be executed on each bar, which would result in a
compiler warning and erratic behavior:

[Pine Script®](https://tradingview.com/pine-script-docs)
Copied
```
//@version=6
strategy("Switch without an expression", "", true)

switch
    // Compiler warning! Will not calculate correctly!
    ta.crossover( ta.sma(close, 14), ta.sma(close, 28)) => strategy.entry("Long ID", strategy.long)
    ta.crossunder(ta.sma(close, 14), ta.sma(close, 28)) => strategy.entry("Short ID", strategy.short)
```

## [Matching local block type requirement](../3. Language/language_conditional-structures.md#matching-local-block-type-requirement)

When multiple local blocks are used in structures, the type of the
return value of all its local blocks must match. This applies only if
the structure is used to assign a value to a variable in a declaration,
because a variable can only have one type, and if the statement returns
two incompatible types in its branches, the variable type cannot be
properly determined. If the structure is not assigned anywhere, its
branches can return different values.

This code compiles fine because
[close](../../reference manual/variables/close.md)
and
[open](../../reference manual/variables/open.md)
are both of the `float` type:

```pine
x = if close > open
    close
else
    open
```

This code does not compile because the first local block returns a
`float` value, while the second one returns a `string`, and the result
of the `if`-statement is assigned to the `x` variable:

```pine
// Compilation error!
x = if close > open
    close
else
    "open"
```

[Previous 
**Operators**](../3. Language/language_operators.md) [Next 
**Loops**](../3. Language/language_loops.md)