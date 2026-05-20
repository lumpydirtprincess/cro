# Pine Script v6 - Complete Arrays & Matrices Guide
## Master Data Collections for Advanced Trading Strategies

**Version:** 6
**Last Updated:** December 2025
**Companion to:** Advanced Strategy Guide

---

## Table of Contents

1. [Arrays Fundamentals](#arrays-fundamentals)
2. [Array Creation & Initialization](#array-creation)
3. [Array Manipulation](#array-manipulation)
4. [Array Searching & Sorting](#array-searching)
5. [Statistical Functions](#statistical-functions)
6. [Advanced Array Patterns](#advanced-patterns)
7. [Matrix Operations](#matrix-operations)
8. [Practical Applications](#practical-applications)
9. [Performance Optimization](#performance)
10. [Real-World Examples](#examples)

---

<a name="arrays-fundamentals"></a>
## 1. Arrays Fundamentals

### What Are Arrays?

Arrays in Pine Script are one-dimensional collections that can store multiple values of the **same type**. They're essential for:
- Storing historical data beyond `[]` operator limits
- Complex calculations requiring iteration
- Building custom indicators with lookback periods
- Statistical analysis
- Pattern recognition

### Array Characteristics

```pinescript
//@version=6
indicator("Array Fundamentals", overlay=false)

// Arrays are REFERENCES, not values
prices1 = array.new<float>(5, close)  // Creates new array
prices2 = prices1                      // prices2 references SAME array
array.push(prices2, high)              // Modifies BOTH prices1 and prices2!

// Array types must be specified
intArray = array.new<int>()
floatArray = array.new<float>()
boolArray = array.new<bool>()
stringArray = array.new<string>()
colorArray = array.new<color>()

// Can also store drawing objects
lineArray = array.new<line>()
labelArray = array.new<label>()
boxArray = array.new<box>()

// User-defined types
type MyType
    float price
    int volume

myArray = array.new<MyType>()
```

---

<a name="array-creation"></a>
## 2. Array Creation & Initialization

### All Creation Methods

```pinescript
//@version=6
indicator("Array Creation", overlay=false)

// ═══════════════════════════════════════════════════════════
// METHOD 1: array.new<type>()
// ═══════════════════════════════════════════════════════════

// Empty array
emptyArray = array.new<float>()

// Array with size, default value
filledArray = array.new<float>(10, 0.0)  // 10 elements, all = 0.0

// Size only (elements are na)
naArray = array.new<int>(5)  // [na, na, na, na, na]

// ═══════════════════════════════════════════════════════════
// METHOD 2: array.from()
// ═══════════════════════════════════════════════════════════

// Create from values
prices = array.from(100.5, 101.2, 99.8, 102.3)

// Mixed expressions
values = array.from(close, open, high, low, hl2)

// Can use variables
sma20 = ta.sma(close, 20)
ema20 = ta.ema(close, 20)
indicators = array.from(sma20, ema20, close)

// ═══════════════════════════════════════════════════════════
// METHOD 3: Dynamic population
// ═══════════════════════════════════════════════════════════

var dynamicArray = array.new<float>()

// Add elements over time
if barstate.isnew
    array.push(dynamicArray, close)

    // Limit size
    if array.size(dynamicArray) > 100
        array.shift(dynamicArray)  // Remove oldest

// ═══════════════════════════════════════════════════════════
// METHOD 4: Copy from existing array
// ═══════════════════════════════════════════════════════════

original = array.from(1, 2, 3, 4, 5)

// Shallow copy (creates new array with same values)
copy = array.copy(original)
array.push(copy, 6)  // Doesn't affect original

// ═══════════════════════════════════════════════════════════
// METHOD 5: Historical data collection
// ═══════════════════════════════════════════════════════════

//@function Collect last N bars of data
//@param src Source series
//@param len Number of bars
//@returns Array of historical values
collectHistory(series float src, simple int len) =>
    var arr = array.new<float>()

    if barstate.isfirst
        // Initialize with historical data
        for i = len - 1 to 0
            array.push(arr, src[i])
    else
        // Rolling update
        array.push(arr, src)
        if array.size(arr) > len
            array.shift(arr)

    arr

last20Closes = collectHistory(close, 20)

// Display array contents
if barstate.islast
    debugText = "Array values:\n"
    for i = 0 to math.min(array.size(last20Closes) - 1, 9)
        debugText += str.tostring(array.get(last20Closes, i), "#.##") + "\n"

    var label debugLabel = label.new(bar_index, high, debugText,
        style=label.style_label_left, color=color.blue, textcolor=color.white)
    label.set_xy(debugLabel, bar_index, high)
    label.set_text(debugLabel, debugText)
```

---

<a name="array-manipulation"></a>
## 3. Array Manipulation

### Complete Array Operations Reference

```pinescript
//@version=6
indicator("Array Manipulation", overlay=false)

var testArray = array.from(10, 20, 30, 40, 50)

// ═══════════════════════════════════════════════════════════
// ADDING ELEMENTS
// ═══════════════════════════════════════════════════════════

// Add to end
array.push(testArray, 60)  // [10, 20, 30, 40, 50, 60]

// Add to beginning
array.unshift(testArray, 5)  // [5, 10, 20, 30, 40, 50, 60]

// Insert at specific index
array.insert(testArray, 3, 25)  // [5, 10, 20, 25, 30, 40, 50, 60]

// Add multiple elements
array.concat(testArray, array.from(70, 80, 90))

// ═══════════════════════════════════════════════════════════
// REMOVING ELEMENTS
// ═══════════════════════════════════════════════════════════

// Remove from end
lastValue = array.pop(testArray)  // Returns and removes last element

// Remove from beginning
firstValue = array.shift(testArray)  // Returns and removes first element

// Remove at index
removedValue = array.remove(testArray, 5)  // Remove element at index 5

// Remove all elements
array.clear(testArray)  // Now empty

// ═══════════════════════════════════════════════════════════
// ACCESSING ELEMENTS
// ═══════════════════════════════════════════════════════════

prices = array.from(100, 101, 102, 103, 104)

// Get element (doesn't modify array)
price0 = array.get(prices, 0)  // 100
price4 = array.get(prices, 4)  // 104

// Set element (modifies array)
array.set(prices, 2, 999)  // [100, 101, 999, 103, 104]

// Get first/last (convenience methods)
firstPrice = array.first(prices)  // 100
lastPrice = array.last(prices)    // 104

// ═══════════════════════════════════════════════════════════
// ARRAY INFORMATION
// ═══════════════════════════════════════════════════════════

// Size
arraySize = array.size(prices)  // 5

// Check if includes value
hasValue = array.includes(prices, 999)  // true

// Find index of value
indexOfValue = array.indexof(prices, 999)  // 2 (returns -1 if not found)

// Find last occurrence
lastIndex = array.lastindexof(prices, 101)  // 1

// ═══════════════════════════════════════════════════════════
// SLICING & SUBSETS
// ═══════════════════════════════════════════════════════════

original = array.from(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

// Get slice (from_index, to_index)
slice = array.slice(original, 2, 5)  // [3, 4, 5] (indices 2, 3, 4)

// Reverse array
reversed = array.reverse(array.copy(original))  // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

// Fill with value
filled = array.new<int>(10)
array.fill(filled, 42)  // [42, 42, 42, 42, 42, 42, 42, 42, 42, 42]

// Fill range
rangeArray = array.new<int>(10)
array.fill(rangeArray, 99, 3, 7)  // Only indices 3-6 filled with 99

// ═══════════════════════════════════════════════════════════
// ITERATION PATTERNS
// ═══════════════════════════════════════════════════════════

data = array.from(5, 10, 15, 20, 25)

// Pattern 1: for loop with index
sum1 = 0.0
for i = 0 to array.size(data) - 1
    sum1 += array.get(data, i)

// Pattern 2: for...in loop
sum2 = 0.0
for value in data
    sum2 += value

// Pattern 3: while loop
sum3 = 0.0
i = 0
while i < array.size(data)
    sum3 += array.get(data, i)
    i += 1

// ═══════════════════════════════════════════════════════════
// ADVANCED: FILTERING & TRANSFORMATION
// ═══════════════════════════════════════════════════════════

//@function Filter array by condition
//@param arr Source array
//@returns New array with only values > threshold
filterGreaterThan(array<float> arr, float threshold) =>
    result = array.new<float>()
    for value in arr
        if value > threshold
            array.push(result, value)
    result

//@function Map function to all elements
//@param arr Source array
//@returns New array with function applied
mapDouble(array<float> arr) =>
    result = array.new<float>()
    for value in arr
        array.push(result, value * 2)
    result

//@function Reduce array to single value
//@param arr Source array
//@returns Product of all elements
reduceProduct(array<float> arr) =>
    product = 1.0
    for value in arr
        product *= value
    product

// Examples
numbers = array.from(1.0, 2.0, 3.0, 4.0, 5.0)
filtered = filterGreaterThan(numbers, 2.5)  // [3.0, 4.0, 5.0]
doubled = mapDouble(numbers)                 // [2.0, 4.0, 6.0, 8.0, 10.0]
product = reduceProduct(numbers)             // 120.0
```

---

<a name="array-searching"></a>
## 4. Array Searching & Sorting

```pinescript
//@version=6
indicator("Array Searching & Sorting", overlay=false)

// ═══════════════════════════════════════════════════════════
// SORTING
// ═══════════════════════════════════════════════════════════

prices = array.from(50.5, 48.2, 52.1, 49.0, 51.3)

// Sort ascending (modifies original)
array.sort(prices, order.ascending)  // [48.2, 49.0, 50.5, 51.3, 52.1]

// Sort descending
array.sort(prices, order.descending) // [52.1, 51.3, 50.5, 49.0, 48.2]

// Sort and get sorted indices
pricesOriginal = array.from(50.5, 48.2, 52.1, 49.0, 51.3)
indices = array.sort_indices(pricesOriginal, order.ascending)
// indices = [1, 3, 0, 4, 2] (original positions of sorted elements)

// ═══════════════════════════════════════════════════════════
// BINARY SEARCH (Array must be sorted!)
// ═══════════════════════════════════════════════════════════

sortedPrices = array.from(10, 20, 30, 40, 50, 60, 70, 80, 90, 100)

// Find exact value
index = array.binary_search(sortedPrices, 50)  // Returns 4

// Value not found returns -(insertion_point) - 1
notFoundIndex = array.binary_search(sortedPrices, 45)  // Returns -5
// Insertion point would be index 4

// ═══════════════════════════════════════════════════════════
// FINDING MIN/MAX
// ═══════════════════════════════════════════════════════════

values = array.from(15, 32, 8, 45, 23, 12)

// Min value
minValue = array.min(values)  // 8

// Max value
maxValue = array.max(values)  // 45

// Range
range = maxValue - minValue   // 37

// Index of min
minIndex = array.indexof(values, array.min(values))  // 2

// Index of max
maxIndex = array.indexof(values, array.max(values))  // 3

// ═══════════════════════════════════════════════════════════
// ADVANCED SEARCH PATTERNS
// ═══════════════════════════════════════════════════════════

//@function Find first element matching condition
//@param arr Array to search
//@param threshold Comparison value
//@returns Index of first match, -1 if none
findFirstAbove(array<float> arr, float threshold) =>
    for i = 0 to array.size(arr) - 1
        if array.get(arr, i) > threshold
            i
            break
    -1  // Not found

//@function Find all indices matching condition
//@param arr Array to search
//@param threshold Comparison value
//@returns Array of indices
findAllAbove(array<float> arr, float threshold) =>
    result = array.new<int>()
    for i = 0 to array.size(arr) - 1
        if array.get(arr, i) > threshold
            array.push(result, i)
    result

//@function Find N largest values
//@param arr Source array
//@param n Number of values to find
//@returns Array of N largest values
findNLargest(array<float> arr, int n) =>
    sorted = array.copy(arr)
    array.sort(sorted, order.descending)
    array.slice(sorted, 0, math.min(n, array.size(sorted)))

//@function Find N smallest values
//@param arr Source array
//@param n Number of values to find
//@returns Array of N smallest values
findNSmallest(array<float> arr, int n) =>
    sorted = array.copy(arr)
    array.sort(sorted, order.ascending)
    array.slice(sorted, 0, math.min(n, array.size(sorted)))

// Examples
testData = array.from(45, 23, 67, 12, 89, 34, 56, 78, 90, 11)

firstAbove50 = findFirstAbove(testData, 50)  // Returns 2 (value 67)
allAbove50 = findAllAbove(testData, 50)      // Returns [2, 4, 6, 7, 8]
top3 = findNLargest(testData, 3)             // Returns [90, 89, 78]
bottom3 = findNSmallest(testData, 3)         // Returns [11, 12, 23]

// ═══════════════════════════════════════════════════════════
// PERCENTILE & QUANTILE
// ═══════════════════════════════════════════════════════════

//@function Calculate percentile value
//@param arr Source array
//@param percentile Percentile to find (0-100)
//@returns Value at percentile
calcPercentile(array<float> arr, float percentile) =>
    sorted = array.copy(arr)
    array.sort(sorted, order.ascending)
    index = math.floor((array.size(sorted) - 1) * (percentile / 100))
    array.get(sorted, index)

data = array.from(10, 20, 30, 40, 50, 60, 70, 80, 90, 100)

p25 = calcPercentile(data, 25)   // 25th percentile: 32.5
p50 = calcPercentile(data, 50)   // Median: 55
p75 = calcPercentile(data, 75)   // 75th percentile: 77.5
p95 = calcPercentile(data, 95)   // 95th percentile: 95.5
```

---

<a name="statistical-functions"></a>
## 5. Statistical Functions

```pinescript
//@version=6
indicator("Array Statistical Functions", overlay=false)

// ═══════════════════════════════════════════════════════════
// BUILT-IN STATISTICAL FUNCTIONS
// ═══════════════════════════════════════════════════════════

data = array.from(10, 20, 15, 25, 30, 18, 22, 28, 16, 24)

// Sum
total = array.sum(data)  // 208

// Average (mean)
average = array.avg(data)  // 20.8

// Standard deviation
stdDev = array.stdev(data)  // ~6.04

// Variance
variance = array.variance(data)  // ~36.56

// Minimum
minimum = array.min(data)  // 10

// Maximum
maximum = array.max(data)  // 30

// Range
dataRange = array.range(data)  // 20 (max - min)

// Median
median = array.median(data)  // 21 (middle value)

// Mode (most frequent value)
mode = array.mode(data)  // May return na if no repeated values

// ═══════════════════════════════════════════════════════════
// CUSTOM STATISTICAL FUNCTIONS
// ═══════════════════════════════════════════════════════════

//@function Calculate mean absolute deviation
//@param arr Source array
//@returns MAD value
calcMAD(array<float> arr) =>
    mean = array.avg(arr)
    sumDev = 0.0
    for value in arr
        sumDev += math.abs(value - mean)
    sumDev / array.size(arr)

//@function Calculate coefficient of variation
//@param arr Source array
//@returns CV as percentage
calcCV(array<float> arr) =>
    (array.stdev(arr) / array.avg(arr)) * 100

//@function Calculate skewness
//@param arr Source array
//@returns Skewness value
calcSkewness(array<float> arr) =>
    mean = array.avg(arr)
    n = array.size(arr)
    sumCubed = 0.0

    for value in arr
        sumCubed += math.pow(value - mean, 3)

    m3 = sumCubed / n
    m2 = array.variance(arr)
    m3 / math.pow(m2, 1.5)

//@function Calculate kurtosis
//@param arr Source array
//@returns Kurtosis value
calcKurtosis(array<float> arr) =>
    mean = array.avg(arr)
    n = array.size(arr)
    sumFourth = 0.0

    for value in arr
        sumFourth += math.pow(value - mean, 4)

    m4 = sumFourth / n
    m2 = array.variance(arr)
    (m4 / math.pow(m2, 2)) - 3

//@function Calculate correlation between two arrays
//@param arr1 First array
//@param arr2 Second array
//@returns Correlation coefficient (-1 to 1)
calcCorrelation(array<float> arr1, array<float> arr2) =>
    if array.size(arr1) != array.size(arr2)
        runtime.error("Arrays must be same size")

    mean1 = array.avg(arr1)
    mean2 = array.avg(arr2)
    n = array.size(arr1)

    sumProduct = 0.0
    sumSq1 = 0.0
    sumSq2 = 0.0

    for i = 0 to n - 1
        diff1 = array.get(arr1, i) - mean1
        diff2 = array.get(arr2, i) - mean2

        sumProduct += diff1 * diff2
        sumSq1 += diff1 * diff1
        sumSq2 += diff2 * diff2

    sumProduct / math.sqrt(sumSq1 * sumSq2)

//@function Calculate covariance
//@param arr1 First array
//@param arr2 Second array
//@returns Covariance value
calcCovariance(array<float> arr1, array<float> arr2) =>
    if array.size(arr1) != array.size(arr2)
        runtime.error("Arrays must be same size")

    mean1 = array.avg(arr1)
    mean2 = array.avg(arr2)
    n = array.size(arr1)

    sum = 0.0
    for i = 0 to n - 1
        sum += (array.get(arr1, i) - mean1) * (array.get(arr2, i) - mean2)

    sum / (n - 1)

//@function Linear regression
//@param x Independent variable array
//@param y Dependent variable array
//@returns [slope, intercept, r-squared]
calcLinearRegression(array<float> x, array<float> y) =>
    n = array.size(x)
    sumX = array.sum(x)
    sumY = array.sum(y)
    sumXY = 0.0
    sumXX = 0.0

    for i = 0 to n - 1
        sumXY += array.get(x, i) * array.get(y, i)
        sumXX += math.pow(array.get(x, i), 2)

    slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
    intercept = (sumY - slope * sumX) / n

    // Calculate R-squared
    meanY = array.avg(y)
    ssTotal = 0.0
    ssResidual = 0.0

    for i = 0 to n - 1
        predicted = slope * array.get(x, i) + intercept
        ssTotal += math.pow(array.get(y, i) - meanY, 2)
        ssResidual += math.pow(array.get(y, i) - predicted, 2)

    rSquared = 1 - (ssResidual / ssTotal)

    [slope, intercept, rSquared]

//@function Calculate z-scores
//@param arr Source array
//@returns Array of z-scores
calcZScores(array<float> arr) =>
    mean = array.avg(arr)
    stdDev = array.stdev(arr)
    result = array.new<float>()

    for value in arr
        zScore = (value - mean) / stdDev
        array.push(result, zScore)

    result

// ═══════════════════════════════════════════════════════════
// ROLLING STATISTICS
// ═══════════════════════════════════════════════════════════

//@function Calculate rolling statistics
type RollingStats
    array<float> values
    int period
    float mean
    float stdDev
    float min
    float max

method update(RollingStats this, float value) =>
    array.push(this.values, value)

    if array.size(this.values) > this.period
        array.shift(this.values)

    this.mean   := array.avg(this.values)
    this.stdDev := array.stdev(this.values)
    this.min    := array.min(this.values)
    this.max    := array.max(this.values)

method getBollinger(RollingStats this, float mult) =>
    upper = this.mean + (this.stdDev * mult)
    lower = this.mean - (this.stdDev * mult)
    [upper, this.mean, lower]

// Usage
var rollingStats = RollingStats.new(
    values = array.new<float>(),
    period = 20,
    mean = na,
    stdDev = na,
    min = na,
    max = na
)

rollingStats.update(close)

[bbUpper, bbMiddle, bbLower] = rollingStats.getBollinger(2.0)

plot(rollingStats.mean, "Rolling Mean", color.blue)
plot(rollingStats.mean + rollingStats.stdDev, "Mean + 1σ", color.gray)
plot(rollingStats.mean - rollingStats.stdDev, "Mean - 1σ", color.gray)
```

---

<a name="matrix-operations"></a>
## 6. Matrix Operations

```pinescript
//@version=6
indicator("Matrix Operations", overlay=false)

// ═══════════════════════════════════════════════════════════
// MATRIX CREATION
// ═══════════════════════════════════════════════════════════

// Create empty matrix (rows x cols)
matrix1 = matrix.new<float>(3, 3, 0.0)  // 3x3 matrix of zeros

// Create from arrays
row1 = array.from(1.0, 2.0, 3.0)
row2 = array.from(4.0, 5.0, 6.0)
row3 = array.from(7.0, 8.0, 9.0)

matrix2 = matrix.new<float>()
matrix.add_row(matrix2, 0, row1)
matrix.add_row(matrix2, 1, row2)
matrix.add_row(matrix2, 2, row3)

// Identity matrix
//@function Create identity matrix
//@param size Matrix size
//@returns Identity matrix
createIdentity(int size) =>
    m = matrix.new<float>(size, size, 0.0)
    for i = 0 to size - 1
        matrix.set(m, i, i, 1.0)
    m

identity = createIdentity(3)

// ═══════════════════════════════════════════════════════════
// MATRIX INFORMATION
// ═══════════════════════════════════════════════════════════

rows = matrix.rows(matrix2)     // 3
cols = matrix.columns(matrix2)  // 3
isSquare = rows == cols         // true

// ═══════════════════════════════════════════════════════════
// ACCESSING MATRIX ELEMENTS
// ═══════════════════════════════════════════════════════════

// Get element
value = matrix.get(matrix2, 1, 2)  // Row 1, Col 2 = 6.0

// Set element
matrix.set(matrix2, 0, 0, 99.0)  // Changes top-left to 99.0

// Get row as array
row = matrix.row(matrix2, 1)  // [4.0, 5.0, 6.0]

// Get column as array
col = matrix.col(matrix2, 2)  // [3.0, 6.0, 9.0]

// ═══════════════════════════════════════════════════════════
// MATRIX OPERATIONS
// ═══════════════════════════════════════════════════════════

m1 = matrix.new<float>()
matrix.add_row(m1, 0, array.from(1.0, 2.0))
matrix.add_row(m1, 1, array.from(3.0, 4.0))

m2 = matrix.new<float>()
matrix.add_row(m2, 0, array.from(5.0, 6.0))
matrix.add_row(m2, 1, array.from(7.0, 8.0))

// Addition
mSum = matrix.sum(m1, m2)  // Element-wise addition

// Subtraction
mDiff = matrix.diff(m1, m2)  // Element-wise subtraction

// Multiplication (matrix multiplication, not element-wise!)
mProd = matrix.mult(m1, m2)

// Scalar multiplication
mScaled = matrix.mult(m1, 2.0)  // Multiply all elements by 2

// Transpose
mTranspose = matrix.transpose(m1)

// Determinant (square matrices only)
det = matrix.det(m1)

// Inverse
mInverse = matrix.inv(m1)

// Power
mSquared = matrix.pow(m1, 2)  // m1 * m1

// ═══════════════════════════════════════════════════════════
// ADVANCED MATRIX OPERATIONS
// ═══════════════════════════════════════════════════════════

// Eigenvalues and eigenvectors
eigenvalues = matrix.eigenvalues(m1)
eigenvectors = matrix.eigenvectors(m1)

// Rank
rank = matrix.rank(m1)

// Trace (sum of diagonal elements)
trace = matrix.trace(m1)

// Pseudo-inverse (Moore-Penrose)
pseudoInv = matrix.pinv(m1)

// Kronecker product
kron = matrix.kron(m1, m2)

// ═══════════════════════════════════════════════════════════
// PRACTICAL EXAMPLE: LINEAR REGRESSION WITH MATRICES
// ═══════════════════════════════════════════════════════════

//@function Perform linear regression using matrices
//@param x Independent variable array
//@param y Dependent variable array
//@returns [slope, intercept]
matrixLinearRegression(array<float> x, array<float> y) =>
    n = array.size(x)

    // Create X matrix [1, x] for each point
    X = matrix.new<float>(n, 2)
    for i = 0 to n - 1
        matrix.set(X, i, 0, 1.0)  // Intercept column
        matrix.set(X, i, 1, array.get(x, i))  // x values

    // Create Y matrix
    Y = matrix.new<float>(n, 1)
    for i = 0 to n - 1
        matrix.set(Y, i, 0, array.get(y, i))

    // Calculate (X'X)^-1 X'Y
    Xt = matrix.transpose(X)
    XtX = matrix.mult(Xt, X)
    XtX_inv = matrix.inv(XtX)
    XtY = matrix.mult(Xt, Y)
    beta = matrix.mult(XtX_inv, XtY)

    intercept = matrix.get(beta, 0, 0)
    slope = matrix.get(beta, 1, 0)

    [slope, intercept]

// ═══════════════════════════════════════════════════════════
// MATRIX-BASED MOVING AVERAGE CALCULATION
// ═══════════════════════════════════════════════════════════

//@function Calculate weighted moving average using matrix
//@param prices Price array
//@param weights Weight array
//@returns Weighted average
matrixWeightedAvg(array<float> prices, array<float> weights) =>
    // Create row vectors
    priceMatrix = matrix.new<float>(1, array.size(prices))
    weightMatrix = matrix.new<float>(array.size(weights), 1)

    for i = 0 to array.size(prices) - 1
        matrix.set(priceMatrix, 0, i, array.get(prices, i))
        matrix.set(weightMatrix, i, 0, array.get(weights, i))

    // Matrix multiplication
    result = matrix.mult(priceMatrix, weightMatrix)
    matrix.get(result, 0, 0) / array.sum(weights)

// ═══════════════════════════════════════════════════════════
// CORRELATION MATRIX
// ═══════════════════════════════════════════════════════════

//@function Create correlation matrix from price series
//@param series1 First price array
//@param series2 Second price array
//@param series3 Third price array
//@returns Correlation matrix
createCorrelationMatrix(array<float> s1, array<float> s2, array<float> s3) =>
    //@function Calculate correlation
    corr(array<float> a, array<float> b) =>
        mean_a = array.avg(a)
        mean_b = array.avg(b)
        n = array.size(a)

        sum_prod = 0.0
        sum_sq_a = 0.0
        sum_sq_b = 0.0

        for i = 0 to n - 1
            diff_a = array.get(a, i) - mean_a
            diff_b = array.get(b, i) - mean_b
            sum_prod += diff_a * diff_b
            sum_sq_a += diff_a * diff_a
            sum_sq_b += diff_b * diff_b

        sum_prod / math.sqrt(sum_sq_a * sum_sq_b)

    corrMatrix = matrix.new<float>(3, 3, 1.0)

    // Fill correlation matrix
    matrix.set(corrMatrix, 0, 1, corr(s1, s2))
    matrix.set(corrMatrix, 0, 2, corr(s1, s3))
    matrix.set(corrMatrix, 1, 0, corr(s2, s1))
    matrix.set(corrMatrix, 1, 2, corr(s2, s3))
    matrix.set(corrMatrix, 2, 0, corr(s3, s1))
    matrix.set(corrMatrix, 2, 1, corr(s3, s2))

    corrMatrix

// ═══════════════════════════════════════════════════════════
// COVARIANCE MATRIX
// ═══════════════════════════════════════════════════════════

//@function Calculate covariance matrix for portfolio analysis
//@param returns Array of return series
//@returns Covariance matrix
calcCovarianceMatrix(array<array<float>> returns) =>
    n = array.size(returns)
    covMatrix = matrix.new<float>(n, n, 0.0)

    for i = 0 to n - 1
        for j = 0 to n - 1
            series_i = array.get(returns, i)
            series_j = array.get(returns, j)

            mean_i = array.avg(series_i)
            mean_j = array.avg(series_j)
            length = array.size(series_i)

            sum = 0.0
            for k = 0 to length - 1
                sum += (array.get(series_i, k) - mean_i) * (array.get(series_j, k) - mean_j)

            cov = sum / (length - 1)
            matrix.set(covMatrix, i, j, cov)

    covMatrix
```

---

<a name="practical-applications"></a>
## 7. Practical Applications

### Application 1: Custom Swing Detection

```pinescript
//@version=6
indicator("Array-Based Swing Detection", overlay=true)

// ═══════════════════════════════════════════════════════════
// SWING DETECTION TYPE
// ═══════════════════════════════════════════════════════════

type SwingPoint
    int barIndex
    float price
    string swingType  // "HIGH" or "LOW"

var swingHighs = array.new<SwingPoint>()
var swingLows = array.new<SwingPoint>()

// ═══════════════════════════════════════════════════════════
// DETECT SWINGS
// ═══════════════════════════════════════════════════════════

lookback = input.int(5, "Swing Lookback")

// Swing high detection
isSwingHigh = true
for i = 1 to lookback
    if high[i] >= high
        isSwingHigh := false
        break

if isSwingHigh and barstate.isconfirmed
    swing = SwingPoint.new(
        barIndex = bar_index,
        price = high,
        swingType = "HIGH"
    )
    array.push(swingHighs, swing)

    // Limit array size
    if array.size(swingHighs) > 50
        array.shift(swingHighs)

// Swing low detection
isSwingLow = true
for i = 1 to lookback
    if low[i] <= low
        isSwingLow := false
        break

if isSwingLow and barstate.isconfirmed
    swing = SwingPoint.new(
        barIndex = bar_index,
        price = low,
        swingType = "LOW"
    )
    array.push(swingLows, swing)

    if array.size(swingLows) > 50
        array.shift(swingLows)

// ═══════════════════════════════════════════════════════════
// DRAW SWING LINES
// ═══════════════════════════════════════════════════════════

var line[] swingLines = array.new<line>()

// Clear old lines
if barstate.islast
    for l in swingLines
        line.delete(l)
    array.clear(swingLines)

    // Draw swing highs
    for i = 1 to math.min(5, array.size(swingHighs)) - 1
        curr = array.get(swingHighs, array.size(swingHighs) - i)
        prev = array.get(swingHighs, array.size(swingHighs) - i - 1)

        l = line.new(prev.barIndex, prev.price, curr.barIndex, curr.price,
                     color=color.red, width=2)
        array.push(swingLines, l)

    // Draw swing lows
    for i = 1 to math.min(5, array.size(swingLows)) - 1
        curr = array.get(swingLows, array.size(swingLows) - i)
        prev = array.get(swingLows, array.size(swingLows) - i - 1)

        l = line.new(prev.barIndex, prev.price, curr.barIndex, curr.price,
                     color=color.green, width=2)
        array.push(swingLines, l)
```

### Application 2: Volume Profile

```pinescript
//@version=6
indicator("Array-Based Volume Profile", overlay=true)

// ═══════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════

lookbackBars = input.int(100, "Lookback Bars", minval=10)
numLevels = input.int(20, "Price Levels", minval=5, maxval=50)

// ═══════════════════════════════════════════════════════════
// COLLECT DATA
// ═══════════════════════════════════════════════════════════

var prices = array.new<float>()
var volumes = array.new<float>()

if barstate.isnew
    array.push(prices, close)
    array.push(volumes, volume)

    if array.size(prices) > lookbackBars
        array.shift(prices)
        array.shift(volumes)

// ═══════════════════════════════════════════════════════════
// CALCULATE VOLUME PROFILE
// ═══════════════════════════════════════════════════════════

if barstate.islast and array.size(prices) > 0
    minPrice = array.min(prices)
    maxPrice = array.max(prices)
    priceRange = maxPrice - minPrice
    levelSize = priceRange / numLevels

    // Initialize volume levels
    volumeLevels = array.new<float>(numLevels, 0.0)

    // Distribute volume into levels
    for i = 0 to array.size(prices) - 1
        price = array.get(prices, i)
        vol = array.get(volumes, i)

        level = math.floor((price - minPrice) / levelSize)
        level := math.min(level, numLevels - 1)  // Clamp to max

        currentVol = array.get(volumeLevels, int(level))
        array.set(volumeLevels, int(level), currentVol + vol)

    // Find POC (Point of Control - highest volume level)
    maxVol = array.max(volumeLevels)
    pocLevel = array.indexof(volumeLevels, maxVol)
    pocPrice = minPrice + (pocLevel * levelSize) + (levelSize / 2)

    // Draw volume profile
    maxVolume = array.max(volumeLevels)
    var box[] profileBoxes = array.new<box>()

    // Clear old boxes
    for b in profileBoxes
        box.delete(b)
    array.clear(profileBoxes)

    // Draw new profile
    for i = 0 to numLevels - 1
        levelVol = array.get(volumeLevels, i)
        levelPrice = minPrice + (i * levelSize)
        widthRatio = levelVol / maxVolume
        barWidth = int(lookbackBars * widthRatio)

        isPOC = (i == pocLevel)

        b = box.new(
            bar_index - lookbackBars, levelPrice,
            bar_index - lookbackBars + barWidth, levelPrice + levelSize,
            bgcolor = isPOC ? color.new(color.yellow, 70) : color.new(color.blue, 80),
            border_color = isPOC ? color.yellow : color.blue,
            border_width = isPOC ? 2 : 1
        )
        array.push(profileBoxes, b)

    // Draw POC line
    var line pocLine = line.new(bar_index - lookbackBars, pocPrice,
                                 bar_index, pocPrice,
                                 color=color.yellow, width=2, style=line.style_dashed)
    line.set_xy1(pocLine, bar_index - lookbackBars, pocPrice)
    line.set_xy2(pocLine, bar_index, pocPrice)
```

---

**Continue to companion file for:**
- More real-world examples
- Strategy pattern implementations
- Complete working systems
- Performance optimization tips
- Conversion to PDF instructions

---

## Converting to PDF

Use the same methods from the main guide:
1. **VS Code + Markdown PDF extension** (recommended)
2. **Microsoft Word** - Copy/paste and save as PDF
3. **Google Docs** - Paste and download as PDF
4. **Online converters** - md2pdf.com or similar

---

## Sources & References

- [Pine Script v6 Arrays Official Docs](https://www.tradingview.com/pine-script-docs/language/arrays/)
- [Pine Script Arrays Guide | Pineify](https://pineify.app/resources/blog/pine-script-array-a-comprehensive-guide)
- [TradingView Matrices Documentation](https://www.tradingview.com/pine-script-docs/language/matrices/)
- [Pine Script v6 Strategy Examples | Pineify](https://pineify.app/resources/blog/pine-script-v6-strategy-examples)
- [Advanced Position Sizing Techniques](https://pineify.app/resources/blog/understanding-atr-pine-script-a-comprehensive-guide)
- [Pyramiding Strategies | Quant Nomad](https://quantnomad.com/advanced-programming-with-pine-script-implementing-multi-level-stop-limit-orders-with-pyramiding/)
- [TradingView Risk Management Guide](https://blog.pickmytrade.trade/tradingview-risk-management/)

---

**Document created:** December 2025
**Companion to:** Pine Script v6 Advanced Strategy Guide
