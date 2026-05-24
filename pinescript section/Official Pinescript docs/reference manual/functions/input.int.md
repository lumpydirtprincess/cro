# input.int()

2 overloads

Adds an input to the Inputs tab of your script's Settings, which allows you to provide configuration options to script users. This function adds a field for an integer input to the script's inputs.

Syntax & Overloads

[```\\
input.int(defval, title, options, tooltip, inline, group, confirm, display, active) → input int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_input.int-0) [```\\
input.int(defval, title, minval, maxval, step, tooltip, inline, group, confirm, display, active) → input int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_input.int-1)

Arguments

defval (const int) Determines the default value of the input variable proposed in the script's "Settings/Inputs" tab, from where script users can change it. When a list of values is used with the `options` parameter, the value must be one of them.

title (const string) Title of the input. If not specified, the variable name is used as the input's title. If the title is specified, but it is empty, the name will be an empty string.

options (tuple of const int values: \[val1, val2, ...\]) A list of options to choose from a dropdown menu, separated by commas and enclosed in square brackets: \[val1, val2, ...\]. When using this parameter, the `minval`, `maxval` and `step` parameters cannot be used.

tooltip (const string) The string that will be shown to the user when hovering over the tooltip icon.

inline (const string) Combines all the input calls using the same argument in one line. The string used as an argument is not displayed. It is only used to identify inputs belonging to the same line.

group (const string) Creates a header above all inputs using the same group argument string. The string is also used as the header's text.

confirm (const bool) If true, then user will be asked to confirm input value before indicator is added to chart. Default value is false.

display (const plot_display) Controls where the script will display the input's information, aside from within the script's settings. This option allows one to remove a specific input from the script's status line or the Data Window to ensure only the most necessary inputs are displayed there. Possible values: [display.none](https://www.tradingview.com/pine-script-reference/v6/#const_display.none), [display.data_window](https://www.tradingview.com/pine-script-reference/v6/#const_display.data_window), [display.status_line](https://www.tradingview.com/pine-script-reference/v6/#const_display.status_line), [display.all](https://www.tradingview.com/pine-script-reference/v6/#const_display.all). Optional. The default is [display.all](https://www.tradingview.com/pine-script-reference/v6/#const_display.all).

active (input bool) Optional. Specifies whether users can change the value of the input in the script's "Settings/Inputs" tab. The script can use this parameter to set the state of the input based on the values of other inputs. If [true](https://www.tradingview.com/pine-script-reference/v6/#const_true), users can change the value of the input. If [false](https://www.tradingview.com/pine-script-reference/v6/#const_false), the input is grayed out, and users cannot change the value. The default is [true](https://www.tradingview.com/pine-script-reference/v6/#const_true).

Example

```
//@version=6
indicator("input.int", overlay=true)
i_len1 = input.int(10, "Length 1", minval=5, maxval=21, step=1)
plot(ta.sma(close, i_len1))

i_len2 = input.int(10, "Length 2", options=[5, 10, 21])
plot(ta.sma(close, i_len2))
```

Returns

Value of input variable.

Remarks

Result of [input.int()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.int) function always should be assigned to a variable, see examples above.

See also

[input.bool()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.bool) [input.float()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.float) [input.string()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.string) [input.text_area()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.text_area) [input.symbol()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.symbol) [input.timeframe()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.timeframe) [input.session()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.session) [input.source()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.source) [input.color()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.color) [input.time()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.time) [input()](https://www.tradingview.com/pine-script-reference/v6/#fun_input)
