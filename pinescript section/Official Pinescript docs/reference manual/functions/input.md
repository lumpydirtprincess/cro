# input()

6 overloads

Adds an input to the Inputs tab of your script's Settings, which allows you to provide configuration options to script users. This function automatically detects the type of the argument used for 'defval' and uses the corresponding input widget.

Syntax & Overloads

[```\\
input(defval, title, tooltip, inline, group, display, active) → input color\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_input-0) [```\\
input(defval, title, tooltip, inline, group, display, active) → input string\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_input-1) [```\\
input(defval, title, tooltip, inline, group, display, active) → input int\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_input-2) [```\\
input(defval, title, tooltip, inline, group, display, active) → input float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_input-3) [```\\
input(defval, title, inline, group, tooltip, display, active) → series float\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_input-4) [```\\
input(defval, title, tooltip, inline, group, display, active) → input bool\\
```](https://www.tradingview.com/pine-script-reference/v6/#fun_input-5)

Arguments

defval (const int/float/bool/string/color or source-type built-ins) Determines the default value of the input variable proposed in the script's "Settings/Inputs" tab, from where script users can change it. Source-type built-ins are built-in series float variables that specify the source of the calculation: `close`, `hlc3`, etc.

title (const string) Title of the input. If not specified, the variable name is used as the input's title. If the title is specified, but it is empty, the name will be an empty string.

tooltip (const string) The string that will be shown to the user when hovering over the tooltip icon.

inline (const string) Combines all the input calls using the same argument in one line. The string used as an argument is not displayed. It is only used to identify inputs belonging to the same line.

group (const string) Creates a header above all inputs using the same group argument string. The string is also used as the header's text.

display (const plot_display) Controls where the script will display the input's information, aside from within the script's settings. This option allows one to remove a specific input from the script's status line or the Data Window to ensure only the most necessary inputs are displayed there. Possible values: [display.none](https://www.tradingview.com/pine-script-reference/v6/#const_display.none), [display.data_window](https://www.tradingview.com/pine-script-reference/v6/#const_display.data_window), [display.status_line](https://www.tradingview.com/pine-script-reference/v6/#const_display.status_line), [display.all](https://www.tradingview.com/pine-script-reference/v6/#const_display.all). Optional. The default depends on the type of the value passed to `defval`: [display.none](https://www.tradingview.com/pine-script-reference/v6/#const_display.none) for [bool](https://www.tradingview.com/pine-script-reference/v6/#type_bool) and [color](https://www.tradingview.com/pine-script-reference/v6/#type_color) values, [display.all](https://www.tradingview.com/pine-script-reference/v6/#const_display.all) for everything else.

active (input bool) Optional. Specifies whether users can change the value of the input in the script's "Settings/Inputs" tab. The script can use this parameter to set the state of the input based on the values of other inputs. If [true](https://www.tradingview.com/pine-script-reference/v6/#const_true), users can change the value of the input. If [false](https://www.tradingview.com/pine-script-reference/v6/#const_false), the input is grayed out, and users cannot change the value. The default is [true](https://www.tradingview.com/pine-script-reference/v6/#const_true).

Example

```
//@version=6
indicator("input", overlay=true)
i_switch = input(true, "On/Off")
plot(i_switch ? open : na)

i_len = input(7, "Length")
i_src = input(close, "Source")
plot(ta.sma(i_src, i_len))

i_border = input(142.50, "Price Border")
hline(i_border)
bgcolor(close > i_border ? color.green : color.red)

i_col = input(color.red, "Plot Color")
plot(close, color=i_col)

i_text = input("Hello!", "Message")
l = label.new(bar_index, high, text=i_text)
label.delete(l[1])
```

Returns

Value of input variable.

Remarks

Result of [input()](https://www.tradingview.com/pine-script-reference/v6/#fun_input) function always should be assigned to a variable, see examples above.

See also

[input.bool()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.bool) [input.color()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.color) [input.int()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.int) [input.float()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.float) [input.string()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.string) [input.symbol()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.symbol) [input.timeframe()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.timeframe) [input.text_area()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.text_area) [input.session()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.session) [input.source()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.source) [input.time()](https://www.tradingview.com/pine-script-reference/v6/#fun_input.time)
