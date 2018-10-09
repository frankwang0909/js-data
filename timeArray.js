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

// transactions = transactions.map(function(data) {
//   data.time = new Date(data.timestamp);
//   return data;
// });

// 需要将时间戳转换为 Moment 类的对象
transactions = transactions.map(function(data) {
  data.moment = moment(data.timestamp);
  return data;
});

// 按天分组
const transactionsGroupedByDate = _.groupBy(transactions, function(
  transaction
) {
  return transaction.moment.format("YYYY-MM-DD");
});
console.log(transactionsGroupedByDate);

// 按周分组
const transactionsGroupedByWeek = _.groupBy(transactions, function(
  transaction
) {
  return transaction.moment.format("YYYY-WW");
});
console.log(transactionsGroupedByWeek);

// 按月分组
const transactionsGroupedByMonth = _.groupBy(transactions, function(
  transaction
) {
  return transaction.moment.format("YYYY-MM");
});

console.log(transactionsGroupedByMonth);

// 按年分组
const transactionsGroupedByYear = _.groupBy(transactions, function(
  transaction
) {
  return transaction.moment.format("YYYY");
});

console.log(transactionsGroupedByYear);

// 封装工具类，方便调用
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

// const timeSeries = createTimeSeries(transactions);
// console.log(timeSeries.groupByMonth());

// 以一种虚拟映射的方式表达这样的数据，即定义一个计算函数 sum(date)，
// 只有当传入某一日期的时候才会返回该日期的统计结果，以节省内存空间。
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
        // 定义 dates() 以返回日期字符串集
        dates() {
          return _.keys(groupedResult.map);
        },
        // 定义一个计算函数 sum(date) ，只有当传入某一日期的时候才会返回该日期的统计结果
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
