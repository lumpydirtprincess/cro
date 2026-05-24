![](../2. Visuals/visuals_fills.md)

# [Fills](../2. Visuals/visuals_fills.md#fills)

## [Introduction](../2. Visuals/visuals_fills.md#introduction)

Some of Pine Script’s visual outputs, including
[plots](../3. Language/language_type-system.md#plot-and-hline),
[hlines](../3. Language/language_type-system.md#plot-and-hline), [lines](../2. Visuals/visuals_lines-and-boxes.md#lines), [boxes](../2. Visuals/visuals_lines-and-boxes.md#boxes), and
[polylines](../2. Visuals/visuals_lines-and-boxes.md#polylines),
allow one to fill the chart space they occupy with colors. Three
different mechanisms facilitate filling the space between such outputs:

- The
[fill()](../../reference manual/functions/fill.md)
function fills the space between two plots from
[plot()](../../reference manual/functions/plot.md)
calls or two horizontal lines (hlines) from
[hline()](../../reference manual/functions/hline.md)
calls with a specified color.
- Objects of the
[linefill](../../reference manual/types/linefill.md)
type fill the space between
[line](../../reference manual/types/line.md)
instances created with
[line.new()](../../reference manual/functions/line.new.md).
- Other drawing types, namely
[boxes](../2. Visuals/visuals_lines-and-boxes.md#boxes) and
[polylines](../2. Visuals/visuals_lines-and-boxes.md#polylines), have built-in properties that allow the drawings to
fill the visual spaces they occupy.

## [​`plot()`​ and ​`hline()`​ fills](../2. Visuals/visuals_fills.md#plot-and-hline-fills)

The
[fill()](../../reference manual/functions/fill.md)
function fills the space between two plots or horizontal lines. It has
the following two signatures:

```
fill(plot1, plot2, color, title, editable, show_last, fillgaps) → void

fill(hline1, hline2, color, title, editable, fillgaps) → void
```

The `plot1`, `plot2`, `hline1`, and `hline2` parameters accept
[plot](../3. Language/language_type-system.md#plot-and-hline)
or [hline](../3. Language/language_type-system.md#plot-and-hline) IDs returned by
[plot()](../../reference manual/functions/plot.md)
and
[hline()](../../reference manual/functions/hline.md)
function calls. The
[fill()](../../reference manual/functions/fill.md)
function is the only built-in that can use these IDs.

This simple example demonstrates how the
[fill()](../../reference manual/functions/fill.md)
function works with
[plot and hline](../3. Language/language_type-system.md#plot-and-hline) IDs. It calls
[plot()](../../reference manual/functions/plot.md)
and
[hline()](../../reference manual/functions/hline.md)
three times to display arbitrary values on the chart. Each of these
calls returns an ID, which the script assigns to variables for use in
the
[fill()](../../reference manual/functions/fill.md)
function. The values of `p1`, `p2`, and `p3` are “plot” IDs, whereas
`h1`, `h2`, and `h3` reference “hline” IDs:

![image](../images/Fills-Fill-1.D9hBk6j5_ahYBQ.webp)

```pine
//@version=6
indicator("Example 1")

// Assign "plot" IDs to the `p1`, `p2`, and `p3` variables.
p1 = plot(math.sin(high), "Sine of `high`")
p2 = plot(math.cos(low), "Cosine of `low`")
p3 = plot(math.sin(close), "Sine of `close`")
// Fill the space between `p1` and `p2` with 90% transparent red.
fill(p1, p3, color.new(color.red, 90), "`p1`-`p3` fill")
// Fill the space between `p2` and `p3` with 90% transparent blue.
fill(p2, p3, color.new(color.blue, 90), "`p2`-`p3` fill")

// Assign "hline" IDs to the `h1`, `h2`, and `h3` variables.
h1 = hline(0, "First level")
h2 = hline(1.0, "Second level")
h3 = hline(0.5, "Third level")
h4 = hline(1.5, "Fourth level")
// Fill the space between `h1` and `h2` with 90% transparent yellow.
fill(h1, h2, color.new(color.yellow, 90), "`h1`-`h2` fill")
// Fill the space between `h3` and `h4` with 90% transparent lime.
fill(h3, h4, color.new(color.lime, 90), "`h3`-`h4` fill")
```

It’s important to note that the
[fill()](../../reference manual/functions/fill.md)
function requires _either_ two “plot” IDs or two “hline” IDs. One
_cannot_ mix and match these types in the function call. Consequently,
programmers will sometimes need to use
[plot()](../../reference manual/functions/plot.md)
where they otherwise might have used
[hline()](../../reference manual/functions/hline.md)
if they want to fill the space between a consistent level and a
fluctuating series.

For example, this script calculates an `oscillator` based on the
percentage distance between the chart’s
[close](../../reference manual/variables/close.md)
price and the 10-bar moving average from a [ta.sma()](../../reference manual/functions/ta.sma.md) call,
then plots it on the chart pane. In this case, we wanted to fill the
area between the `oscillator` and zero. Although we can display the zero
level with
[hline()](../../reference manual/functions/hline.md)
since its value does not change, we cannot pass a “plot” and “hline”
ID to the
[fill()](../../reference manual/functions/fill.md)
function. Therefore, we must use a
[plot()](../../reference manual/functions/plot.md)
call for the level to allow the script to fill the space:

![image](../images/Fills-Fill-2.DlLq_93-_1Mqk2m.webp)

```pine
//@version=6
indicator("Example 2")

//@variable The 10-bar moving average of `close` prices.
float ma = ta.sma(close, 10)
//@variable The distance from the `ma` to the `close` price, as a percentage of the `ma`.
float oscillator = 100 * (ma - close) / ma

//@variable The ID of the `oscillator` plot for use in the `fill()` function.
oscPlotID = plot(oscillator, "Oscillator")
//@variable The ID of the zero level plot for use in the `fill()` function.
//          Requires a "plot" ID since the `fill()` function can't use "plot" and "hline" IDs at the same time.
zeroPlotID = plot(0, "Zero level", color.silver, 1, plot.style_circles)

// Filll the space between the `oscPlotID` and `zeroPlotID` with 90% transparent blue.
fill(oscPlotID, zeroPlotID, color.new(color.blue, 90), "Oscillator fill")
```

The `color` parameter of the
[fill()](../../reference manual/functions/fill.md)
function accepts a “series color” argument, meaning the fill’s color
can change across chart bars. For example, this code fills the space
between two moving average plots with 90% transparent green or red
colors based on whether `ma1` is above `ma2`:

![image](../images/Fills-Fill-3.CN7oIx5s_Z10IO51.webp)

```pine
//@version=6
indicator("Example 3", overlay = true)

//@variable The 5-bar moving average of `close` prices.
float ma1 = ta.sma(close, 5)
//@variable The 20-bar moving average of `close` prices.
float ma2 = ta.sma(close, 20)

//@variable The 90% transparent color of the space between MA plots. Green if `ma1 > ma2`, red otherwise.
color fillColor = ma1 > ma2 ? color.new(color.green, 90) : color.new(color.red, 90)

//@variable The ID of the `ma1` plot for use in the `fill()` function.
ma1PlotID = plot(ma1, "5-bar SMA")
//@variable The ID of the `ma2` plot for use in the `fill()` function.
ma2PlotID = plot(ma2, "20-bar SMA")

// Fill the space between the `ma1PlotID` and `ma2PlotID` using the `fillColor`.
fill(ma1PlotID, ma2PlotID, fillColor, "SMA plot fill")
```

## [Line fills](../2. Visuals/visuals_fills.md#line-fills)

While the
[fill()](../../reference manual/functions/fill.md)
function allows a script to fill the space between two
[plots or hlines](../3. Language/language_type-system.md#plot-and-hline), it does not work with
[line](../../reference manual/types/line.md)
objects. When a script needs to fill the space between
[lines](../2. Visuals/visuals_lines-and-boxes.md#lines), it
requires a
[linefill](../../reference manual/types/linefill.md)
object created by the
[linefill.new()](../../reference manual/functions/linefill.new.md)
function. The function has the following signature:

```
linefill.new(line1, line2, color) → series linefill
```

The `line1` and `line2` parameters accept
[line](../../reference manual/types/line.md)
IDs. These IDs determine the chart region that the
[linefill](../../reference manual/types/linefill.md)
object will fill with its specified `color`. A script can update the
`color` property of a
[linefill](../../reference manual/types/linefill.md)
ID returned by this function by calling
[linefill.set\_color()](../../reference manual/functions/linefill.set_color.md)
with the ID as its `id` argument.

The behavior of linefills depends on the lines they reference. Scripts
cannot move linefills directly, as the lines that a linefill uses
determine the space it will fill. To retrieve the IDs of the
[lines](../2. Visuals/visuals_lines-and-boxes.md#lines)
referenced by a
[linefill](../../reference manual/types/linefill.md)
object, use the
[linefill.get\_line1()](../../reference manual/functions/linefill.get_line1.md)
and
[linefill.get\_line2()](../../reference manual/functions/linefill.get_line2.md)
functions.

Any pair of
[line](../../reference manual/types/line.md)
instances can only have _one_ [linefill](../../reference manual/types/linefill.md)
between them. Successive calls to
[linefill.new()](../../reference manual/functions/linefill.new.md)
using the same `line1` and `line2` arguments will create a new
[linefill](../../reference manual/types/linefill.md)
ID that _replaces_ the previous one associated with them.

The example below demonstrates a simple use case for linefills. The
script calculates a `pivotHigh` and `pivotLow` series using the built-in
[ta.pivothigh()](../../reference manual/functions/ta.pivothigh.md)
and
[ta.pivotlow()](../../reference manual/functions/ta.pivotlow.md)
functions with constant `leftbars` and `rightbars` arguments. On the
last confirmed historical bar, the script draws two extended lines. The
first line connects the two most recent non-na `pivotHigh` values, and
the second connects the most recent non-na `pivotLow` values.

To emphasize the “channel” formed by these lines, the script fills the
space between them using
[linefill.new()](../../reference manual/functions/linefill.new.md):

![image](../images/Fills-Linefill-01.CW8L9l90_16hnnH.webp)

```pine
//@version=6
indicator("Linefill demo", "Channel", true)

//@variable The number bars to the left of a detected pivot.
int LEFT_BARS = 15
//@variable The number bars to the right for pivot confirmation.
int RIGHT_BARS = 5

//@variable The price of the pivot high point.
float pivotHigh = ta.pivothigh(LEFT_BARS, RIGHT_BARS)
//@variable The price of the pivot low point.
float pivotLow = ta.pivotlow(LEFT_BARS, RIGHT_BARS)

// Initialize the chart points the lines will use.
var firstHighPoint  = chart.point.new(na, na, na)
var secondHighPoint = chart.point.new(na, na, na)
var firstLowPoint   = chart.point.new(na, na, na)
var secondLowPoint  = chart.point.new(na, na, na)

// Update the `firstHighPoint` and `secondHighPoint` when `pivotHigh` is not `na`.
if not na(pivotHigh)
    firstHighPoint  := secondHighPoint
    secondHighPoint := chart.point.from_index(bar_index - RIGHT_BARS, pivotHigh)
// Update the `firstLowPoint` and `secondLowPoint` when `pivotlow` is not `na`.
if not na(pivotLow)
    firstLowPoint  := secondLowPoint
    secondLowPoint := chart.point.from_index(bar_index - RIGHT_BARS, pivotLow)

if barstate.islastconfirmedhistory
    //@variable An extended line that passes through the `firstHighPoint` and `secondHighPoint`.
    line pivotHighLine = line.new(firstHighPoint, secondHighPoint, extend = extend.right)
    //@variable An extended line that passes through the `firstLowPoint` and `secondLowPoint`.
    line pivotLowLine = line.new(firstLowPoint, secondLowPoint, extend = extend.right)
    //@variable The color of the space between the lines.
    color fillColor = switch
        secondHighPoint.price > firstHighPoint.price and secondLowPoint.price > firstLowPoint.price => color.lime
        secondHighPoint.price < firstHighPoint.price and secondLowPoint.price < firstLowPoint.price => color.red
        =>                                                                                             color.silver
    //@variable A linefill that colors the space between the `pivotHighLine` and `pivotLowLine`.
    linefill channelFill = linefill.new(pivotHighLine, pivotLowLine, color.new(fillColor, 90))
```

## [Box and polyline fills](../2. Visuals/visuals_fills.md#box-and-polyline-fills)

The
[box](../../reference manual/types/box.md)
and
[polyline](../../reference manual/types/polyline.md)
types allow scripts to draw geometric shapes and other formations on the
chart. Scripts create
[boxes](../2. Visuals/visuals_lines-and-boxes.md#boxes) and
[polylines](../2. Visuals/visuals_lines-and-boxes.md#polylines)
with the
[box.new()](../../reference manual/functions/box.new.md)
and
[polyline.new()](../../reference manual/functions/polyline.new.md)
functions, which include parameters that allow the drawings to fill
their visual spaces.

To fill the space inside the borders of a
[box](../../reference manual/types/box.md)
with a specified color, include a `bgcolor` argument in the
[box.new()](../../reference manual/functions/box.new.md)
function. To fill a polyline’s visual space, pass a `fill_color`
argument to the
[polyline.new()](../../reference manual/functions/polyline.new.md)
function.

For example, this script draws an octagon with a
[polyline](../../reference manual/types/polyline.md)
and an inscribed rectangle with a
[box](../../reference manual/types/box.md) on
the last confirmed historical bar. It determines the size of the
drawings using the value from the `radius` variable, which corresponds
to approximately one-fourth of the number of bars visible on the chart.
We included `fill_color = color.new(color.blue, 60)` in the
[polyline.new()](../../reference manual/functions/polyline.new.md)
call to fill the octagon with a translucent blue color, and we used
`bgcolor = color.purple` in the
[box.new()](../../reference manual/functions/box.new.md)
call to fill the inscribed rectangle with opaque purple:

![image](../images/Fills-Box-and-polyline-fills-1.FVYvEaBt_nQBVz.webp)

```pine
//@version=6
indicator("Box and polyline fills demo")

//@variable The number of visible chart bars, excluding the leftmost and rightmost bars.
var int barCount = 0
if time > chart.left_visible_bar_time and time < chart.right_visible_bar_time
    barCount += 1

//@variable The approximate radius used to calculate the octagon and rectangle coordinates.
int radius = math.ceil(barCount / 4)

if barstate.islastconfirmedhistory
    //@variable An array of chart points. The polyline uses all points in this array, but the box only needs two.
    array<chart.point> points = array.new<chart.point>()
    //@variable The counterclockwise angle of each point, in radians. Updates on each loop iteration.
    float angle = 0.0
    //@variable The radians to add to the `angle` on each loop iteration.
    float increment = 0.25 * math.pi
    // Loop 8 times to calculate octagonal points.
    for i = 0 to 7
        //@variable The point's x-coordinate (bar offset).
        int x = int(math.round(math.cos(angle) * radius))
        //@variable The point's y-coordinate.
        float y = math.round(math.sin(angle) * radius)
        // Push a new chart point into the `points` array and increase the `angle`.
        points.push(chart.point.from_index(bar_index - radius + x, y))
        angle += increment
    // Create a closed polyline to draw the octagon and fill it with translucent blue.
    polyline.new(points, closed = true, fill_color = color.new(color.blue, 60))
    // Create a box for the rectangle using index 3 and 7 for the top-left and bottom-right corners,
    // and fill it with opaque purple.
    box.new(points.get(3), points.get(7), bgcolor = color.purple)
```

See this manual’s
[Lines and boxes](../2. Visuals/visuals_lines-and-boxes.md) page
to learn more about working with these types.

[Previous 
**Colors**](../2. Visuals/visuals_colors.md) [Next 
**Levels**](../2. Visuals/visuals_levels.md)