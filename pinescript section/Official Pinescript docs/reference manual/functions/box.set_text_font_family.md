# box.set_text_font_family()

The function sets the font family of the text inside the box.

Syntax

```
box.set_text_font_family(id, text_font_family) → void
```

Arguments

id (series box) A box object.

text_font_family (series string) The font family of the text. Possible values: [font.family_default](https://www.tradingview.com/pine-script-reference/v6/#const_font.family_default), [font.family_monospace](https://www.tradingview.com/pine-script-reference/v6/#const_font.family_monospace).

Example

```
//@version=6
indicator("Example of setting the box font")
if barstate.islastconfirmedhistory
    b = box.new(bar_index, open-ta.tr, bar_index-50, open-ta.tr*5, text="monospace")
    box.set_text_font_family(b, font.family_monospace)
```

See also

[box.new()](https://www.tradingview.com/pine-script-reference/v6/#fun_box.new) [font.family_default](https://www.tradingview.com/pine-script-reference/v6/#const_font.family_default) [font.family_monospace](https://www.tradingview.com/pine-script-reference/v6/#const_font.family_monospace)
