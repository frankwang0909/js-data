# 使用序列

`数组`作为存储一系列数据的方式，而在 JavaScript 中数组是非常强调`顺序`的一种数据结构。但我们在日常使用的时候，并不是所有的数据都是完全遵守等间距的。可能每两个数据之间从特定的维度上观察是呈现的间断性，而非连续性。

其中最为典型的就是`时间序列`，从物理传感器传来的数据、智能穿戴设备的记录数据等等都是经常会出现不连续的现象，这些数据从时间维度上观测会发现基本上是无规律间隙性的。那么我们就不能简单地使用数组进行记录。

为了更为准确地记录和表达这些数据，我们需要将用于表达顺序的标签从 JavaScript 数组中的下标，改变为对象元素中的某一个标签。

## 1. 时间序列

时间序列一般用于表达一组建立在`时间轴上的数据`，比如工业生产设备中传感器所定时记录的数据。但由于传感器设备同样存在误差，而且由于实际应用中也有可能出现不工作的情况，所以真正所记录下来的数据很有可能是断断续续的。

这种数据集我们可以将其称为`稀疏序列`，虽然我们可以使用插值、拟合等方式将这些空缺的数据补上，但是这涉及更为复杂的数学运算。

数组元素中必定包含用于存储每一个数据点所对应的时间戳（Timestamp）。在 JavaScript 中，一般使用毫秒级 Unix 时间戳作为时间的基本表达方式。

`Date.now()` 方法：获取当前设备中所记录的当前毫秒级 Unix 时间戳。
`new Date(timestamp)` 方法：将以数值为表达方式的时间戳转换为用于表达时间（包括日期和时间）的 Date 类型。

我们使用以带有时间戳 timestamp 属性的对象作为数组的元素, 来存储某人两天的一日三餐记账记录。

```js
let transactions = [
  {
    timestamp: 1519864292535,
    category: "餐饮",
    price: 6.0
  },
  {
    timestamp: 1519874872261,
    category: "餐饮",
    price: 12.0
  },
  {
    timestamp: 1519899849526,
    category: "餐饮",
    price: 52.5
  },
  {
    timestamp: 1519953249020,
    category: "餐饮",
    price: 4.5
  },
  {
    timestamp: 1519963102270,
    category: "餐饮",
    price: 13.5
  },
  {
    timestamp: 1519999849526,
    category: "餐饮",
    price: 104.25
  }
];
```

如果我们将这些数据放到时间轴上，就可以发现这些记录值间歇性地分布在时间轴上，中间的间隔也并非一定。

### 1.1 处理时间

在时间序列中，顾名思义其最重要的参数便是`序列元素中的时间戳`。但由于在实际研究和应用中，我们大多并不需要将统计分析的精度精确到毫秒级或是秒级，更多的情况是以`每天`、`每周`、`每月`和`每年`的方式进行统计。

所以我们在处理时间序列的时候，首先需要做的是如何将时间序列中的高精确度记录数据进行整合，首先聚合出一定时间范围内的平均、总体记录结果。

在 JavaScript 中处理时间，我们可以首先要将以整型为存储介质的`时间戳`转换为 `Date 类型`。

```js
transactions = transactions.map(function(data) {
  data.time = new Date(data.timestamp);
  return data;
});
```

这样我们就已经将现有数据中的时间戳变成了可以用于进行详细操作的 Date 类型对象，接下来就可以将其进行时间范围的分组操作。

但是跟 JavaScript 中的数组一样，JavaScript 中的 Date 对象虽然本身也已经提供了非常多很实用的方法，但是这远远不足以满足我们的实际需求。所以我们这里再次引入一个第三方工具库 `Moment.js`。

### 1.2 Moment.js

Moment.js 是一个专门用于处理 JavaScript 中 Date 类型数据的工具库，它除了提供用于设置和提取时间对象中的各种参数（时、分、秒、日期等）外，还可以根据不同的表达格式进行字符串渲染，得到需要的时间格式。

将时间戳转换为 Moment 类的对象，支持直接将以整型的时间戳或 Date 类型转换为 Moment 对象。

```js
transactions = transactions.map(function(data) {
  data.moment = moment(data.timestamp);
  return data;
});
```

### 1.3 按天分组

对于记账数据来说，一般来说我们需要进行最小颗粒统计便是以天为单位的计算。那么我们首先就需要对记录数据中的时间戳进行处理，得到对应的日期。

使用 Moment.js 进行日期提取非常简单，Moment.js 允许对时间对象进行格式化。比如我们若需要将时间转换为以 `年-月-日` 为格式的字符串，就可以使用 `moment.format('YYYY-MM-DD')` 进行格式化。

结合前面我们学习过的 LoDash 工具库，我们可以使用 `_.groupBy()` 方法进行分组。

```js
const transactionsGroupedByDate = _.groupBy(transactions, function(
  transaction
) {
  return transaction.moment.format("YYYY-MM-DD");
});

console.log(transactionsGroupedByDate);
```

### 1.4 按周分组

除了按天计算以外，我们对于我们的记账数据往往对每周的开销更为看重。然而实际上如何把时间按周分组确实是一个“技术活”，因为我们往往不能保证每年 1 月 1 日和每个月的第一天都是周日（每周的第一天）。

如果严格使用周日为一周的第一天原则，就需要精确到天来确定某一天处在于某一年的第几个星期。当然我们不需要太过于纠结于这个，因为 Moment.js 已经帮我们封装好这样的转换工具了。

在调用 `moment.format(pattern)` 方法时使用 `WW` 可以获取两位数的周数（01 ~ 53），为了根据周分组我们可以按 `YYYY-WW` 作为分组标签。

```js
const transactionsGroupedByWeek = _.groupBy(transactions, function(
  transaction
) {
  return transaction.moment.format("YYYY-WW");
});

console.log(transactionsGroupedByWeek);
// => {
//   "2018-09": [{…}, {…}, {…}, {…}, {…}, {…}]
// }
```

### 1.5 按月、年分组

按月分组跟按周分组非常相似，只是在调用 `moment.format(pattern)` 时，将 "WW" 改成 "MM" 即可。

```js
const transactionsGroupedByMonth = _.groupBy(transactions, function(
  transaction
) {
  return transaction.moment.format("YYYY-MM");
});

console.log(transactionsGroupedByMonth);
// => {
//   "2018-03": [{…}, {…}, {…}, {…}, {…}, {…}]
// }
```

按照年来分组则同理，对格式化方式进行更改就可以了。

```js
const transactionsGroupedByYear = _.groupBy(transactions, function(
  transaction
) {
  return transaction.moment.format("YYYY");
});

console.log(transactionsGroupedByYear);
// => {
//   "2018": [{…}, {…}, {…}, {…}, {…}, {…}]
// }
```

### 1.6 分组整合

为时间序列封装一个工具来方便我们使用时间序列

```js
function createTimeSeries(timeSeriesArray) {
  const timeSeriesObj = {
    array: timeSeriesArray.map(function(data) {
      data.moment = moment(data.timestamp);
      return data;
    }),

    groupByFormat(formatPattern) {
      return _.groupBy(timeSeriesObj.array, function(data) {
        return data.moment.format(formatPattern);
      });
    },

    groupByDate() {
      return timeSeriesObj.groupByFormat("YYYY-MM-DD");
    },

    groupByWeek() {
      return timeSeriesObj.groupByFormat("YYYY-WW");
    },

    groupByMonth() {
      return timeSeriesObj.groupByFormat("YYYY-MM");
    },

    groupByYear() {
      return timeSeriesObj.groupByFormat("YYYY");
    }
  };

  return timeSeriesObj;
}

const timeSeries = createTimeSeries(transactions);
console.log(timeSeries.groupByMonth());
```

## 2. 时间序列统计计算

我们已经将账单数据按照时间进行了分组，但是当我们打开一个记账软件的时候难道只会看某一天我花了哪些钱吗？我自然希望能够知道这一天我花了多少钱、一周内花了多少钱、一个月内花了多少钱、一般是周几的时候花钱最多、一周平均每天花多少钱等等计算结果。

而我们前面已经将数据按周、月进行分组，但是我们同样需要在按周、月分组之后再进行按天分组，因为我们需要看到一个星期、一个月内每天的开销统计。

### 2.1 计算每天开销情况

要计算每天的开销情况，不一定是需要先将数据分组好以后再进行处理，而我们在进行分组的时候就可以直接完成我们需要的统计计算。

首先我们第一步就是需要从知道每天花了哪些钱，变成知道每天花了多少钱，那么我们就需要进行 `求和计算`。

Lodash 工具库的`_.sumBy()` 方法可以用于处理较为复杂的`多维数组`。

我们前面定义了一个 `timeSeriesObj.groupByFormat()` 方法，该方法返回的结果是一个以 `{ [date]: array }` 为格式的对象（或叫映射集）。为了避免数据产生的大量冗余（重复、不必要的数据），我们可以再定义一个结果对象，将前面的日期集对象以 map 属性值存储，并且定义 `dates()` 以返回`日期字符串集`以便我们后面的使用。

再回到正题上，我们需要得到当前日期集中`每一天的开销总和`。但是让我们再次思考一个问题，是否一定要让每一天的统计值以实体数据（即内存变量）的方式存储呢？其实不必，我们可以以一种`虚拟映射`的方式表达这样的数据，即定义一个`计算函数 sum(date)`，只有当传入某一日期的时候才会返回该日期的统计结果，以节省内存空间。这些日期字符串我们就可以通过调用 `dates()` 取得。

```js
function createTimeSeries(timeSeriesArray) {
  const timeSeriesObj = {
    array: timeSeriesArray.map(function(data) {
      data.moment = moment(data.timestamp);
      return data;
    }),

    groupByFormat(formatPattern) {
      return _.groupBy(timeSeriesObj.array, function(data) {
        return data.moment.format(formatPattern);
      });
    },

    groupByDate() {
      const groupedResult = {
        map: timeSeriesObj.groupByFormat("YYYY-MM-DD"),

        dates() {
          return _.keys(groupedResult.map);
        },

        sum(date) {
          return _.sumBy(groupedResult.map[date], "price");
        }
      };

      return groupedResult;
    },

    groupByWeek() {
      return timeSeriesObj.groupByFormat("YYYY-WW");
    },

    groupByMonth() {
      return timeSeriesObj.groupByFormat("YYYY-MM");
    },

    groupByYear() {
      return timeSeriesObj.groupByFormat("YYYY");
    }
  };

  return timeSeriesObj;
}

const timeSeries = createTimeSeries(transactions);
const groupedByDateSeries = timeSeries.groupByDate();

console.log(groupedByDateSeries.dates());
//=> ["2018-03-01", "2018-03-02"]

const firstDate = groupedByDateSeries.dates()[0];

console.log(groupedByDateSeries.sum(firstDate));
//=> 70.5
```

如果我们需要一次性打出所有日期的统计结果，我们可以简单地灵活使用 Array.map 方法即可。

```js
groupedByDateSeries.dates().map(function(date) {
  return {
    date: date,
    sum: groupedByDateSeries.sum(date)
  };
});
//=> [
//   { date: "2018-03-01", sum: 70.5 },
//   { date: "2018-03-02", sum: 122.25 }
// ]
```

### 2.2 计算每周开销情况
