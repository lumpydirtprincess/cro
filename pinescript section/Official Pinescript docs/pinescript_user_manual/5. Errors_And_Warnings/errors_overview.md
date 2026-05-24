![](../5. Errors_And_Warnings/errors_overview.md)

# [Overview](../5. Errors_And_Warnings/errors_overview.md#overview)

## [Introduction](../5. Errors_And_Warnings/errors_overview.md#introduction)

Pine Script® uses _runtime errors_, _compilation errors_, and _compiler warnings_ to help prevent unintended or erroneous script behaviors:

- Runtime errors occur under specific conditions as a script runs on a dataset. If a script encounters a runtime error while it executes on the chart, it _stops_ executing and displays a red “exclamation point” icon in the _status line_. The user can click the icon to view the error message and the bar index on which the error occurred. Pine includes built-in runtime errors for invalid arguments in function calls, history-referencing operations with invalid offsets, and various other error conditions. Programmers can also define custom runtime errors for specific conditions in their scripts by using the [runtime.error()](../../reference manual/functions/runtime.error.md) function.

- Compilation errors occur at compile time, _before_ a script begins to run on a dataset. If a script contains _invalid syntax_ or other issues that _prevent_ compilation, the Pine Editor highlights the problematic code in red and displays an error message to indicate the cause. If the script is on the chart, users can also access the error message from the script’s status line.

- Compiler warnings also occur before a script begins to run. In contrast to compilation errors, these warnings inform users about syntax that does _not_ prevent compilation but can cause _unintended_ results or behaviors. They can also occur for other reasons, such as using deprecated features or old Pine Script versions. The Pine Editor highlights code that causes a warning in orange, then displays a message outlining the issue and potential solutions. We recommend following the suggestions in compiler warnings to help ensure that a script works as intended.


This page provides an overview of the common runtime errors, compilation errors, and warnings described in the User Manual’s “Errors and warnings” section.

## [Error reference table](../5. Errors_And_Warnings/errors_overview.md#error-reference-table)

The reference table below lists the current errors and warnings documented in this section of the User Manual. The codes in the “Error/warning code” column link to the pages that contain detailed information about the issues and possible solutions.

| Error/warning code | Message | Solution |
| --- | --- | --- |
| [CE10101](../5. Errors_And_Warnings/errors_ce10101.md) | The condition of the “X” statement must evaluate to a “bool” value. | Use only expressions that return values of the [“bool” type](../3. Language/language_type-system.md#bool) as the conditions in [if](../../reference manual/keywords/if.md) and [switch](../../reference manual/keywords/switch.md) statements. |
| [CW10003](../5. Errors_And_Warnings/errors_cw10003.md) | The function “X” should be called on each calculation for consistency. It is recommended to extract the call from this scope. | The function call might cause _unintended results_ when executing inside a [conditional structure](../3. Language/language_conditional-structures.md) or [loop](../3. Language/language_loops.md) because it relies on data from _past bars_. Move the call to the _global scope_, and outside conditional expressions, to ensure consistent history-based calculations. |
| [RE10139](../5. Errors_And_Warnings/errors_re10139.md) | Memory limits exceeded. | There are multiple possible causes and solutions. A common cause is using `request.*()` calls to request large [collections](../3. Language/language_collections.md) of data across bars. The usual solution for that case is to optimize the requests to return collection IDs only when **necessary**. Consult the error page to learn more. |
| [RE10143](../5. Errors_And_Warnings/errors_re10143.md) | The requested historical offset (X) is beyond the historical buffer’s limit (Y). | This error occurs if a script references the history of a variable or expression from _too many_ bars back. A typical solution is to use the [max\_bars\_back()](../../reference manual/functions/max_bars_back.md) function to specify how many past bars of data to include in the [historical buffer](../3. Language/language_execution-model.md#historical-buffers) for the referenced series. |

[Next 
**CE10101**](../5. Errors_And_Warnings/errors_ce10101.md)