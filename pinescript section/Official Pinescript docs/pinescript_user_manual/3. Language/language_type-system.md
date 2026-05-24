![](../3. Language/language_type-system.md)

# [Type system](../3. Language/language_type-system.md#type-system)

## [Introduction](../3. Language/language_type-system.md#introduction)

Pine Script® uses a system of _types_ and _type qualifiers_ to categorize the data in a script and indicate where and how the script can use it. This system applies to all values and references in a script, and to the variables, function parameters, and fields that store them.

[Types](../3. Language/language_type-system.md#types) in Pine Script indicate the kinds of information that a script’s data represents. Some types directly represent _values_, such as numbers, logical conditions, colors, or text, while others define _structures_ for special tasks, such as displaying [visuals](../2. Visuals/visuals_overview.md) on the chart. [Qualifiers](../3. Language/language_type-system.md#qualifiers) indicate when the values of any given type are accessible, and whether those values can change across script executions.

The combination of a type and a qualifier forms a _qualified type_, which determines the operations and functions with which a value or reference is compatible.

The type system closely connects to the [execution model](../3. Language/language_execution-model.md) and its [time series](../3. Language/language_execution-model.md#time-series) structure — together, they determine how a script behaves as it runs on a dataset. Although it’s possible to write simple scripts without understanding these foundational topics, learning about them and their nuances is key to mastering Pine Script.

## [Qualifiers](../3. Language/language_type-system.md#qualifiers)

Pine’s type qualifiers ( [const](../3. Language/language_type-system.md#const), [input](../3. Language/language_type-system.md#input), [simple](../3. Language/language_type-system.md#simple), and [series](../3. Language/language_type-system.md#series)) indicate _when_ values in a script are accessible — either at compile time, input time, or runtime — and whether those values can change across script executions:

`"const"`

Established at _compile time_, when the user saves the script in the Pine Editor or applies the script to a dataset. Values qualified as “const” remain _constant_ during every script execution.

`"input"`

Established at _input time_, when the system confirms input data from the script’s “Settings/Inputs” tab or the chart. Similar to “const” values, “input” values _do not change_ as the script runs on the dataset.

`"simple"`

Established by the script at runtime, on the _first_ available bar. On all subsequent bars, values qualified as “simple” do not change.

`"series"`

_Dynamic_. Values qualified as “series” are available at runtime, and they are the **only** values that can change across bars.

Pine Script uses the following _qualifier hierarchy_ to determine the compatibility of values in a script’s calculations:

```
const < input < simple < series
```

In this hierarchy, “const” is the _lowest_ ( _weakest_) qualifier, and “series” is the _highest_ ( _strongest_). Any variable, parameter, or operation that accepts a value with a specific qualifier also allows a value of the same type with a _weaker_ qualifier, but **not** one that is stronger.

For instance, a function parameter that accepts a value of the “simple int” qualified type also allows a value of the “input int” or “const int” type, because “const” and “input” are _lower_ than “simple” in the qualifier hierarchy. However, the parameter _cannot_ accept a “series int” value, because “series” is higher in the hierarchy than “simple”.

Pine also uses this hierarchy to determine the qualifiers assigned to the results of expressions, i.e., function calls and operations. The returned types of an expression always inherit the _strongest_ qualifier in the calculation. For example, an expression that performs a calculation using “input” and “simple” values returns “simple” results, because “simple” is a _stronger_ qualifier than “input”.

Note that a script **cannot** change the qualifier of a returned value to one that is lower in the hierarchy to make it compatible with specific operations or functions. For instance, if a calculation returns a value qualified as “series”, the script cannot modify that value’s qualifier later to enable using it in code that requires “simple” or “const” values.

The following sections explain the behavior of each type qualifier, as well as the built-in keywords that programmers can use to specify qualifiers in their code.

### [const](../3. Language/language_type-system.md#const)

Values qualified as “const” are available at _compile time_, before the script starts its first execution. Compilation occurs when the user saves the script in the Pine Editor, and immediately before a script starts to run on the chart or in another location. Values with the “const” qualifier remain constant after compilation; they do not change during any script execution. All _literal values_ and the results of expressions that use only values qualified as “const” automatically inherit the “const” qualifier.

The following list shows a few values of each [fundamental type](../3. Language/language_type-system.md#types). All of these represent literal values if a script includes them directly in its source code:

- _literal int_: `1`, `-1`, `42`
- _literal float_: `1.`, `1.0`, `3.14`, `6.02E-23`, `3e8`
- _literal bool_: `true`, `false`
- _literal color_: `#FF55C6`, `#FF55C6ff`
- _literal string_: `"A text literal"`, `"Embedded single quotes 'text'"`, `'Embedded double quotes "text"'`

Scripts can [declare variables](../3. Language/language_variable-declarations.md) that hold “const” values, and use those variables to calculate other constants. In the example below, we use “const” variables to set the title of a script and its plots. The script compiles successfully, because the [indicator()](../../reference manual/functions/indicator.md) and [plot()](../../reference manual/functions/plot.md) calls used in the code both require a `title` argument of the _“const string”_ qualified type:

```pine
//@version=6

// All of the following global variables automatically inherit the "const" qualifier,
// because their "string" values are constants that are available at *compile time*.

//@variable The indicator's title.
INDICATOR_TITLE = "const demo"
//@variable The title of the first plot.
var PLOT1_TITLE = "High"
//@variable The title of the second plot.
PLOT2_TITLE = "Low"
//@variable The title of the third plot.
PLOT3_TITLE = "Midpoint between " + PLOT1_TITLE + " and " + PLOT2_TITLE

// Set the title of the indicator using `INDICATOR_TITLE`.
indicator(title = INDICATOR_TITLE, overlay = true)

// Set the title of each plot using the `PLOT*_TITLE` variables.
plot(high, PLOT1_TITLE)
plot(low, PLOT2_TITLE)
plot(hl2, PLOT3_TITLE)
```

Note that:

- All the variables above the [indicator()](../../reference manual/functions/indicator.md) call in this script have the “const” qualifier, because they hold a literal value or the result of [operations](../3. Language/language_operators.md) that use only “const” values.
- All our “const” variables in this example have names in _uppercase snake case_ so that they are easy to distinguish in the code, as recommended by our [Style guide](../4. Writing_Scripts/writing_style-guide.md).
- Although the “const” variables in this script hold constant values, the script initializes them on _every bar_. The only exception is `PLOT1_TITLE`, which the script initializes only on the _first_ bar, because its declaration includes the [var](../../reference manual/keywords/var.md) keyword. See the [Declaration modes](../3. Language/language_variable-declarations.md#declaration-modes) section of the [Variable declarations](../3. Language/language_variable-declarations.md) page to learn more.

Any variable or function parameter that requires a “const” value _cannot_ accept a value with the “input”, “simple”, or “series” qualifier, because “const” is the _lowest_ qualifier in the [qualifier hierarchy](../3. Language/language_type-system.md#qualifiers).

For example, the following script combines a literal string with the value of [syminfo.ticker](../../reference manual/variables/syminfo.ticker.md) to set the value of a `scriptTitle` variable. Then, it attempts to use the variable as the `title` argument of the [indicator()](../../reference manual/functions/indicator.md) declaration statement, causing a _compilation error_. The `title` parameter requires a “const string” argument, but `scriptTitle` holds a value of the type _“simple string”_:

```pine
//@version=6

//@variable Holds a value intended for use as the `title` argument in the `indicator()` call.
//          However, this variable's type is "simple string", not "const string", because
//          the value of `syminfo.ticker` is not available until *after* compilation.
var scriptTitle = "My indicator for " + syminfo.ticker

// This statement causes an error. The `indicator()` statement cannot use a "simple string"
// value as its `title` argument. It requires a "const string" value.
indicator(title = scriptTitle)

plot(close - open)
```

Note that:

- The [syminfo.ticker](../../reference manual/variables/syminfo.ticker.md) variable holds a “simple string” value because it depends on data that is available only at _runtime_. Combining this value with a literal string produces another “simple string” value, because “simple” is a stronger qualifier than “const”.
- We did not name the `scriptTitle` variable using snake case, because our [Style guide](../4. Writing_Scripts/writing_style-guide.md) recommends using _lower camel case_ to name variables that do not hold “const” values.

Programmers can restrict the behavior of a variable and force _constant assignments_ on each execution by prefixing its declaration with the [const](../../reference manual/types/const.md) keyword, followed by a [type keyword](../3. Language/language_type-system.md#types) or type identifier. If a variable includes [const](../../reference manual/types/const.md) in its declaration, the script cannot _change_ its value with the reassignment or compound assignment [operators](../3. Language/language_operators.md). This restriction applies even if the new assigned value is still a constant.

For example, the script below declares a `myVar` variable using the [const](../../reference manual/types/const.md) keyword. Then, it attempts to change the variable’s value with the [+=](../../reference manual/operators/+=.md) operator, causing a compilation error:

```pine
//@version=6
indicator("Cannot reassign `const` variable demo")

//@variable A "float" variable declared using the `const` keyword.
const float myVar = 0.0

// Using the `+=` operator on `myVar` causes an error, because scripts *cannot* modify variables declared using `const`.
myVar += 1.0

plot(myVar)
```

For a variable of any [value type](../3. Language/language_type-system.md#value-types), applying the [const](../../reference manual/types/const.md) keyword to the declaration prevents the script from assigning a value qualified as “input”, “simple”, or “series”. Likewise, if a [user-defined function](../3. Language/language_user-defined-functions.md) parameter of these types includes the keyword in its declaration, it accepts only “const” values.

The following script attempts to use the value of the [close](../../reference manual/variables/close.md) variable as the initial value of a `myVar` variable declared using the [const](../../reference manual/types/const.md) keyword. However, [close](../../reference manual/variables/close.md) is _not compatible_ with the variable, so a compilation error occurs. The value of [close](../../reference manual/variables/close.md) is of the type _“series float”_, because it updates from bar to bar, but the `myVar` variable requires a “const float” value:

```pine
//@version=6
indicator("Cannot assign values with stronger qualifiers demo")

// This declaration causes an error. The value of `close` is of the type "series float",
// but `myVar` accepts only a "const float" value.
const float myVar = close

plot(myVar)
```

Note that:

- If we remove the [const](../../reference manual/types/const.md) keyword from the variable declaration, the `myVar` variable automatically inherits the “series” qualifier, and no error occurs.

### [input](../3. Language/language_type-system.md#input)

Values qualified as “input” are established at _input time_. They are similar to “const” values, because they are available before the first script execution and never change during runtime. However, unlike “const” values, “input” values depend on user input.

All function parameters that have the “input” qualifier can accept only “input” or “const” values; they do not allow values qualified as “simple” or “series”.

Most of the built-in `input.*()` functions return values qualified as “input”. These functions create adjustable [inputs](../1. Concepts/concepts_inputs.md) in the script’s “Settings/Inputs” tab, enabling users to change specific values in a script without altering its source code. Each time the user changes the value of an input, the script _reloads_ across all bars on the chart — from the first available bar to the most recent bar — to update its results using the specified value, as explained in the [Execution model](../3. Language/language_execution-model.md) page.

The following script requests the value of an [RSI](https://www.tradingview.com/support/solutions/43000502338-relative-strength-index-rsi/) calculated on the dataset for a specific symbol and timeframe, and then plots the result on the chart as columns. The script includes two [string inputs](../1. Concepts/concepts_inputs.md#string-input) that specify the context of the request, and it uses a [float input](../1. Concepts/concepts_inputs.md#float-input) value to set the base of the plotted columns. If the user changes any of these inputs in the “Settings/Inputs” tab, the script reloads to update its results for every bar:

```pine
//@version=6
indicator("'input' values demo")

//@variable An "input string" value representing the requested symbol.
symbolInput = input.string("AAPL", "Symbol")
//@variable An "input string" value representing the timeframe of the requested data.
timeframeInput = input.string("1D", "Timeframe")
//@variable An "input float" value for specifying the base of the plotted columns.
colBaseInput = input.float(50.0, "Column base", 0.0, 100.0)

//@variable The value of an RSI calculated on the `symbolInput` symbol and `timeframeInput` timeframe.
//          The `request.security()` function's `symbol` and `timeframe` parameters accept "series string" values,
//          so they also allow weaker qualified types such as "input string".
requestedRSI = request.security(symbol = symbolInput, timeframe = timeframeInput, expression = ta.rsi(close, 14))

// Plot the `requestedRSI` value as columns with the base defined by `colBaseInput`.
// This call works, because `histbase` requires an "int" or "float" value with the "const" or "input" qualifier.
plot(requestedRSI, "RSI", color.purple, 1, plot.style_columns, histbase = colBaseInput)
```

Note that:

- The [plot()](../../reference manual/functions/plot.md) function’s `histbase` parameter, which sets the base of the plotted columns, has the expected type “input int” or “input float”. As such, it cannot accept “simple int/float” or “series int/float” values, because “simple” and “series” are stronger qualifiers than “input”.
- The [request.security()](../../reference manual/functions/request.security.md) function requests data from a specified dataset. Its `symbol` and `timeframe` parameters, which define the context of the request, accept “series string” values by default. Therefore, these parameters also accept “input string” values. See the [Other timeframes and data](../1. Concepts/concepts_other-timeframes-and-data.md) page to learn more about `request.*()` functions.

Some built-in `chart.*` variables also hold “input” values, because these variables update at input time based on changes to the _chart_. Scripts that use these variables reload, executing across the entire dataset again, if any chart changes affect their values.

The example below uses some of these variables to display a gradient background color that incrementally changes over the chart’s visible bars. It uses [chart.left\_visible\_bar\_time](../../reference manual/variables/chart.left_visible_bar_time.md) and [chart.right\_visible\_bar\_time](../../reference manual/variables/chart.right_visible_bar_time.md) to get the timestamps of the leftmost and rightmost visible bars for its calculation, and it uses [chart.bg\_color](../../reference manual/variables/chart.bg_color.md) and [chart.fg\_color](../../reference manual/variables/chart.fg_color.md) to define the start and end colors of the gradient. If the user scrolls or zooms on the chart, or changes the chart’s background color, the script reloads to generate new results:

```pine
//@version=6
indicator("Built-in 'input' variables demo")

//@variable The difference between `time` and the leftmost visible bar's time, relative to the visible range.
//          The `chart.*` variables in this calculation depend on input data from the visible chart, so their type is
//          "input int".
gradientValue = (time - chart.left_visible_bar_time) / (chart.right_visible_bar_time - chart.left_visible_bar_time)

//@variable The gradient color. The `chart.*` variables in this calculation are of the type "input color", because
//          they depend on the "Background" inputs in the "Canvas" tab of the chart's settings.
gradientColor = color.from_gradient(gradientValue, 0, 1, chart.bg_color, chart.fg_color)

// Color the background using the `gradientColor` value.
bgcolor(gradientColor)
```

### [simple](../3. Language/language_type-system.md#simple)

Values qualified as “simple” are established at runtime, while the script executes on the _first_ available bar. Similar to values qualified as “input” or “const”, “simple” values _do not change_ across bars.

All variables and function parameters that have the “simple” qualifier can accept only “simple”, “input”, or “const” values; they do not allow values qualified as “series”.

Many [built-in variables](../3. Language/language_built-ins.md#built-in-variables), such as most `syminfo.*` and `timeframe.*` variables, hold “simple” values instead of “const” or “input” because they depend on information that a script can obtain only _after_ it starts running on a dataset. Likewise, various [built-in function](../3. Language/language_built-ins.md#built-in-functions) parameters require values with the “simple” qualifier or a weaker one.

The following script uses [request.security()](../../reference manual/functions/request.security.md) with a `calc_bars_count` argument to retrieve a limited history of daily [close](../../reference manual/variables/close.md) values. It determines the number of historical days in the request based on the “simple string” value of [syminfo.type](../../reference manual/variables/syminfo.type.md). For cryptocurrency symbols, the call requests 14 days of historical data. For other symbols, it requests 10 days of data. The script compiles successfully because the `reqDays` variable holds the type “simple int”, which matches the expected type for the `calc_bars_count` parameter:

```pine
//@version=6
indicator("'simple' values demo")

//@variable The number of historical days in the data request. This variable's type is "simple int",
//          because the strongest qualified type in the calculation is "simple string".
reqDays = syminfo.type == "crypto" ? 14 : 10

//@variable The `close` value from the "1D" timeframe.
//          This call works because `calc_bars_count` expects a "simple int" argument.
requestedClose = request.security(syminfo.tickerid, "1D", close, calc_bars_count = reqDays)

plot(requestedClose)
```

Programmers can explicitly define variables and parameters that require “simple” values, or values with a weaker qualifier, by prefixing their declaration with the [simple](../../reference manual/types/simple.md) keyword, followed by a [type keyword](../3. Language/language_type-system.md#types). Variables declared with this keyword can hold runtime-calculated values that do not change across bars. These variables cannot accept values qualified as “series”, even if those values remain consistent on every bar.

The script below attempts to assign the result of a [math.random()](../../reference manual/functions/math.random.md) call to a `rand` variable declared with the [simple](../../reference manual/types/simple.md) keyword, causing a compilation error. The [math.random()](../../reference manual/functions/math.random.md) function returns a _different value_ on each call, meaning its return type is “series float”. However, the [simple](../../reference manual/types/simple.md) keyword forces the `rand` variable to require a “simple float”, “input float”, or “const float” value:

```pine
//@version=6
indicator("Cannot assign a 'series' value demo")

// This declaration causes an error. `math.random()` returns a "series float" value, but the `rand` variable
// requires a "float" value with the "simple" qualifier or a weaker one.
simple float rand = math.random()

plot(rand)
```

### [series](../3. Language/language_type-system.md#series)

Values qualified as “series” provide the most flexibility in a script’s calculations. These values are available at runtime, and they are the **only** values that can _change_ from bar to bar.

All variables and function parameters that accept a “series” value also allow values with any other qualifier, because “series” is the _highest_ qualifier in the [qualifier hierarchy](../3. Language/language_type-system.md#qualifiers).

All built-in variables that store bar information — such as [open](../../reference manual/variables/open.md), [high](../../reference manual/variables/high.md), [low](../../reference manual/variables/low.md), [close](../../reference manual/variables/close.md), [volume](../../reference manual/variables/volume.md), [time](../../reference manual/variables/time.md), [bar\_index](../../reference manual/variables/bar_index.md), and [barstate.isconfirmed](../../reference manual/variables/barstate.isconfirmed.md) — always hold “series” values. The same applies to variables that store data from internal calculations that update from bar to bar, such as [ta.vwap](../../reference manual/variables/ta.vwap.md) and [ta.pvi](../../reference manual/variables/ta.pvi.md).

If an expression’s result _can vary_ on any execution, it automatically inherits the “series” qualifier. Similarly, even if an expression returns an unchanging result on every bar, that result is still qualified as “series” if the calculation depends on at least one “series” value.

The following script calculates highest and lowest values from a `sourceInput` series and a “const float” value over `lengthInput` bars. The `highest` and `lowest` variables automatically inherit the “series” qualifier because the [ta.highest()](../../reference manual/functions/ta.highest.md) and [ta.lowest()](../../reference manual/functions/ta.lowest.md) functions always return “series” results. These functions never return a value with a weaker qualifier, even if they calculate on a constant, because their `source` parameter is of the type “series float”:

```pine
//@version=6
indicator("'series' values demo", overlay = true)

//@variable The source series to process in the `ta.highest()` call.
//          This variable's type is "series float", because `input.source()` returns "series" values.
sourceInput = input.source(close, "Source")
//@variable The number of bars to analyze. This variable's type is "input int".
lengthInput = input.int(20, "Length")

//@variable The highest `sourceInput` value over `lengthInput` bars. This variable's type is "series float".
highest = ta.highest(source = sourceInput, length = lengthInput)
//@variable The result of calculating the lowest value from a constant. This variable's type is also "series float".
//          The `source` parameter's type is "series float", so the function returns a "series float" value, regardless
//          of the argument's type qualifier.
lowest = ta.lowest(source = 100.0, length = lengthInput)

plot(highest, "Highest", color.green)
plot(lowest,  "Lowest",  color.red)
```

Programmers can use the [series](../../reference manual/types/series.md) keyword to explicitly define variables and parameters that accept “series” values. A script cannot use a variable declared using this keyword in any part of the code that requires “simple” or weaker qualifiers, even if the variable’s assigned value never changes.

For example, the script below declares a `lengthInput` variable with the [series](../../reference manual/types/series.md) keyword. Then, it attempts to use the variable as the `length` argument of a [ta.ema()](../../reference manual/functions/ta.ema.md) function call, causing a compilation error. Although the variable’s value comes from an [integer input](../1. Concepts/concepts_inputs.md#integer-input), the [series](../../reference manual/types/series.md) keyword causes its type to become “series int” instead of “input int”. This type is not compatible with the [ta.ema()](../../reference manual/functions/ta.ema.md) function’s `length` parameter, because the strongest qualified type that the parameter accepts is “simple int”:

```pine
//@version=6
indicator("`series` keyword demo", overlay = true)

//@variable Holds a value intended for use as the `length` argument in `ta.ema()`.
//          Although the variable's value is from an input, its type is "series int" because the declaration uses the
//          `series` keyword.
series int lengthInput = input.int(20, "Length")

// This function call causes an error. The `length` parameter requires a "simple int", "input int", or "const int"
// argument; it cannot accept a "series int" value.
ema = ta.ema(close, length = lengthInput)

plot(ema)
```

## [Types](../3. Language/language_type-system.md#types)

Types define the _categories_ of values in a script and determine the kinds of functions and operations with which those values are compatible. Each type represents a different kind of data. The primary types available in Pine Script consist of the following:

- Fundamental types: [int](../3. Language/language_type-system.md#int), [float](../3. Language/language_type-system.md#float), [bool](../3. Language/language_type-system.md#bool), [color](../3. Language/language_type-system.md#color), and [string](../3. Language/language_type-system.md#string)
- [Enum types (enums)](../3. Language/language_type-system.md#enum-types)
- Special types: [plot](../3. Language/language_type-system.md#plot-and-hline), [hline](../3. Language/language_type-system.md#plot-and-hline), [line](../3. Language/language_type-system.md#drawing-types), [linefill](../3. Language/language_type-system.md#drawing-types), [box](../3. Language/language_type-system.md#drawing-types), [polyline](../3. Language/language_type-system.md#drawing-types), [label](../3. Language/language_type-system.md#drawing-types), [table](../3. Language/language_type-system.md#drawing-types), [chart.point](../3. Language/language_type-system.md#chart-points), [footprint](../3. Language/language_type-system.md#footprint-and-volume_row), [volume\_row](../3. Language/language_type-system.md#footprint-and-volume_row), [array](../3. Language/language_type-system.md#collections), [matrix](../3. Language/language_type-system.md#collections), and [map](../3. Language/language_type-system.md#collections)
- [User-defined types (UDTs)](../3. Language/language_type-system.md#user-defined-types)
- [void](../3. Language/language_type-system.md#void)

Fundamental types and enum types are also known as [value types](../3. Language/language_type-system.md#value-types). Variables of these types directly hold values. Additionally, value types can inherit any [type qualifier](../3. Language/language_type-system.md#qualifiers), depending on their use in the code. By contrast, special types and UDTs are [reference types](../3. Language/language_type-system.md#reference-types). Variables of these types do not store direct values; they hold _references_ (sometimes referred to as _IDs_) that provide access to data stored _elsewhere_ in memory. Instances of these types always inherit the “series” qualifier, regardless of how the script uses them.

Programmers can explicitly define the type of a variable, function parameter, or field by prefixing its declaration with a _type keyword_ (e.g., [int](../../reference manual/types/int.md)) or a _type identifier_ (e.g., `array<int>`). Specifying types in code is usually optional, because the compiler can automatically determine type information in most cases. However, type specification is _required_ when:

- Declaring [variables](../3. Language/language_variable-declarations.md), [user-defined function](../3. Language/language_user-defined-functions.md) parameters, or [UDT](../3. Language/language_type-system.md#user-defined-types) fields with initial [`na` values](../3. Language/language_type-system.md#na-value).
- Defining the parameters of exported [library functions](../1. Concepts/concepts_libraries.md#library-functions), or declaring exported constants.
- Using [qualifier keywords](../3. Language/language_type-system.md#qualifiers) in a variable or parameter declaration.
- Declaring the first parameter of a [user-defined method](../3. Language/language_methods.md#user-defined-methods).

The example below calculates a moving average and detects when the [close](../../reference manual/variables/close.md) series crosses over the value. The script uses values of different fundamental types in its calculations. It includes the [int](../../reference manual/types/int.md), [float](../../reference manual/types/float.md), [bool](../../reference manual/types/bool.md), [color](../../reference manual/types/color.md), and [string](../../reference manual/types/string.md) keywords in its variable declarations to specify which type each variable accepts:

```pine
//@version=6
indicator("Type keywords demo", overlay = true)

// The `string`, `int`, `float`, `bool` and `color` keywords are *optional* in the following variable declarations:
string MA_TITLE    = "MA"
int    lengthInput = input.int(100, "Length", minval = 2)
float  ma          = ta.sma(close, lengthInput)
bool   crossUp     = ta.crossover(close, ma)
color  maColor     = close > ma ? color.lime : color.fuchsia

// Specifying a type is required in this declaration, because the variable's initial value is `na`.
// The `float` keyword tells the compiler that the variable accepts "float" values.
var float crossValue = na

// Update the `crossValue` variable based on the `crossUp` condition.
if crossUp
    crossValue := close

plot(ma, MA_TITLE, maColor)
plot(crossValue, "Cross value", style = plot.style_circles)
plotchar(crossUp, "Cross Up", "▲", location.belowbar, size = size.small)
```

Note that:

- The first five variables in this script _do not_ require type keywords in their declarations, but including them helps promote readability. However, the `crossValue` variable _does_ require a specified type in its declaration because its initial value is [na](../../reference manual/variables/na.md).

The sections below explain the different types available in Pine Script and how they work.

### [Value types](../3. Language/language_type-system.md#value-types)

The types covered in the following sections are _value types_. These types directly represent values, such as numbers, logical conditions, colors, or text sequences. Value types are compatible with any [type qualifier](../3. Language/language_type-system.md#qualifiers), depending on their use in the code. Additionally, value types, unlike reference types, are compatible with arithmetic and logical [operators](../3. Language/language_operators.md).

#### [int](../3. Language/language_type-system.md#int)

Values of the “int” type represent _integers_: whole numbers _without_ fractional parts.

Literal integers in a script are sequences of decimal digits without a decimal point (`.`). These literals can also include the _unary_ [+](../../reference manual/operators/+.md) or [-](../../reference manual/operators/-.md) operators at the beginning of the sequence to specify their sign (positive or negative).

Below are a few examples of literal integers:

```pine
1
-1
750
```

Many built-in variables hold “int” values, including [bar\_index](../../reference manual/variables/bar_index.md), [time](../../reference manual/variables/time.md), [timenow](../../reference manual/variables/timenow.md), [dayofmonth](../../reference manual/variables/dayofmonth.md), and [strategy.wintrades](../../reference manual/variables/strategy.wintrades.md).

#### [float](../3. Language/language_type-system.md#float)

Values of the “float” type represent _floating-point_ numbers. In contrast to “int” values, “float” values represent the whole _and_ fractional parts of a number.

Literal floating-point values in Pine have two different formats:

- A sequence of decimal digits that contains a decimal point (`.`) to separate the number’s whole and fractional parts. This format can include a unary [+](../../reference manual/operators/+.md) or [-](../../reference manual/operators/-.md) operator at the beginning to specify the number’s sign.
- A number, with an _optional_ decimal point, followed by `e` or `E` and an additional _whole number_. The number before _and_ after `e` or `E` can include the unary [+](../../reference manual/operators/+.md) or [-](../../reference manual/operators/-.md) operator. This format represents a floating-point number in [E notation](https://en.wikipedia.org/wiki/Scientific_notation#E_notation). It translates to _“X multiplied by 10 raised to the power of Y”_, where “X” is the number before `e` or `E`, and “Y” is the number that follows. This format provides a compact way to represent very large or very small values.

Below are a few examples of floating-point literals:

```pine
3.14159    // Rounded value of Pi (π)
-3.0
6.02e23    // 6.02 * 10^23 (a very large number)
1.6e-19    // 1.6 * 10^-19 (a very small number)
```

The internal precision of “float” values in Pine Script is 1e-16. Floating-point values in Pine cannot precisely represent numbers with more than 16 fractional digits. However, note that [comparison operators](../3. Language/language_operators.md#comparison-operators) automatically round “float” operands to _nine_ fractional digits.

Many built-in variables store “float” values, including [close](../../reference manual/variables/close.md), [hlcc4](../../reference manual/variables/hlcc4.md), [volume](../../reference manual/variables/volume.md), [ta.vwap](../../reference manual/variables/ta.vwap.md), and [strategy.position\_size](../../reference manual/variables/strategy.position_size.md).

#### [bool](../3. Language/language_type-system.md#bool)

Values of the “bool” type represent the [Boolean](https://en.wikipedia.org/wiki/Boolean_data_type) truth values of conditions ( _true_ or _false_). Scripts use these values in [conditional structures](../3. Language/language_conditional-structures.md) and expressions to trigger specific calculations in the code. All _comparison_ and _logical_ [operators](../3. Language/language_operators.md) return “bool” values.

There are only two possible “bool” literals in Pine Script:

```pine
true    // true value
false   // false value
```

In contrast to most other types, values of the “bool” type are _never_ [na](../../reference manual/variables/na.md). Any expression or structure with the “bool” return type returns `false` instead of [na](../../reference manual/variables/na.md) if data is _not available_.

For example, if a script uses the [history-referencing operator](../3. Language/language_operators.md#-history-referencing-operator) to retrieve the value of a “bool” variable from a previous bar that does not exist, that operation returns `false`. Likewise, an [if](../../reference manual/keywords/if.md) statement with a return expression of the “bool” type returns `false` if none of its _local blocks_ activate. By contrast, expressions and structures with other return types, excluding [void](../3. Language/language_type-system.md#void), return [na](../../reference manual/variables/na.md) if there is no available data.

All built-in variables that represent conditions store “bool” values, including [barstate.isfirst](../../reference manual/variables/barstate.isfirst.md), [chart.is\_heikinashi](../../reference manual/variables/chart.is_heikinashi.md), [session.ismarket](../../reference manual/variables/session.ismarket.md), and [timeframe.isdaily](../../reference manual/variables/timeframe.isdaily.md).

#### [color](../3. Language/language_type-system.md#color)

Values of the “color” type represent _RGB colors_, which scripts use to define the colors of chart [visuals](../2. Visuals/visuals_overview.md). Color literals in Pine have the format `#RRGGBB` or `#RRGGBBAA`, where:

- Each symbol after the number sign (`#`) represents a [hexadecimal digit](https://en.wikipedia.org/wiki/Hexadecimal), which is a _numeral_ from `0` to `9` or a _letter_ from `A` (for 10) to `F` (for 15). Each set of _two digits_ represents one of the color’s _component values_, ranging from 0 (`00`) to 255 (`FF`).
- The `RR`, `GG`, and `BB` parts represent the color’s _red_, _green_, and _blue_ components, respectively. The last pair of digits, `AA`, is optional; it specifies the color’s opacity ( _alpha_). If the pair is `00`, the color is _transparent_. If `FF` or not specified, the color is _fully opaque_.
- All letters in the literal value can be uppercase or lowercase.

Below are several examples of literal “color” values:

```pine
#000000      // Black
#FF0000      // Red
#00FF00      // Green
#0000FF      // Blue
#FFFFFF      // White
#808080      // A shade of gray
#3ff7a0      // A custom green-cyan color
#FF000080    // 50% transparent red
#FF0000ff    // Equivalent to #FF0000; fully opaque red
#FF000000    // Completely transparent (invisible) red
```

Pine Script also includes several built-in [color constants](../2. Visuals/visuals_colors.md#constant-colors), such as [color.green](../../reference manual/constants/color.green.md), [color.orange](../../reference manual/constants/color.orange.md), [color.red](../../reference manual/constants/color.red.md), and [color.blue](../../reference manual/constants/color.blue.md). Note that [color.blue](../../reference manual/constants/color.blue.md) is the default color for [plots](../2. Visuals/visuals_plots.md), and it is the default value for several _color properties_ of [drawing types](../3. Language/language_type-system.md#drawing-types).

The `color` namespace contains functions for retrieving color components, modifying colors, and creating new colors. For instance, scripts can use [color.new()](../../reference manual/functions/color.new.md) to define a copy of a built-in color with different transparency, or use [color.rgb()](../../reference manual/functions/color.rgb.md) to create a new color with specific red, green, blue, and transparency components.

Note that the `red`, `green`, and `blue` parameters of the [color.rgb()](../../reference manual/functions/color.rgb.md) function expect a number from _0 to 255_, where 0 means no intensity and 255 means maximum intensity. The `transp` parameter of [color.rgb()](../../reference manual/functions/color.rgb.md) and [color.new()](../../reference manual/functions/color.new.md) expects a value from _0 to 100_, where 0 means fully opaque and 100 means completely transparent. Both functions automatically _clamp_ arguments to these ranges, and they round the specified values to _whole numbers_.

The example below creates a new “color” value with [color.rgb()](../../reference manual/functions/color.rgb.md), modifies the color’s transparency based on the current day of the week with [color.new()](../../reference manual/functions/color.new.md), and then displays the resulting color in the chart’s background:

```pine
//@version=6
indicator("`color.*()` functions demo")

//@variable A color with custom red, green, and blue components. The variable's type is "const color".
color BASE_COLOR = color.rgb(0, 99, 165)

//@variable A calculated transparency value based on the current day of the week. This variable's type is "series int".
int transparency = 50 + int(40 * dayofweek / 7)

//@variable A modified copy of `BASE_COLOR` with dynamic transparency.
//          This variable's type is "series color", because its calculation depends on a "series int" value.
color modifiedColor = color.new(BASE_COLOR, transparency)

// Color the background using the `modifiedColor` value.
bgcolor(modifiedColor)
```

Note that:

- The value stored by `BASE_COLOR` is of the type “const color” because it depends on only “const” values. However, the modified color returned by [color.new()](../../reference manual/functions/color.new.md) is of the type “series color”, because the [dayofweek](../../reference manual/variables/dayofweek.md) variable used in the calculation has the “series” [qualifier](../3. Language/language_type-system.md#qualifiers).

To learn more about working with colors in Pine, see the [Colors](../2. Visuals/visuals_colors.md) page.

#### [string](../3. Language/language_type-system.md#string)

Values of the “string” type contain sequences of encoded characters representing text, including letters, digits, symbols, spaces, or other Unicode characters. Scripts use strings in many ways, such as to define titles, express symbols and timeframes, create alerts and debug messages, and display text on the chart.

Literal strings in Pine Script are sequences of characters enclosed by two ASCII quotation marks (`"`) or apostrophes (`'`). For example:

```pine
"This is a literal string enclosed in quotation marks."

'This is a literal string enclosed in apostrophes.'
```

Quotation marks and apostrophes are functionally similar when used as the enclosing delimiters of literal strings. A string enclosed in quotation marks can contain any number of apostrophes. Likewise, a string enclosed in apostrophes can contain any number of quotation marks. For example:

```pine
"It's an example"

'The "Star" indicator'
```

A literal string can prefix some characters with the backslash character (`\`) to _change_ their meaning. For example, applying a backslash to a quotation mark or apostrophe adds that character directly into a literal string’s sequence instead of treating the character as the _end_ of the string:

```pine
'It\'s an example'

"The \"Star\" indicator"
```

Applying a backslash to the `n` or `t` characters in a literal string creates _escape sequences_ for multiline text or indentation respectively, which scripts can render using `plot*()` functions, [Pine Logs](../4. Writing_Scripts/writing_debugging.md#pine-logs), or some [drawing types](../3. Language/language_type-system.md#drawing-types). For example, this string represents multiline text with a single word per line:

```pine
"This\nString\nContains\nOne\nWord\nPer\nLine"
```

Scripts can use two operators, [+](../../reference manual/operators/+.md) and [+=](../../reference manual/operators/+=.md), to _concatenate_ (combine) two separate strings. These operators create a new string containing the first operand’s character sequence followed by the second operand’s sequence. For example:

```pine
"This creates a " + "concatenated string."
```

The `str` namespace contains several built-in functions that perform string-based calculations or create new strings. For example, the script below calls [str.format()](../../reference manual/functions/str.format.md) on each bar to create a _formatted string_ containing representations of “float” price values, and it displays the result as multiline text in a label positioned at the bar’s [high](../../reference manual/variables/high.md) value:

```pine
//@version=6
indicator("Formatted string demo", overlay = true)

//@variable A "series string" value containing representations of the bar's OHLC prices.
string ohlcString = str.format("Open: {0}\nHigh: {1}\nLow: {2}\nClose: {3}", open, high, low, close)

// Draw a label to display the `ohlcString` value as multiline text at the bar's `high` value.
label.new(bar_index, high, ohlcString, textcolor = color.white)
```

Several built-in variables that contain symbol and timeframe information store “string” values, e.g., [syminfo.tickerid](../../reference manual/variables/syminfo.tickerid.md), [syminfo.currency](../../reference manual/variables/syminfo.currency.md), and [timeframe.period](../../reference manual/variables/timeframe.period.md).

For detailed information about Pine strings and the built-in `str.*()` functions, refer to the [Strings](../1. Concepts/concepts_strings.md) page. To learn more about displaying text from strings, see the [Text and shapes](../2. Visuals/visuals_text-and-shapes.md) and [Debugging](../4. Writing_Scripts/writing_debugging.md) pages.

#### [Enum types](../3. Language/language_type-system.md#enum-types)

The [enum](../../reference manual/keywords/enum.md) keyword enables the creation of an _enum_, otherwise known as an _enumeration_, _enumerated type_, or _enum type_. An enum is a unique type that contains distinct _named fields_. These fields represent the _members_ (i.e., possible values) of the enum type. Programmers can use enums to maintain strict control over the values accepted by variables, parameters, conditional expressions, [collections](../3. Language/language_type-system.md#collections), and the fields of [UDT](../3. Language/language_type-system.md#user-defined-types) objects. Additionally, scripts can use the [input.enum()](../../reference manual/functions/input.enum.md) function to create enum-based dropdown [inputs](../1. Concepts/concepts_inputs.md) in the “Settings/Inputs” tab.

The syntax to declare an enum is as follows:

```
[export ]enum <enumName>

    <field_1>[ = <title_1>]

    <field_2>[ = <title_2>]

    ...

    <field_N>[ = <title_N>]
```

Where:

- [export](../../reference manual/keywords/export.md) is the optional keyword for exporting the enum from a library, enabling its use in other scripts. See the [Enum types](../1. Concepts/concepts_libraries.md#enum-types) section of the [Libraries](../1. Concepts/concepts_libraries.md) page to learn more about exporting enums.
- `enumName` is the name of the enum type. Scripts can use the enum’s name as the _type keyword_ in [variable declarations](../3. Language/language_variable-declarations.md), parameter and field declarations, and the _type templates_ of collections.
- `field_*` is the name of an enum field. The field represents a _named member_ (value) of the `enumName` type. Each field must have a _unique_ name that does not match the name or title of any other member in the enum. To retrieve an enum member, use _dot notation_ syntax on the enum’s name (e.g., `enumName.field_1`).
- `title_*` is a “const string” value representing the _title_ of an enum member. If the enum declaration does not specify a member’s title, its title is the “string” representation of its name. The [input.enum()](../../reference manual/functions/input.enum.md) function displays enum member titles within a dropdown input in the “Settings/Inputs” tab. To retrieve the “string” title of an enum member, use the [str.tostring()](../../reference manual/functions/str.tostring.md) function on that member (e.g., `str.tostring(enumName.field_1)`). As with member names, each enum member’s title must be _unique_; it cannot match the name or title of another member in the same enum.

The following code block declares an enum named `maChoice`. Each field within the declaration represents a unique, constant member of the `maChoice` enum type with a distinct title:

```pine
//@enum       An enumeration of named values for moving average selection.
//@field sma  Specifies a Simple Moving Average.
//@field ema  Specifies an Exponential Moving Average.
//@field wma  Specifies a Weighted Moving Average.
//@field hma  Specifies a Hull Moving Average.
enum maChoice
    sma = "Simple Moving Average"
    ema = "Exponential Moving Average"
    wma = "Weighted Moving Average"
    hma = "Hull Moving Average"
```

The following script uses the [input.enum()](../../reference manual/functions/input.enum.md) function to create a dropdown input from our `maChoice` enum in the “Settings/Inputs” tab. The dropdown displays each field’s _title_ as a possible choice. The value of `maInput` is the `maChoice` _member_ corresponding to the selected title. The script compares the `maChoice` value inside a [switch](../../reference manual/keywords/switch.md) structure to determine which `ta.*()` function it uses to calculate a moving average:

```pine
//@version=6
indicator("Enum types demo", overlay = true)

//@enum       An enumeration of named values for moving average selection.
//@field sma  Specifies a Simple Moving Average.
//@field ema  Specifies an Exponential Moving Average.
//@field wma  Specifies a Weighted Moving Average.
//@field hma  Specifies a Hull Moving Average.
enum maChoice
    sma = "Simple Moving Average"
    ema = "Exponential Moving Average"
    wma = "Weighted Moving Average"
    hma = "Hull Moving Average"

//@variable The `maChoice` member representing a selected moving average name.
//          This variable's type is "input maChoice".
maChoice maInput = input.enum(maChoice.sma, "Moving average type")
//@variable The length of the moving average.
int lengthInput = input.int(20, "Length", 1, 4999)

//@variable The moving average corresponding to the selected enum member.
float selectedMA = switch maInput
    maChoice.sma => ta.sma(close, lengthInput)
    maChoice.ema => ta.ema(close, lengthInput)
    maChoice.wma => ta.wma(close, lengthInput)
    maChoice.hma => ta.hma(close, lengthInput)

// Plot the `selectedMA` value.
plot(selectedMA, "Selected moving average", color.teal, 3)
```

See the [Enums](../3. Language/language_enums.md) page and the [Enum input](../1. Concepts/concepts_inputs.md#enum-input) section of the [Inputs](../1. Concepts/concepts_inputs.md) page to learn more about using enums and enum inputs.

### [Reference types](../3. Language/language_type-system.md#reference-types)

All the types covered in the following sections are _reference types_. These types _do not_ directly represent values. Instead, scripts use them to create _objects_: logical entities that store data in a distinct location. Variables of reference types hold _references_, also known as _IDs_, that identify objects in memory and enable access to their data.

In contrast to [value types](../3. Language/language_type-system.md#value-types), which support _any_ [type qualifier](../3. Language/language_type-system.md#qualifiers), instances of a reference type automatically inherit the “series” qualifier, because each instance is _unique_. Additionally, because reference types do not represent values, they are _not_ compatible with any arithmetic or logical [operators](../3. Language/language_operators.md).

For advanced information about how these types differ from value types, see the [Value vs. reference types](../3. Language/language_type-system.md#value-vs-reference-types) section at the bottom of the page.

#### [plot and hline](../3. Language/language_type-system.md#plot-and-hline)

Pine Script uses the “plot” and “hline” types to display [plots](../2. Visuals/visuals_plots.md) and horizontal [levels](../2. Visuals/visuals_levels.md) on the chart. The [plot()](../../reference manual/functions/plot.md) and [hline()](../../reference manual/functions/hline.md) functions create instances of these types. Each call to these functions returns a _reference (ID)_ to a specific “plot” or “hline” instance. Scripts can assign the references returned by these functions to variables for use with the [fill()](../../reference manual/functions/fill.md) function, which colors the space between two displayed plots or levels.

The following example calculates two [EMAs](https://www.tradingview.com/support/solutions/43000592270-exponential-moving-average/), and then uses two [plot()](../../reference manual/functions/plot.md) calls to display their values on the chart. It assigns the “plot” IDs returned by the function calls to variables, then uses those variables in a call to [fill()](../../reference manual/functions/fill.md) to color the visual space between the displayed plots:

```pine
//@version=6
indicator("plot fill demo", overlay = true)

//@variable A "series float" value representing a 10-bar EMA of `close`.
float emaFast = ta.ema(close, 10)
//@variable A "series float" value representing a 20-bar EMA of `close`.
float emaSlow = ta.ema(close, 20)

//@variable Holds the ID of the plot that displays the `emaFast` series.
emaFastPlot = plot(emaFast, "Fast EMA", color.orange, 3)
//@variable Holds the ID of the plot that displays the `emaSlow` series.
emaSlowPlot = plot(emaSlow, "Slow EMA", color.gray, 3)

// Color the space between the outputs from the "plot" objects referenced by `emaFastPlot` and `emaSlowPlot`.
fill(emaFastPlot, emaSlowPlot, color.new(color.purple, 50), "EMA Fill")
```

Note that:

- Pine does _not_ include type keywords for specifying variables of the “plot” or “hline” type. Variables of these types never hold [na](../../reference manual/variables/na.md), so Pine can always determine their type information automatically.
- A single [fill()](../../reference manual/functions/fill.md) function call cannot use both a “plot” and “hline” ID. The function requires two IDs of the _same type_.

In addition to displaying the complete history of “series” values on the chart, “plot” objects enable _indicator-on-indicator_ functionality. Scripts can access values from _another_ script’s plots for their calculations by using the [input.source()](../../reference manual/functions/input.source.md) function. See the [Source input](../1. Concepts/concepts_inputs.md#source-input) section of the [Inputs](../1. Concepts/concepts_inputs.md) page to learn more.

#### [Drawing types](../3. Language/language_type-system.md#drawing-types)

Pine’s drawing types serve as structures for creating _drawing objects_, which scripts use to display custom chart [visuals](../2. Visuals/visuals_overview.md). The available drawing types are [line](../../reference manual/types/line.md), [linefill](../../reference manual/types/linefill.md), [box](../../reference manual/types/box.md), [polyline](../../reference manual/types/polyline.md), [label](../../reference manual/types/label.md), and [table](../../reference manual/types/table.md).

Each drawing type has an associated _namespace_ with the _same name_. This namespace contains all the available built-ins for creating and managing drawing objects. For example, the `label` namespace contains all the built-in functions and variables for creating and managing [labels](../2. Visuals/visuals_text-and-shapes.md#labels). To create new instances of any drawing type, scripts can use the following `*.new()` functions from each type’s namespace: [line.new()](../../reference manual/functions/line.new.md), [linefill.new()](../../reference manual/functions/linefill.new.md), [box.new()](../../reference manual/functions/box.new.md), [polyline.new()](../../reference manual/functions/polyline.new.md), [label.new()](../../reference manual/functions/label.new.md), and [table.new()](../../reference manual/functions/table.new.md).

Each of these `*.new()` functions creates a new drawing object on every call, and it returns the _ID (reference)_ of that specific object. The other functions in the type’s namespace require this ID to access and delete, copy, or modify the drawing. For example, a script can use the ID returned by [line.new()](../../reference manual/functions/line.new.md) later to delete the underlying [line](../../reference manual/types/line.md) object with [line.delete()](../../reference manual/functions/line.delete.md), copy the object with [line.copy()](../../reference manual/functions/line.copy.md), or update the drawing’s color with [line.set\_color()](../../reference manual/functions/line.set_color.md).

For detailed information about lines, boxes, and polylines, see the [Lines and boxes](../2. Visuals/visuals_lines-and-boxes.md) page. To learn more about tables and labels, see the [Tables](../2. Visuals/visuals_tables.md) page and the [Labels](../2. Visuals/visuals_text-and-shapes.md#labels) section of the [Text and shapes](../2. Visuals/visuals_text-and-shapes.md) page.

#### [Chart points](../3. Language/language_type-system.md#chart-points)

The [chart.point](../../reference manual/types/chart.point.md) type is a special type that scripts use to generate _chart points_. Chart points are objects that contain _chart coordinates_. Scripts use information from these objects to position [lines](../2. Visuals/visuals_lines-and-boxes.md#lines), [boxes](../2. Visuals/visuals_lines-and-boxes.md#boxes), [polylines](../2. Visuals/visuals_lines-and-boxes.md#polylines), and [labels](../2. Visuals/visuals_text-and-shapes.md#labels) on the chart.

Objects of the [chart.point](../../reference manual/types/chart.point.md) type contain three _fields_: `time`, `index`, and `price`. The `time` and `index` fields both represent horizontal locations ( _x-coordinates_). The `price` field represents the vertical location ( _y-coordinate_). Whether a drawing instance uses the `time` or `index` field from a chart point as an x-coordinate depends on the drawing’s `xloc` property. By default, drawings use the `index` field from a chart point and _ignore_ the `time` field.

Multiple functions in the `chart.point` _namespace_ create chart points:

- The [chart.point.new()](../../reference manual/functions/chart.point.new.md) function creates a new chart point containing specified `time`, `index`, and `price` values.
- The [chart.point.now()](../../reference manual/functions/chart.point.now.md) function creates a chart point with a specified `price` value. The object’s `time` and `index` field automatically contain the [time](../../reference manual/variables/time.md) and [bar\_index](../../reference manual/variables/bar_index.md) values from the bar on which the function call occurs.
- The [chart.point.from\_index()](../../reference manual/functions/chart.point.from_index.md) function creates a chart point with only specified `price` and `index` values. The `time` field of the created object is [na](../../reference manual/variables/na.md). Therefore, all chart points from this function are intended for use with drawings whose `xloc` property is [xloc.bar\_index](../../reference manual/constants/xloc.bar_index.md).
- The [chart.point.from\_time()](../../reference manual/functions/chart.point.from_time.md) function creates a chart point with only specified `price` and `time` values. The `index` field of the created object is [na](../../reference manual/variables/na.md). Therefore, all chart points from this function are intended for use with drawings whose `xloc` property is [xloc.bar\_time](../../reference manual/constants/xloc.bar_time.md).
- The [chart.point.copy()](../../reference manual/functions/chart.point.copy.md) function creates a new chart point with the _same_`time`, `index`, and `price` values as the one referenced by the specified `id` argument.

The following script draws a new line from the previous bar’s [high](../../reference manual/variables/high.md) value to the current bar’s [low](../../reference manual/variables/low.md) value on each execution. It also displays labels at both points of the line. The script sets the coordinates of the [line](../../reference manual/types/line.md) and [label](../../reference manual/types/label.md) drawings using data from chart points created by the [chart.point.from\_index()](../../reference manual/functions/chart.point.from_index.md) and [chart.point.now()](../../reference manual/functions/chart.point.now.md) functions:

```pine
//@version=6
indicator("Chart points demo", overlay = true)

//@variable References a chart point containing the previous bar's `bar_index` and `high` values.
firstPoint = chart.point.from_index(bar_index - 1, high[1])
//@variable References a chart point containing the current bar's `bar_index`, `time`, and `low` values.
chart.point secondPoint = chart.point.now(low)

//@variable References a line connecting the coordinates from the objects referenced by `firstPoint` and `secondPoint`.
line myLine = line.new(firstPoint, secondPoint, color = color.purple, width = 3)

// Draw a label at the `index` and `price` coordinates of the chart point referenced by `firstPoint`.
// The label displays a string representing the first chart point's `price` value.
label.new(
     firstPoint, str.tostring(firstPoint.price), color = color.green,
     style = label.style_label_down, textcolor = color.white
)

// Draw a label at the `index` and `price` coordinates of the chart point referenced by `secondPoint`.
// The label displays a string representing the second chart point's `price` value.
label.new(
     secondPoint, str.tostring(secondPoint.price), color = color.red,
     style = label.style_label_up, textcolor = color.white
)
```

Refer to the [Lines and boxes](../2. Visuals/visuals_lines-and-boxes.md) page for additional examples of using chart points.

#### [footprint and volume\_row](../3. Language/language_type-system.md#footprint-and-volume_row)

The [footprint](../../reference manual/types/footprint.md) and [volume\_row](../../reference manual/types/volume_row.md) types are special data types that scripts use when requesting [volume footprint](https://www.tradingview.com/support/solutions/43000726164-volume-footprint-charts-a-complete-guide/) information with the [request.footprint()](../../reference manual/functions/request.footprint.md) function. An object of the [footprint](../../reference manual/types/footprint.md) type stores the available volume footprint data for a specific bar. A [volume\_row](../../reference manual/types/volume_row.md) object stores the data for an _individual row_ within a bar’s volume footprint.

The only way to create objects of the [footprint](../../reference manual/types/footprint.md) type is by calling the [request.footprint()](../../reference manual/functions/request.footprint.md) function. A call to the function returns either the _reference (ID)_ of a [footprint](../../reference manual/types/footprint.md) object that contains the retrieved volume footprint data for the current bar, or [na](../../reference manual/variables/na.md) if no footprint data is available.

Scripts can use [footprint](../../reference manual/types/footprint.md) IDs in calls to the functions from the `footprint` _namespace_ to retrieve the calculated volume footprint data. Each function has an `id` parameter that requires a non-na ID of the [footprint](../../reference manual/types/footprint.md) type.

Some of the available `footprint.*()` functions return values representing overall metrics from a specific bar’s volume footprint:

- The [footprint.buy\_volume()](../../reference manual/functions/footprint.buy_volume.md) function calculates the total “buy” volume for the volume footprint.
- The [footprint.sell\_volume()](../../reference manual/functions/footprint.sell_volume.md) function calculates the total “sell” volume for the volume footprint.
- The [footprint.total\_volume()](../../reference manual/functions/footprint.total_volume.md) function calculates the sum of the footprint’s total “buy” volume and total “sell” volume.
- The [footprint.delta()](../../reference manual/functions/footprint.delta.md) function calculates the volume footprint’s overall volume delta. The value represents the difference between the footprint’s total “buy” volume and total “sell” volume. A positive value indicates that the total “buy” volume is greater than the total “sell” volume, and a negative value indicates the opposite.

The other `footprint.*()` functions retrieve the _IDs_ of [volume\_row](../../reference manual/types/volume_row.md) objects that contain data for individual rows in the volume footprint represented by a [footprint](../../reference manual/types/footprint.md) object:

- The [footprint.poc()](../../reference manual/functions/footprint.poc.md) function finds the _Point of Control (POC)_ row of the volume footprint and returns the ID of a [volume\_row](../../reference manual/types/volume_row.md) object containing data for that row. The POC is the footprint row that has the largest total volume.
- The [footprint.vah()](../../reference manual/functions/footprint.vah.md) function finds the _Value Area High (VAH)_ row of the volume footprint and returns a [volume\_row](../../reference manual/types/volume_row.md) ID for that row. The VAH row is the highest one in the footprint’s _Value Area_.
- The [footprint.val()](../../reference manual/functions/footprint.val.md) function finds the _Value Area Low (VAL)_ row of the volume footprint and returns a [volume\_row](../../reference manual/types/volume_row.md) ID for that row. The VAL row is the lowest one in the footprint’s Value Area.
- The [footprint.get\_row\_by\_price()](../../reference manual/functions/footprint.get_row_by_price.md) function searches the volume footprint to find the row whose price range includes a specified price level. If the price belongs to one of the footprint’s rows, the function returns the ID of the [volume\_row](../../reference manual/types/volume_row.md) object that contains the data for that row. If the price level does _not_ belong to any row in the footprint, the function returns [na](../../reference manual/variables/na.md).
- The [footprint.rows()](../../reference manual/functions/footprint.rows.md) function creates an [array](../3. Language/language_arrays.md) that contains the [volume\_row](../../reference manual/types/volume_row.md) IDs for _every row_ within the volume footprint, sorted in _ascending order_ by the rows’ price levels. The first element refers to the [volume\_row](../../reference manual/types/volume_row.md) object for the _lowest_ row, and the last refers to the one for the _highest_ row. The array’s _type identifier_ is `array<volume_row>`. See the [Collections](../3. Language/language_type-system.md#collections) section below to learn more about collection type identifiers.

The only way to access objects of the [volume\_row](../../reference manual/types/volume_row.md) type is by calling any of the above functions using a valid [footprint](../../reference manual/types/footprint.md) ID. Scripts can retrieve data from objects of this type for detailed footprint analysis by using their IDs in calls to the functions in the `volume_row` _namespace_. Each function has an `id` parameter that requires a non-na ID of the [volume\_row](../../reference manual/types/volume_row.md) type:

- The [volume\_row.up\_price()](../../reference manual/functions/volume_row.up_price.md) function returns the upper price level of the footprint row.
- The [volume\_row.down\_price()](../../reference manual/functions/volume_row.down_price.md) function returns the lower price level of the footprint row.
- The [volume\_row.buy\_volume()](../../reference manual/functions/volume_row.buy_volume.md) function calculates the total “buy” volume for the footprint row.
- The [volume\_row.sell\_volume()](../../reference manual/functions/volume_row.sell_volume.md) function calculates the total “sell” volume for the footprint row.
- The [volume\_row.total\_volume()](../../reference manual/functions/volume_row.total_volume.md) function calculates the sum of the footprint row’s total “buy” volume and total “sell” volume.
- The [volume\_row.delta()](../../reference manual/functions/volume_row.delta.md) function calculates the volume delta for the footprint row. The value represents the difference between the row’s “buy” volume and “sell” volume. A positive value indicates that the row’s “buy” volume exceeds its “sell” volume, and a negative value indicates the opposite.
- The [volume\_row.has\_buy\_imbalance()](../../reference manual/functions/volume_row.has_buy_imbalance.md) function checks whether the footprint row has a _buy imbalance_, based on the `imbalance_percent` argument of the original [request.footprint()](../../reference manual/functions/request.footprint.md) call. It returns `true` if the row’s “buy” volume exceeds the “sell” volume of the row _below_ it by the specified percentage, and `false` otherwise.
- The [volume\_row.has\_sell\_imbalance()](../../reference manual/functions/volume_row.has_sell_imbalance.md) function checks whether the footprint row has a _sell imbalance_, based on the `imbalance_percent` argument of the original [request.footprint()](../../reference manual/functions/request.footprint.md) call. It returns `true` if the row’s “sell” volume exceeds the “buy” volume of the row _above_ it by the specified percentage, and `false` otherwise.

See the [`request.footprint()`](../1. Concepts/concepts_other-timeframes-and-data.md#requestfootprint) section of the [Other timeframes and data](../1. Concepts/concepts_other-timeframes-and-data.md) page for more information about footprint requests, and for examples that demonstrate how to use the `footprint.*()` and `volume_row.*()` functions to retrieve footprint data.

To learn more about volume footprints and how they work, refer to the [Volume footprint charts](https://www.tradingview.com/support/solutions/43000726164-volume-footprint-charts-a-complete-guide/) article in our Help Center.

#### [Collections](../3. Language/language_type-system.md#collections)

Pine Script _collections_ ( [arrays](../3. Language/language_arrays.md), [matrices](../3. Language/language_matrices.md), and [maps](../3. Language/language_maps.md)) are objects that store values or the _IDs (references)_ of other objects as _elements_. Collection types enable scripts to group multiple values or IDs in a single location and perform advanced calculations. Arrays and matrices contain elements of _one_ specific type. Maps can contain data of _two_ types: one type for the _keys_, and another for the corresponding _value elements_. The `array`, `matrix`, and `map` _namespaces_ include all the built-in functions for creating and managing collections.

A collection’s _type identifier_ consists of two parts: a _keyword_ defining the collection’s _category_ ( [array](../../reference manual/types/array.md), [matrix](../../reference manual/types/matrix.md), or [map](../../reference manual/types/map.md)), and a _type template_ specifying the _types of elements_ that the collection stores. The type template for array or matrix types consists of a single type keyword enclosed in angle brackets (e.g., `<int>` for a collection of “int” values). The type template for a map type consists of _two_ comma-separated keywords surrounded by angle brackets (e.g., `<string, int>` for a map of “string” keys and “int” values).

Below, we list some examples of collection type identifiers and the types that they represent:

- `array<int>` — an array type for storing “int” values.
- `array<label>` — an array type for storing [label](../../reference manual/types/label.md) IDs.
- `array<myUDT>` — an array type for storing references to objects of a `myUDT` [user-defined type](../3. Language/language_type-system.md#user-defined-types).
- `matrix<float>` — a matrix type for storing “float” values.
- `matrix<line>` — a matrix type for storing [line](../../reference manual/types/line.md) IDs.
- `map<string, float>` — a map type for storing key-value pairs with “string” keys and “float” value elements.
- `map<int, myUDT>` — a map type for storing “int” values as keys, and references to `myUDT` objects as value elements.

Scripts also use type templates in the `*.new*()` functions that create new collections. For example, a call to `array.new<int>()` creates an array that stores “int” values, and a call to `map.new<int, color>()` creates a map that stores “int” keys and corresponding “color” values.

Programmers can explicitly define variables, parameters, and fields that accept references to objects of specific collection types by using the type identifier as the _type keyword_ in the declaration. The following code snippet declares variables that hold references to collections of the type `array<int>`, `array<float>`, and `matrix<float>`:

```pine
//@variable References an "int" array with a single element.
array<int> myIntArray = array.new<int>(1, 10)

//@variable Holds an initial reference of `na`. Can reference an array of "float" values.
array<float> myFloatArray = na

//@variable References a "float" matrix with two rows and three columns.
matrix<float> myFloatMatrix = matrix.new<float>(2, 3, 0.0)
```

Scripts can construct collections and type templates for most available types, including:

- All [value types](../3. Language/language_type-system.md#value-types): [int](../../reference manual/types/int.md), [float](../../reference manual/types/float.md), [bool](../../reference manual/types/bool.md), [color](../../reference manual/types/color.md), [string](../../reference manual/types/string.md), and [enum types](../3. Language/language_type-system.md#enum-types).
- The following _special types_: [line](../../reference manual/types/line.md), [linefill](../../reference manual/types/linefill.md), [box](../../reference manual/types/box.md), [polyline](../../reference manual/types/polyline.md), [label](../../reference manual/types/label.md), [table](../../reference manual/types/table.md), [chart.point](../../reference manual/types/chart.point.md), [footprint](../../reference manual/types/footprint.md), and [volume\_row](../../reference manual/types/volume_row.md).
- [User-defined types (UDTs)](../3. Language/language_type-system.md#user-defined-types).

Note that maps can use any of these types as value elements, but they can store only _value types_ as _keys_. See the [Maps](../3. Language/language_maps.md) page to learn more.

Collections _cannot_ store elements of any of the following types:

- The _unique types_ for specific built-ins, such as “plot\_style”, “plot\_display”, and “barmerge\_gaps”.
- The “plot” or “hline” type.
- Any collection type.

#### [User-defined types](../3. Language/language_type-system.md#user-defined-types)

The [type](../../reference manual/keywords/type.md) keyword enables the creation of _user-defined types (UDTs)_. UDTs are composite types; they can contain an arbitrary number of _fields_ that can be of _any_ supported type, including [collection types](../3. Language/language_type-system.md#collections) and other user-defined types. Scripts use UDTs to create [custom objects](../3. Language/language_objects.md) that can store multiple types of data in a single location.

The syntax to declare a user-defined type is as follows:

```
[export ]type <UDT_identifier>

    [varip ][field_type ]<field_name>[ = <value>]

    ...
```

Where:

- [export](../../reference manual/keywords/export.md) is the optional keyword for exporting the UDT from a _library_, enabling its use in other scripts. See the [User-defined types and objects](../1. Concepts/concepts_libraries.md#user-defined-types-and-objects) section of the [Libraries](../1. Concepts/concepts_libraries.md) page to learn more.
- `UDT_identifier` is the _name_ of the user-defined type.
- [varip](../../reference manual/keywords/varip.md) is an optional keyword that enables the field’s assigned data to _persist_ across all ticks within a bar, similar to a [`varip` variable](../3. Language/language_variable-declarations.md#varip).
- `field_type` is a type keyword or identifier, which specifies the field’s type.
- `field_name` is the name of the field.
- `value` is an optional _default value_ for the field. Each time that the script creates a new instance of the UDT, it initializes the field with the specified value. If not specified, the field’s default value is [na](../../reference manual/variables/na.md), or `false` if the field’s type is “bool”. Note that the default value _cannot_ be the result of a function call or any other expression; only a _literal value_ or a compatible _built-in variable_ is allowed.

The following example declares a UDT named `pivotPoint`. The type contains two fields for storing pivot data: `pivotTime` and `priceLevel`. The `pivotTime` field is of the type “int”, and `priceLevel` is of the type “float”:

```pine
//@type             A custom type for creating objects that store pivot information.
//@field pivotTime  Stores the pivot's timestamp.
//@field priceLevel Stores the pivot's price.
type pivotPoint
    int   pivotTime
    float priceLevel
```

User-defined types can contain fields for referencing other UDT objects. Additionally, UDTs support _type recursion_, meaning a UDT can include fields for referencing objects of the _same_ UDT. Below, we added a `nextPivot` field to our `pivotPoint` type. Objects of this version of the UDT can store a _reference (ID)_ to a separate object of the same `pivotPoint` type in this field:

```pine
//@type             A custom type for creating objects that store pivot information.
//@field pivotTime  Stores the pivot's timestamp.
//@field priceLevel Stores the pivot's price.
//@field nextPivot  Stores the reference to *another* instance of the `pivotPoint` type.
type pivotPoint
    int        pivotTime
    float      priceLevel
    pivotPoint nextPivot
```

Every user-defined type includes built-in `*.new()` and `*.copy()` functions for creating objects or copying existing ones. Both functions construct a new object on every call and return that object’s ID. For example, `pivotPoint.new()` creates a new instance of our `pivotPoint` type and returns its ID for use in other parts of the script.

To learn more about objects of UDTs and how to use them, see the [Objects](../3. Language/language_objects.md) page.

### [void](../3. Language/language_type-system.md#void)

Pine Script includes some [built-in functions](../3. Language/language_built-ins.md#built-in-functions) that produce _side effects_ — such as creating triggers for [alerts](../1. Concepts/concepts_alerts.md), generating chart [visuals](../2. Visuals/visuals_overview.md), or modifying [collections](../3. Language/language_type-system.md#collections) — _without_ returning any value or reference. The return type of these functions is **“void”**, which represents the _absence_ of usable data. The “void” type applies to every function that performs actions without returning anything that the script can use elsewhere in the code.

For example, [plotshape()](../../reference manual/functions/plotshape.md) performs an action (plots shapes on the chart), but it does _not_ return a usable ID like the [plot()](../../reference manual/functions/plot.md) function does. Therefore, its return type is “void”. Another example is the [alert()](../../reference manual/functions/alert.md) function. The function creates an alert trigger without returning any data that the script can use elsewhere, so it also has the “void” return type.

Because “void” represents the absence of usable data, scripts _cannot_ call functions that return “void” in other calculations or assign their results to variables. Additionally, there is no available keyword to specify that an expression returns the “void” type.

## [​`na`​ value](../3. Language/language_type-system.md#na-value)

Pine Script includes a special value called [na](../../reference manual/variables/na.md), which is an abbreviation for _“not available”_. Scripts use [na](../../reference manual/variables/na.md) to represent an _undefined_ value or reference. It is similar to `null` in Java or `NONE` in Python.

Pine can automatically _cast_ [na](../../reference manual/variables/na.md) values to almost any type. The type assigned to an [na](../../reference manual/variables/na.md) value depends on how the code uses it. However, in some cases, more than one type might be valid for a piece of code that includes [na](../../reference manual/variables/na.md), and the compiler cannot determine which type to assign in those cases.

For example, this line of code declares a `myVar` variable with an initial value of [na](../../reference manual/variables/na.md). This line causes a _compilation error_, because the type of data the variable might hold later is _uncertain_. It might store a “float” value for plotting, a “string” value for setting text in a label, or maybe even a _reference_ to a [drawing object](../3. Language/language_type-system.md#drawing-types):

```pine
// This declaration causes an error, because the type that `myVar` accepts is *uncertain*.
myVar = na
```

To resolve this error, we must explicitly define the variable’s type in the code. For instance, if the `myVar` variable will store “float” values, we can prefix the variable with the [float](../../reference manual/types/float.md) keyword to specify its type as “float”:

```pine
// It is clear to the compiler that this variable accepts "float" values, so this declaration does not cause an error.
float myVar = na
```

Alternatively, we can use the [float()](../../reference manual/functions/float.md) function to explicitly cast the [na](../../reference manual/variables/na.md) value’s type to “float”, causing the variable to automatically inherit the “float” type:

```pine
// This declaration does not cause an error, because `na` is cast to "float", and `myVar` inherits the type.
myVar = float(na)
```

Scripts can test whether the result from a variable or expression is [na](../../reference manual/variables/na.md) by using the [na()](../../reference manual/functions/na.md) function. The function returns `true` if the value or reference is _undefined_. Otherwise, it returns `false`. For example, the following [ternary operation](../3. Language/language_operators.md#-ternary-operator) returns 0 if the value of `myVar` is [na](../../reference manual/variables/na.md), or [close](../../reference manual/variables/close.md) if the value is defined:

```pine
//@variable Holds 0 if the the value of `myVar` is `na`; `close` otherwise.
float myClose = na(myVar) ? 0 : close
```

It is crucial to note that scripts **cannot** directly _compare_ values to [na](../../reference manual/variables/na.md), because by definition, [na](../../reference manual/variables/na.md) values are undefined. The [==](../../reference manual/operators/==.md), [!=](../../reference manual/operators/!=.md) operators, and all other [comparison operators](../3. Language/language_operators.md#comparison-operators) always return `false` if at least one of the operands is a variable with an [na](../../reference manual/variables/na.md) value. Therefore, [na](../../reference manual/variables/na.md) comparisons can cause _unexpected results_. Additionally, if a script attempts to use [na](../../reference manual/variables/na.md) directly as an operand in any comparison operation, it causes a _compilation error_. For example:

```pine
// This line causes an error, because using `na` directly as an operand for the `==` operator is *not allowed*.
float myClose = myVar == na ? 0 : close
```

Best practices often involve _replacing_ occurrences of undefined values in the code to prevent them from propagating in a script’s calculations. There are three ways to replace [na](../../reference manual/variables/na.md) values with defined values in a script’s calculations, depending on the type:

- For the “int”, “float”, and “color” types, scripts can use the [nz()](../../reference manual/functions/nz.md) function to replace [na](../../reference manual/variables/na.md) values with a type-specific default value (`0` for “int”, `0.0` for “float”, or `#00000000` for “color”) or a specified replacement.
- Alternatively, scripts can use the [fixnan()](../../reference manual/functions/fixnan.md) function to replace [na](../../reference manual/variables/na.md) values of the above types in a series with the latest non-na value from that series’ history.
- For other types such as “string”, scripts can test for an undefined value using the [na()](../../reference manual/functions/na.md) function and replace it if the function returns `true`.

The following line of code uses the [nz()](../../reference manual/functions/nz.md) function to replace the value of `close[1]` with the current bar’s [open](../../reference manual/variables/open.md) value if the expression’s result is [na](../../reference manual/variables/na.md). This logic prevents the code from returning [na](../../reference manual/variables/na.md) on the first bar, where there is _no_ previous [close](../../reference manual/variables/close.md) value for the [\[\]](../../reference manual/operators/[].md) operator to access:

```pine
//@variable Holds `true` if the current `close` value is above the previous `close` (or the current `open` if the previous `close` is `na`).
bool risingClose = close > nz(close[1], open)
```

Replacing [na](../../reference manual/variables/na.md) values to avoid unintended results is especially helpful when a calculation involves data that can _persist_ across bars.

For example, the script below declares a global `allTimeHigh` variable using the [var](../../reference manual/keywords/var.md) keyword, meaning the variable is initialized only on the first bar and persists on all subsequent bars. On each bar, the script updates the variable with the result of a [math.max()](../../reference manual/functions/math.max.md) call that returns the maximum between the current `allTimeHigh` and [high](../../reference manual/variables/high.md) values, then plots the result.

This script plots [na](../../reference manual/variables/na.md) instead of the chart’s all-time high on every bar. The `allTimeHigh` variable has an initial value of [na](../../reference manual/variables/na.md), and the [math.max()](../../reference manual/functions/math.max.md) function _cannot_ compare [na](../../reference manual/variables/na.md) to the current value of [high](../../reference manual/variables/high.md). Therefore, the function call consistently returns [na](../../reference manual/variables/na.md):

```pine
//@version=6
indicator("Persistent `na` result demo", overlay = true)

//@variable A variable intended to store the chart's all-time high as of the current bar, with an initial value of `na`.
var float allTimeHigh = na

// Compare the current `allTimeHigh` and `high` values, and update the `allTimeHigh` with the maximum.
// This line does not assign the current all-time high to the variable; the value remains `na` on *every bar*.
// The `math.max()` function cannot compare undefined values, so it returns `na` if at least one argument is `na`.
allTimeHigh := math.max(allTimeHigh, high)

plot(allTimeHigh)
```

To fix this script’s behavior and enable it to calculate the chart’s all-time high as intended, we must stop the script from passing an [na](../../reference manual/variables/na.md) value to the [math.max()](../../reference manual/functions/math.max.md) call. In the version below, we included the expression `nz(allTimeHigh, high)` as the first argument in the function call. Now, on any execution where the `allTimeHigh` value is [na](../../reference manual/variables/na.md), the script replaces it with the value of [high](../../reference manual/variables/high.md), preventing [na](../../reference manual/variables/na.md) values from persisting in the calculation:

```pine
//@version=6
indicator("Replaced `na` demo", overlay = true)

//@variable Stores the chart's all-time high value as of the current bar.
var float allTimeHigh = na

// The `nz()` call in this line replaces `allTimeHigh` with `high` when the variable's value is `na`. Now, the
// `math.max()` function never receives an `na` argument, so the `na` result no longer persists.
allTimeHigh := math.max(nz(allTimeHigh, high), high)

plot(allTimeHigh)
```

Note that:

- An alternative way to fix this script’s behavior is to initialize the `allTimeHigh` variable using the value of [high](../../reference manual/variables/high.md). The fix works in this case because the script does not use [na](../../reference manual/variables/na.md) later in its calculations.

## [Type casting](../3. Language/language_type-system.md#type-casting)

Pine Script can convert (cast) values of one type to another type either by using specific functions, or automatically.

The _automatic_ type-casting process can cast “int” values to the “float” type when necessary. All variables, function parameters, fields, and expressions that allow the “float” type can also accept “int” values, because any integer is equivalent to a floating-point number with its fractional part set to 0. If a script assigns an “int” value to a variable, function parameter, or field declared with the [float](../../reference manual/types/float.md) keyword, the assigned value’s type automatically changes to “float”. Likewise, Pine converts “int” values to “float” in arithmetic or comparison [operations](../3. Language/language_operators.md) that include a “float” operand.

For example, the following line of code uses the addition operator [+](../../reference manual/operators/+.md) with “int” and “float” operands. Pine automatically casts the “int” value to the “float” type before performing the addition operation, and thus the expression returns a “float” result:

```pine
// This variable holds a "float" value, because any arithmetic operation with "int" and "float" operands
// returns a "float" result.
myVar = bar_index + close
```

Sometimes, a script must cast data of one type to another. Scripts can cast [`na` values](../3. Language/language_type-system.md#na-value), or numeric values, to specific types by using the following _type-casting functions_: [int()](../../reference manual/functions/int.md), [float()](../../reference manual/functions/float.md), [bool()](../../reference manual/functions/bool.md), [color()](../../reference manual/functions/color.md), [string()](../../reference manual/functions/string.md), [line()](../../reference manual/functions/line.md), [linefill()](../../reference manual/functions/linefill.md), [label()](../../reference manual/functions/label.md), [box()](../../reference manual/functions/box.md), and [table()](../../reference manual/functions/table.md).

For example, the script below declares a `LENGTH` variable of the “const float” type, then attempts to use that variable as the `length` argument of a [ta.sma()](../../reference manual/functions/ta.sma.md) function call:

```pine
//@version=6
indicator("Invalid type demo", overlay = true)

//@variable Holds a "const float" value intended for use in the `length` argument of `ta.sma()`.
float LENGTH = 10.0

// This line causes an error, because the `length` parameter has the expected type "series int".
float sma = ta.sma(close, length = LENGTH)

plot(sma)
```

The above code causes the following compilation error:

```
Cannot call `ta.sma()` with the argument `length = LENGTH`. An argument of "const float" type was used but a "series int" is expected.
```

This error tells us that the code uses a “float” value where an “int” value is required. There is no automatic rule to cast “float” to “int”, so we must resolve the error manually. In this version of the code, we used the [int()](../../reference manual/functions/int.md) function to cast the “float” value of the `LENGTH` variable to the “int” type in the [ta.sma()](../../reference manual/functions/ta.sma.md) call. Now, the script compiles successfully:

```pine
//@version=6
indicator("Explicit casting demo")

//@variable Holds a "const float" value intended for use in the `length` argument of `ta.sma()`.
float LENGTH = 10.0

// This line does not cause an error, because the `int()` function converts the `length` argument's type to "const int".
float sma = ta.sma(close, length = int(LENGTH))

plot(sma)
```

Note that:

- The [int()](../../reference manual/functions/int.md) function removes all fractional information from a “float” value _without_ rounding. For instance, a call such as `int(10.5)` returns a value of 10, not 11. To round a “float” value to the nearest whole number before converting it to “int”, use [math.round()](../../reference manual/functions/math.round.md).

For most available types, explicit type casting is useful when defining variables that have initial [na](../../reference manual/variables/na.md) values or references, as explained in the previous section, [`na` value](../3. Language/language_type-system.md#na-value).

For example, a script can declare a variable that holds an [na](../../reference manual/variables/na.md) reference of the [label](../../reference manual/types/label.md) type in either of the following, equivalent ways:

```pine
// Explicitly specify that the variable can reference `label` objects.
label myLabel = na

// Explicitly cast the `na` instance to the `label` type, causing `myLabel` to inherit the type.
myLabel = label(na)
```

## [Tuples](../3. Language/language_type-system.md#tuples)

A _tuple_ is a _comma-separated list_ of expressions or identifiers enclosed in square brackets (e.g., `[expr1, expr2, expr3]`). If a structure that creates a local scope, such as a function, [method](../3. Language/language_methods.md), [conditional structure](../3. Language/language_conditional-structures.md), or [loop](../3. Language/language_loops.md), returns more than one result, the code lists the expressions for all the results in the form of a tuple at the end of the structure’s local block.

For example, the following [user-defined function](../3. Language/language_user-defined-functions.md) returns a tuple containing two values. The first item in the tuple is the sum of the function’s `a` and `b` arguments, and the second is the product of those two values:

```pine
//@function Calculates the sum and product of two "float" values.
calcSumAndProduct(float a, float b) =>
    //@variable The sum of `a` and `b`.
    float sum = a + b
    //@variable The product of `a` and `b`.
    float product = a * b
    // Return a tuple containing the `sum` and `product` values.
    [sum, product]
```

When calling this function later in the code, the script must use a [tuple declaration](../3. Language/language_variable-declarations.md#tuple-declarations) to declare one new variable for each value returned by the function to use its data. For example, the `hlSum` and `hlProduct` variables in the following tuple declaration hold the `sum` and `product` values returned by a `calcSumAndProduct()` call:

```pine
// Declare a tuple containing a variable for each value returned by the `calcSumAndProduct()` call.
[hlSum, hlProduct] = calcSumAndProduct(high, low)
```

Note that:

- In contrast to individual [variable declarations](../3. Language/language_variable-declarations.md), tuple declarations _do not_ support [type keywords](../3. Language/language_type-system.md#types). The compiler automatically determines the type of each variable in a declared tuple.

If a script’s calculations do not require _all_ the values returned by a function or structure, programmers can [use an underscore](../3. Language/language_variable-declarations.md#using-an-underscore-as-an-identifier) as the _identifier_ for one or more returned items in the tuple declaration. If a variable’s identifier is an underscore, that variable is not usable elsewhere in the code, such as in comparisons or arithmetic expressions.

For example, if we do not require the `product` value returned by our `calcSumAndProduct()` function, we can replace the `hlProduct` variable with `_` in our declared tuple:

```pine
// Declare a tuple with `_` as the second identifier, signifying that the script does not use the second returned value.
// The `_` identifier in this tuple is *not* usable elsewhere in the code.
[hlSum, _] = calcSumAndProduct(high, low)
```

In the above examples, the resulting tuple contains two items of the same type (“float”). However, Pine does not restrict tuples to only one type; a single tuple can contain multiple items of _different types_. For example, the custom `chartInfo()` function below returns a five-item tuple containing “int”, “float”, “bool”, “color”, and “string” values:

```pine
//@function Returns information about the current chart.
chartInfo() =>
    //@variable The first visible bar's UNIX time value.
    int firstVisibleTime = chart.left_visible_bar_time
    //@variable The `close` value at the `firstVisibleTime`.
    float firstVisibleClose = ta.valuewhen(ta.cross(time, firstVisibleTime), close, 0)
    //@variable Is `true` if the chart has a standard chart type; `false` otherwise.
    bool isStandard = chart.is_standard
    //@variable The foreground color of the chart.
    color fgColor = chart.fg_color
    //@variable The ticker ID of the current chart.
    string symbol = syminfo.tickerid
    // Return a tuple containing the values.
    [firstVisibleTime, firstVisibleClose, isStandard, fgColor, symbol]
```

Scripts can also pass tuples to the `expression` parameter of `request.*()` functions, enabling them to retrieve _multiple_ series from a single function call. A single call to [request.security()](../../reference manual/functions/request.security.md) or another `request.*()` function that requests a tuple of data still counts as _one_ data request, not multiple. See the [Other timeframes and data](../1. Concepts/concepts_other-timeframes-and-data.md) page to learn more about `request.*()` functions and the data that they can retrieve.

The following code snippet defines a `roundedOHLC()` function that returns a tuple of OHLC prices rounded to the nearest values that are divisible by the symbol’s minimum tick size. We use this function as the `expression` argument in a [request.security()](../../reference manual/functions/request.security.md) call to retrieve a tuple containing the symbol’s rounded price values on the “1D” timeframe:

```pine
//@function Returns a tuple of OHLC values, rounded to the nearest tick.
roundedOHLC() =>
    [math.round_to_mintick(open), math.round_to_mintick(high), math.round_to_mintick(low), math.round_to_mintick(close)]

[op, hi, lo, cl] = request.security(syminfo.tickerid, "1D", roundedOHLC())
```

An alternative way to perform the same request is to pass the tuple of rounded values _directly_ to the `expression` parameter of the [request.security()](../../reference manual/functions/request.security.md) call. For example:

```pine
[op, hi, lo, cl] = request.security(
     syminfo.tickerid, "1D",
     [math.round_to_mintick(open), math.round_to_mintick(high), math.round_to_mintick(low), math.round_to_mintick(close)]
)
```

Note that:

- Only the `request.*()` functions that have an `expression` parameter and the `input.*()` functions that include an `options` parameter support this argument format. No other functions can use tuples as arguments.

Conditional structures and loops can use tuples as their return expressions, enabling them to return multiple values at once after the script exits their scopes. For example, the [if](../../reference manual/keywords/if.md) statement below returns a two-item tuple from one of its local blocks:

```pine
[v1, v2] = if close > open
    [high, close]
else
    [close, low]
```

The following [switch](../../reference manual/keywords/switch.md) statement is equivalent to the above [if](../../reference manual/keywords/if.md) statement:

```pine
[v1, v2] = switch
    close > open => [high, close]
    =>              [close, low]
```

It’s crucial to emphasize that only the _local scopes_ of functions, conditional structures, or loops can return tuples. In contrast to [if](../../reference manual/keywords/if.md) and [switch](../../reference manual/keywords/switch.md) statements, [ternary operations](../3. Language/language_operators.md#-ternary-operator) are **not** conditional structures; they are _expressions_ that _do not_ create local scopes. Therefore, they cannot return tuples.

For example, this line of code attempts to return a tuple from a ternary operation, causing a _compilation error_:

```pine
// Causes an error. Only local scopes can return tuples, and the `?:` operator does not create new scopes.
[v1, v2] = close > open ? [high, close] : [close, low]
```

Although all items in a tuple do not have to be of the same _type_, it’s important to note that every item inherits the **same** [type qualifier](../3. Language/language_type-system.md#qualifiers). All items within a tuple _returned_ by a local scope inherit either the “simple” or “series” qualifier, depending on the structure and the items’ types. Therefore, because “series” is the stronger qualifier, all other items in the returned tuple automatically inherit the “series” qualifier if at least one item is qualified as “series”.

For example, the script below defines a `getParameters()` function that returns a two-item tuple. The script attempts to use the values returned by the function as arguments in a [ta.ema()](../../reference manual/functions/ta.ema.md) function call, causing a compilation error. The [ta.ema()](../../reference manual/functions/ta.ema.md) function requires a `length` argument of the type “simple int”, but the `len` variable’s type is _“series int”_. The value assigned to `len` automatically inherits the “series” qualifier because the `source` argument of the `getParameters()` call is of the type “series float”:

```pine
//@version=6
indicator("Qualified types in tuples demo")

getParameters(float source, simple int length) =>
    // Although the expected type of the `length` parameter is "simple int", the
    // `length` value in the returned tuple inherits the "series" qualifier if the
    // `source` value has that qualifier, because all items in a tuple inherit the *same* qualifier.
    [source, length]

// Declare a tuple containing the values returned by a `getParameters()` call.
// Both variables in this tuple have the "series" qualifier, because `close` is of the type "series float".
[src, len] = getParameters(source = close, length = 20)

// This line causes an error. `ta.ema()` expects a "simple int" `length` argument, but `len` has the type "series int".
plot(ta.ema(source = src, length = len))
```

## [Value vs. reference types](../3. Language/language_type-system.md#value-vs-reference-types)

Every type in Pine Script, excluding [void](../3. Language/language_type-system.md#void), is either a [value type](../3. Language/language_type-system.md#value-types) or a [reference type](../3. Language/language_type-system.md#types).

All [fundamental types](../3. Language/language_type-system.md#types), [enum types](../3. Language/language_type-system.md#enum-types), and the _unique types_ for specific function parameters are _value types_. These types directly _represent_ values, which scripts can use in arithmetic, comparison, or logical [operations](../3. Language/language_operators.md). Variables of these types store values. Likewise, expressions that return these types return values. Values can become available at compile time, input time, or runtime. Therefore, they can inherit _any_ [type qualifier](../3. Language/language_type-system.md#qualifiers), depending on their use in the code.

By contrast, [user-defined types (UDTs)](../3. Language/language_type-system.md#user-defined-types) and _special types_ — including [label](../../reference manual/types/label.md), [line](../../reference manual/types/line.md), [linefill](../../reference manual/types/linefill.md), [polyline](../../reference manual/types/polyline.md), [box](../../reference manual/types/box.md), [table](../../reference manual/types/table.md), [chart.point](../../reference manual/types/chart.point.md), and [collection types](../3. Language/language_type-system.md#collections) — are _reference types_. These types serve as structures for creating _objects_. An object is **not** a value; it is a logical entity that stores data in a distinct memory location. Each separate object has a unique associated _reference_, similar to a pointer, which identifies the object in memory and enables the script to access its data. Variables of reference types hold these object references; they **do not** store objects directly.

Scripts create objects exclusively at _runtime_, using the available constructor functions from the type’s namespace (e.g., [label.new()](../../reference manual/functions/label.new.md)). Every call to these functions creates a _new object_ with a _unique reference_. Therefore, unlike value types, reference types automatically inherit the “series” qualifier; they never inherit _weaker_ qualifiers such as “simple” or “const”.

For example, the following script declares a `myLabel` variable and assigns it the result of a [label.new()](../../reference manual/functions/label.new.md) function call with constant `x` and `y` arguments on the first bar. Although the script calls [label.new()](../../reference manual/functions/label.new.md) only _once_, with “const” arguments, the variable’s type is _“series label”_. The type is **not** “const label”, because every call to the function returns a new, unique [label](../../reference manual/types/label.md) reference, which no other call can reproduce:

```pine
//@version=6
indicator("'series' reference demo")

//@variable References a label created on the first bar using "const" arguments.
//          Although the script creates only one label, using constant values, this variable's type is "series label"
//          because the assigned `label` reference is *unique*. No additional function calls can create the same label
//          instance or return the same reference.
var label myLabel = label.new(0, 0, "A new 'series' label")
```

Note that:

- The script creates a label only on the first bar because the variable that stores its reference is declared in the _global scope_ using the [var](../../reference manual/keywords/var.md) keyword. See the [Declaration modes](../3. Language/language_variable-declarations.md#declaration-modes) section of the [Variable declarations](../3. Language/language_variable-declarations.md) page to learn more.

### [Modifying variables vs. objects](../3. Language/language_type-system.md#modifying-variables-vs-objects)

Each variable of a [value type](../3. Language/language_type-system.md#value-types) holds an independent value, and the only way to modify that variable’s data is by using the reassignment or compound assignment [operators](../3. Language/language_operators.md). Each use of these operators directly overwrites the stored value, thus removing it from the current execution.

Scripts can also modify variables of [reference types](../3. Language/language_type-system.md#reference-types) with the [:=](../../reference manual/operators/:=.md) operator, but not a compound assignment operator such as [+=](../../reference manual/operators/+=.md), because object references are _not compatible_ with arithmetic or logical operations. However, it’s crucial to note that reassigning a variable of a reference type _does not_ directly affect any object; it only assigns _another reference_ to that variable. The object referenced before the operation _can_ remain in memory and affect the script’s results, depending on the type and the script’s logic.

To understand this distinction, consider the following script, which uses a variable to store [label](../../reference manual/types/label.md) references on the last historical bar. First, the script initializes the `myLabel` variable with the result of one [label.new()](../../reference manual/functions/label.new.md) call. Then, it uses the [:=](../../reference manual/operators/:=.md) operator to assign the variable the result of a _second_ [label.new()](../../reference manual/functions/label.new.md) call. Reassigning the `myLabel` variable only changes the variable’s stored reference; it _does not_ overwrite the _first_ [label](../../reference manual/types/label.md) object. The first label _still exists_ in memory. Consequently, this script displays _two_ separate drawings:

```pine
//@version=6
indicator("Reassigning reference-type variables demo")

if barstate.islastconfirmedhistory
    // Create a new `label` object and assign its reference to `myLabel`.
    label myLabel = label.new(bar_index, 0, "First label")

    // Create another `label` object and assign that object's reference to the variable.
    // This reassignment operation does not overwrite the first label. It only changes the variable's assigned
    // reference. The first object still exists and produces an output on the chart.
    myLabel := label.new(bar_index, 20, "Second label")
```

Note that:

- Objects remain in memory until a script no longer uses them. For [drawing types](../3. Language/language_type-system.md#drawing-types), the runtime system automatically maintains a limited number of active objects. It begins deleting those objects, starting with the oldest ones, only if a script reaches its _drawing limit_ (e.g., ~50 labels by default).
- A script can also explicitly delete objects of drawing types by using the built-in `*.delete()` functions, such as [label.delete()](../../reference manual/functions/label.delete.md). For example, if we add the call `label.delete(myLabel)` before the final line in the code above, the script removes the first label before assigning the second label’s reference to the `myLabel` variable.

Because objects are not values, but entities that store data separately, scripts do not modify their data by reassigning the variables that reference them. To access or modify an object’s data, programmers must do either of the following, depending on the type:

- Use the built-in _getter_ and _setter_ functions available for most special types. For example, [label.get\_x()](../../reference manual/functions/label.get_x.md) retrieves the `x` value from a [label](../../reference manual/types/label.md) object, and [label.set\_x()](../../reference manual/functions/label.set_x.md) updates a label’s `x` value.
- Use _dot notation_ syntax on a variable of a [UDT](../3. Language/language_type-system.md#user-defined-types) or the [chart.point](../../reference manual/types/chart.point.md) type to access the object’s _field_. Then, to change the field’s assigned data, use a reassignment or compound assignment operator after the syntax. For example, `myObj.price` retrieves the `price` field of the object referenced by the `myObj` variable, and `myObj.price := 10` sets that field’s value to 10.

The example below creates a [chart point](../3. Language/language_type-system.md#chart-points) and a [label](../../reference manual/types/label.md) instance on the first bar, and then modifies the two objects on every bar. With each execution, the script updates the `price` (“float”) and `index` (“int”) fields of the chart point, then uses its reference in a [label.set\_point()](../../reference manual/functions/label.set_point.md) call to change the label’s coordinates. Lastly, the script uses [label.get\_y()](../../reference manual/functions/label.get_y.md) to get the label’s `y` value (“float”), then uses a plot to display the value:

```pine
//@version=6
indicator("Modifying objects demo", overlay = true)

//@variable Maintains a persistent reference to one `chart.point` object with an initial `price` field of `na`.
var chart.point myPoint = chart.point.now(na)

//@variable Maintains a persistent reference to one `label` object initialized using the `myPoint` chart point.
var label myLabel = label.new(myPoint, "Persistent label")

// Update the chart point referenced by `myPoint` on each bar by reassigning the object's *fields*.
myPoint.index := bar_index
myPoint.price := close

// Update the label referenced by `myLabel` using a call to `label.set_point()`. The call uses the `index` field of
// the chart point for the label's x-coordinate, and the `price` field for the y-coordinate.
label.set_point(myLabel, myPoint)

// Retrieve the y-coordinate from the `myLabel` label, confirming that both persistent objects were modified.
plot(label.get_y(myLabel), "Label y-coordinate")
```

Note that:

- The [label.set\_point()](../../reference manual/functions/label.set_point.md) call in this example uses the `index` field of the chart point to set the label’s `x` value, and it uses the `price` field to set the `y` value. It does not use the `time` field from the chart point for the `x` value, because the default `xloc` property for labels is [xloc.bar\_index](../../reference manual/constants/xloc.bar_index.md).

#### [Modifying global data in local scopes](../3. Language/language_type-system.md#modifying-global-data-in-local-scopes)

Every script has one _global_ [scope](../6. FAQ/faq_programming.md#what-does-scope-mean), and it includes zero or more _local_ scopes from any [conditional structures](../3. Language/language_conditional-structures.md), [loops](../3. Language/language_loops.md), [user-defined functions](../3. Language/language_user-defined-functions.md) or [methods](../3. Language/language_methods.md#user-defined-methods), or other structures. Most structures that create local scopes can access and use any global variables declared above them in the source code, because a script’s local scopes _embed_ into the global scope.

Conditional structures and loops defined in the global scope, as well as the nested structures within them, can also contain [reassignment](../3. Language/language_operators.md#-reassignment-operator) or [compound assignment](../3. Language/language_operators.md#compound-assignment-operators) operations that modify global variables. In other words, either of these structures can directly change the data associated with global variables of value types and reference types.

For example, the script below declares a persistent “int” variable named `counter` in the global scope. Then, it uses the [+=](../../reference manual/operators/+=.md) and [:=](../../reference manual/operators/:=.md) operators inside nested [if](../../reference manual/keywords/if.md) statements to update the variable’s assigned value based on cyclic occurrences of a pseudorandom condition:

```pine
//@version=6
indicator("Modifying global variables in conditional structures demo")

//@variable The number of conditions that occur before the counter value resets.
int cycleSizeInput = input.int(10, "Cycle size", 1)

//@variable A persistent global variable for counting occurrences of a condition in cycles.
var int counter = 0

// Logic to update `counter` based on a pseudorandom condition.
if math.random() < 0.5
    // Increase the `counter` value by one when the condition occurs.
    counter += 1
    // Reset the `counter` value to 1 if it exceeds the value of `cycleSizeInput`.
    if counter > cycleSizeInput
        counter := 1

// Plot the `counter` value.
plot(counter, "Counter value")
```

By contrast, user-defined functions and methods _cannot_ use the reassignment or compound assignment operators on global variables, because variables declared outside a [function scope](../3. Language/language_user-defined-functions.md#function-scopes) cannot accept _different_ values _or_ references during the execution of a _function call_. Consequently, functions and methods _cannot modify_ the data associated with global variables of [value types](../3. Language/language_type-system.md#value-types).

Below, we edited the previous script to demonstrate this limitation. The following script version defines an `updateCounter()` function that attempts to modify the global `counter` variable from inside its scope using the same [+=](../../reference manual/operators/+=.md) and [:=](../../reference manual/operators/:=.md) operations as the example above. However, because the variable exists _outside_ the function’s definition, the function _cannot_ change its value. As such, a _compilation error_ occurs:

```pine
//@version=6
indicator("Cannot modify global variables in functions demo")

//@variable The number of conditions that occur before the counter value resets.
int cycleSizeInput = input.int(10, "Cycle size", 1)

//@variable A persistent global variable for counting occurrences of a condition in cycles.
var int counter = 0

//@function Attempts to increment and cyclically reset the `counter` variable based on a pseudorandom condition.
//          This function *does not* compile, because modifying global variables in function scopes is *not allowed*.
updateCounter() =>
    if math.random() < 0.5
        // Attempting to increment `counter` causes a compilation error.
        // The variable's value *cannot change* during the execution of an `updateCounter()` call.
        counter += 1
        if counter > cycleSizeInput
            // Reassigning the `counter` variable causes the same error.
            counter := 1

updateCounter() // This call does not work.

plot(counter, "Counter value")
```

To modify global data from within the scope of a function call, programmers can use global variables of [reference types](../3. Language/language_type-system.md#reference-types) instead of value types in the function’s definition. As explained in the [previous section](../3. Language/language_type-system.md#modifying-variables-vs-objects), scripts do _not_ modify objects of these types by reassigning the variables that reference them. Instead, they _reassign fields_ or use _setter functions_, depending on the type, to update the data that an object stores _elsewhere_ in memory. Therefore, because a variable’s assigned reference _does not change_ after a script modifies an object, functions _can_ change the data associated with global variables of reference types, unlike those of value types.

For example, the script version below declares a [user-defined type](../3. Language/language_type-system.md#user-defined-types) named `Counter` with an “int” field named `value`. Then, it creates a new object of that type with a call to `Counter.new()`, and assigns the returned reference to a persistent global variable named `myCounter`. The `updateCounter()` function in this script uses the [+=](../../reference manual/operators/+=.md) and [:=](../../reference manual/operators/:=.md) operators on the `value` _field_ of the `Counter` object referenced by the `myCounter` variable rather than directly reassigning the variable. Although the `value` field’s assigned value can change during the execution of an `updateCounter()` call, the global variable itself remains unchanged; it still holds the reference to the _same_`Counter` object while the call executes. As a result, the script compiles successfully:

```pine
//@version=6
indicator("Modifying globally referenced objects in functions demo")

//@variable The number of conditions that occur before the counter value resets.
int cycleSizeInput = input.int(10, "Cycle size", 1)

//@type         A custom type for creating objects that store counter data.
//@field value  The counter value, initialized to 0 by default.
type Counter
    int value = 0

//@variable A persistent global variable that holds the reference of a `Counter` object.
var Counter myCounter = Counter.new()

//@function Increments and cyclically resets the `value` field of the object referenced by `myCounter` based on a
//          pseudorandom condition.
//          This function does *not* cause an error, because it does not modify the global variable.
updateCounter() =>
    if math.random() < 0.5
        // Increase the `value` *field* of the `Counter` object referenced by `myCounter` when the condition occurs.
        myCounter.value += 1
        // Reset the `value` field to 1 if it exceeds the value of `cycleSizeInput`.
        if myCounter.value > cycleSizeInput
            myCounter.value := 1

// Modify the object referenced by `myCounter`. This function call works without issue.
updateCounter()

// Plot the value of the object's `value` field, i.e., the condition counter.
plot(myCounter.value, "Counter value")
```

### [Copies vs. shared references](../3. Language/language_type-system.md#copies-vs-shared-references)

Variables of value types hold values that act as _independent copies_, because the only way to modify their data is through reassignment. If a script directly assigns one variable’s value to another variable, it can change either variable’s data later without affecting the other variable’s data in any way.

For example, the following script initializes a `myVar1` variable with a value of 10, and then initializes a `myVar2` variable using `myVar1`. Afterward, the script adds 10 to `myVar1` with the [+=](../../reference manual/operators/+=.md) operator, and plots the values of both variables on the chart. The script plots two different values (20 and 10), because changes to the value of `myVar1` do not affect the data accessed by `myVar2`:

```pine
//@version=6
indicator("Value type independence demo")

// Initialize the first variable with a value of 10.
int myVar1 = 10
// Initialize the second variable using the first. This variable's value is now 10.
int myVar2 = myVar1

// Increase the first variable's value by 10. Now, the value of `myVar1` is 20, but the value of `myVar2` is still 10.
myVar1 += 10

// Plot both values for comparison.
plot(myVar1, "First variable", color.blue, 3)
plot(myVar2, "Second variable", color.purple, 3)
```

The same behavior does not apply to variables of reference types. Assigning the reference stored by one variable to another **does not** create a new _copy_ of an object. Instead, both variables refer to the **same** object in memory. As a result, the script can access or change that object’s data through _either_ variable and produce the same results.

The following example demonstrates this behavior. On the last historical bar, the script creates a new label with [label.new()](../../reference manual/functions/label.new.md) and assigns the returned reference to the `myLabel1` variable. Then, it initializes the `myLabel2` variable using `myLabel1`. The script calls [label.set\_color()](../../reference manual/functions/label.set_color.md) to modify the label referenced by `myLabel1`, and then calls [label.set\_style()](../../reference manual/functions/label.set_style.md) and [label.set\_text()](../../reference manual/functions/label.set_text.md) to modify the one referenced by `myLabel2`.

A newcomer to reference types might expect this script to display _two_ separate labels, with different colors, orientation, and text. However, the script shows only **one** label on the chart, and that label includes the changes from all `label.set_*()` calls. Modifying the label referenced by `myLabel2` directly affects the one referenced by `myLabel1`, and vice versa, because both variables refer to the **same** [label](../../reference manual/types/label.md) object:

```pine
//@version=6
indicator("Shared object references demo")

if barstate.islastconfirmedhistory
    // Create a new label and assign its reference to a variable.
    label myLabel1 = label.new(bar_index, 0, "First label", color = color.green, size = size.large)
    // Initialize a second variable using the `myLabel1` variable.
    // This variable declaration *does not* copy the label referenced by `myLabel1`; it only copies that variable's
    // *reference* to the new variable.
    label myLabel2 = myLabel1

    // Change the color of the label referenced by `myLabel1`.
    label.set_color(myLabel1, color.red)
    // Update the style and text of the label referenced by `myLabel2`.
    // Because both variables refer to the *same object*, all the label changes affect that one object,
    // regardless of which variable the script uses in the `label.set_*()` calls.
    label.set_style(myLabel2, label.style_label_up)
    label.set_text(myLabel2, "Second label")
```

Most reference types, including [user-defined types](../3. Language/language_type-system.md#user-defined-types), feature a built-in `*.copy()` function. This function creates a new, _independent_ object that contains the same data as the original object, and that new object has a _unique reference_. The script can modify the copied object’s data without directly affecting the original.

In the following example, we changed the previous script to initialize `myLabel2` using the expression `label.copy(myLabel1)`, which creates an independent copy of the label referenced by `myLabel1` and returns a new reference. Now, `myLabel1` and `myLabel2` refer to two _separate_ labels, and changes to the label referenced by one of the variables do not affect the other:

```pine
//@version=6
indicator("Copied objects demo")

if barstate.islastconfirmedhistory
    // Create a new label and assign its reference to a variable.
    label myLabel1 = label.new(bar_index, 0, "First label", color = color.green, size = size.large)
    // Initialize a second variable using `label.copy(myLabel1)`. This variable now references an independent copy
    // of the initial label instead of pointing to the same object as `myLabel1`, and the script now displays two labels
    // on the chart.
    label myLabel2 = label.copy(myLabel1)

    // Now that `myLabel2` refers to a different `label` object than `myLabel1`, this call does not affect that object.
    label.set_color(myLabel1, color.red)
    // Likewise, these two calls do not affect the label referenced by `myLabel1`.
    label.set_style(myLabel2, label.style_label_up)
    label.set_text(myLabel2, "Second label")
```

### [Using ​`const`​ with reference types](../3. Language/language_type-system.md#using-const-with-reference-types)

Scripts can use the [const](../../reference manual/types/const.md) keyword when declaring variables of most [reference types](../3. Language/language_type-system.md#reference-types), except for [plot](../3. Language/language_type-system.md#plot-and-hline), [hline](../3. Language/language_type-system.md#plot-and-hline), and [user-defined types](../3. Language/language_type-system.md#user-defined-types). However, with reference types, the keyword behaves _differently_ than it does with [value types](../3. Language/language_type-system.md#value-types).

Recall that for a variable of a value type, the [const](../../reference manual/types/const.md) keyword directly _restricts_ the [qualifier](../3. Language/language_type-system.md#qualifiers) of that variable to “const”, _and_ it prevents the script from using the reassignment or compound assignment [operators](../3. Language/language_operators.md) to modify that variable — even if the assigned value from those operations is otherwise a constant.

For variables of reference types, using the [const](../../reference manual/types/const.md) keyword to declare them also prevents a script from reassigning those variables. However, in contrast to its behavior with value types, the keyword **does not** set the _qualifier_ of a reference-type variable to “const”. As explained in previous sections, reference types automatically inherit the “series” qualifier, because each call to a function that creates objects produces a _new_ object with a _unique_ reference — any call to the function in the code never returns the same object reference more than once.

For example, the script below creates an [array](../3. Language/language_arrays.md) of pseudorandom “float” values using [array.from()](../../reference manual/functions/array.from.md), and then assigns the returned reference to a variable declared using the [const](../../reference manual/types/const.md) keyword on each bar. During each execution, the [array.from()](../../reference manual/functions/array.from.md) call creates a _new array_ and returns a unique “series” reference. However, this script does _not_ cause an error, even though the variable’s _qualifier_ is “series”, because the variable’s assigned reference remains _consistent_ for the rest of each execution:

```pine
//@version=6
indicator("Using `const` with reference types demo")

//@variable Holds a reference to an array of three pseudorandom "float" values.
//          Although the variable is declared using `const`, the reference returned by `array.from()` has the "series"
//          qualifier, because each execution creates a new, unique array object. Additionally, all elements in the
//          array are of the type "series float".
//          This *does not* cause an error, because the script does not *reassign* the variable during any execution.
const array<float> randArray = array.from(math.random(), math.random(), math.random())

// Plot the sum of the `randArray` elements.
plot(randArray.sum())
```

However, if we use the [:=](../../reference manual/operators/:=.md) operator to reassign the `randArray` variable, a compilation error occurs, because the [const](../../reference manual/types/const.md) keyword prevents the script from assigning _another_ array reference to the variable during each execution. For example:

```pine
//@version=6
indicator("Invalid reassignment demo")

//@variable Holds a reference to an array of three pseudorandom "float" values.
//          Although the variable is declared using `const`, the reference returned by `array.from()` has the "series"
//          qualifier, because each execution creates a new, unique array object. Additionally, all elements in the
//          array are of the type "series float".
const array<float> randArray = array.from(math.random(), math.random(), math.random())

// This line causes an error, because the `const` keyword prevents reassignment operations on the `randArray` variable.
randArray := array.new<float>(3, 0.0)

// Plot the sum of the `randArray` elements.
plot(randArray.sum())
```

It’s important to note that the [const](../../reference manual/types/const.md) keyword _does not_ directly prevent a script from modifying a [collection](../3. Language/language_type-system.md#collections) or [drawing object](../3. Language/language_type-system.md#drawing-types) referenced by a variable or function parameter. Scripts can still use the available _setter functions_ to change that object’s data, because those functions _do not_ affect the identifier’s associated reference.

Below, we edited our script by including a call to [array.set()](../../reference manual/functions/array.set.md). The call sets the first element of the array referenced by `randArray` to 0. Although the contents of the array change _after_ each `randArray` declaration, the variable’s assigned reference does not, so no error occurs:

```pine
//@version=6
indicator("Valid modification demo")

//@variable Holds a reference to an array of three pseudorandom "float" values.
//          Although the variable is declared using `const`, the reference returned by `array.from()` has the "series"
//          qualifier, because each execution creates a new, unique array object. Additionally, all elements in the
//          array are of the type "series float".
const array<float> randArray = array.from(math.random(), math.random(), math.random())

// This line *does not* cause an error, even though it changes the array's contents, because `randArray` still refers
// to the *same* array instance for the rest of the execution.
array.set(randArray, 0, 0.0)

// Plot the sum of the `randArray` elements.
plot(randArray.sum())
```

[Previous 
**Execution model**](../3. Language/language_execution-model.md) [Next 
**Script structure**](../3. Language/language_script-structure.md)