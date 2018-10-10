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

// 将时间戳转换为 Moment 类的对象
transactions = transactions.map(function(item) {
  item.moment = moment(item.timestamp);
  return item;
});

// 按天分组
const transactionsGroupedByDate = _.groupBy(transactions, function(item) {
  return item.moment.format("YYYY-MM-DD");
});

// 按周分组
const transactionsGroupedByWeek = _.groupBy(transactions, function(item) {
  return item.moment.format("YYYY-WW");
});

// 按月分组
const transactionsGroupedByMonth = _.groupBy(transactions, function(item) {
  return item.moment.format("YYYY-MM");
});

// 按年分组
const transactionsGroupedByYear = _.groupBy(transactions, function(item) {
  return item.moment.format("YYYY");
});

// 封装成工具类
/* function createTimeSeries(timeSeriesArray) {
  const timeSeriesObject = {
    // 将时间戳转换为 Moment 类的对象
    array: timeSeriesArray.map(function(item) {
      item.moment = moment(item.timestamp);
      return item;
    }),
    // 抽象出按不同时间格式分组的方法
    groupByFormat: function(formatPattern) {
      return _.groupBy(this.array, function(item) {
        return item.moment.format(formatPattern);
      });
    },
    // 按天分组
    groupByDate: function() {
      return this.groupByFormat("YYYY-MM-DD");
    },
    // 按周分组
    groupByWeek: function() {
      return this.groupByFormat("YYYY-WW");
    },
    // 按月分组
    groupByMonth: function() {
      return this.groupByFormat("YYYY-MM");
    },
    // 按年分组
    groupByYear: function() {
      return this.groupByFormat("YYYY");
    }
  };
  return timeSeriesObject;
} */

// 增加统计方法
/* function createTimeSeries(timeSeriesArray) {
  const timeSeriesObject = {
    // 将时间戳转换为 Moment 类的对象
    array: timeSeriesArray.map(function(item) {
      item.moment = moment(item.timestamp);
      return item;
    }),
    // 抽象出按不同时间格式分组的方法
    groupByFormat: function(formatPattern) {
      return _.groupBy(this.array, function(item) {
        return item.moment.format(formatPattern);
      });
    },
    // 按天分组
    groupByDate: function() {
      // return this.groupByFormat("YYYY-MM-DD");
      const groupedResult = {
        // 按天分组后的数据集合
        map: timeSeriesObject.groupByFormat("YYYY-MM-DD"),
        // 返回数据集合的键，即日期，组成的数组
        dates: function() {
          return _.keys(this.map);
        },
        // 统计某个日期的 price 总和
        sum: function(date) {
          return _.sumBy(this.map[date], "price");
        }
      };
      return groupedResult;
    },
    // 按周分组
    groupByWeek: function() {
      // return this.groupByFormat("YYYY-WW");
      const groupedResult = {
        // 按周分组后的数据集合
        map: timeSeriesObject.groupByFormat("YYYY-WW"),
        // 返回数据集合的键，即周，组成的数组
        weeks: function() {
          return _.keys(this.map);
        },
        // 统计某一周内的 price 总和
        sum: function(week) {
          return _.sumBy(this.map[week], "price");
        },
        // 统计某一周内 平均每天的 price
        average: function(week) {
          const dates = this.map[week];

          const sum = this.sum(week);

          return sum / dates.length;
        }
      };
      return groupedResult;
    },
    // 按月分组
    groupByMonth: function() {
      // return this.groupByFormat("YYYY-MM");
      const groupedResult = {
        // 按月分组后的数据集合
        map: timeSeriesObject.groupByFormat("YYYY"),
        // 返回数据集合的键，即月，组成的数组
        months: function() {
          return _.keys(this.map);
        },
        // 统计某一月内的 price 总和
        sum: function(month) {
          return _.sumBy(this.map[month], "price");
        },
        // 统计某一月内 平均每天的 price
        average: function(month) {
          const dates = this.map[month];

          const sum = this.sum(month);

          return sum / dates.length;
        }
      };
      return groupedResult;
    },
    // 按年分组
    groupByYear: function() {
      // return this.groupByFormat("YYYY");
      const groupedResult = {
        // 按年分组后的数据集合
        map: timeSeriesObject.groupByFormat("YYYY"),
        // 返回数据集合的键，即年，组成的数组
        years: function() {
          return _.keys(this.map);
        },
        // 统计某一年内的 price 总和
        sum: function(year) {
          return _.sumBy(this.map[year], "price");
        },
        // 统计某一年内 平均每天的 price
        average: function(year) {
          const dates = this.map[year];

          const sum = this.sum(year);

          return sum / dates.length;
        }
      };
      return groupedResult;
    }
  };
  return timeSeriesObject;
} */

//  进一步抽象封装： 将 sum 和 average 从聚合结果中抽出
/* function createTimeSeries(timeSeriesArray) {
  const timeSeriesObject = {
    // 将时间戳转换为 Moment 类的对象
    array: timeSeriesArray.map(function(item) {
      item.moment = moment(item.timestamp);
      return item;
    }),
    // 抽象出按不同时间格式分组的方法
    groupByFormat: function(formatPattern) {
      return _.groupBy(this.array, function(item) {
        return item.moment.format(formatPattern);
      });
    },
    // 按天分组
    groupByDate: function() {
      // return this.groupByFormat("YYYY-MM-DD");
      const groupedResult = {
        // 按天分组后的数据集合
        map: timeSeriesObject.groupByFormat("YYYY-MM-DD"),
        // 返回数据集合的键，即日期，组成的数组
        dates: function() {
          return _.keys(this.map);
        },
        // 统计某个日期的 price 总和
        sum: function(date) {
          return _.sumBy(this.map[date], "price");
        }
      };
      return groupedResult;
    },
    // 按周分组
    groupByWeek: function() {
      // return this.groupByFormat("YYYY-WW");
      const groupedResult = {
        // 按周分组后的数据集合
        map: timeSeriesObject.groupByFormat("YYYY-WW"),
        // 返回数据集合的键，即周，组成的数组
        weeks: function() {
          return _.keys(this.map);
        },
        // 统计某一周内的 price 总和
        sum: function(week) {
          return _.sumBy(this.map[week], "price");
        },
        // 统计某一周内 平均每天的 price
        average: function(week) {
          const dates = this.map[week];

          const sum = this.sum(week);

          return sum / dates.length;
        }
      };
      return groupedResult;
    },
    // 按月分组
    groupByMonth: function() {
      // return this.groupByFormat("YYYY-MM");
      const groupedResult = {
        // 按月分组后的数据集合
        map: timeSeriesObject.groupByFormat("YYYY-MM"),
        // 返回数据集合的键，即月，组成的数组
        months: function() {
          return _.keys(this.map);
        },
        // 统计某一月内的 price 总和
        sum: function(month) {
          return _.sumBy(this.map[month], "price");
        },
        // 统计某一月内 平均每天的 price
        average: function(month) {
          const dates = this.map[month];

          const sum = this.sum(month);

          return sum / dates.length;
        }
      };
      return groupedResult;
    },
    // 按年分组
    groupByYear: function() {
      // return this.groupByFormat("YYYY");
      const groupedResult = {
        // 按年分组后的数据集合
        map: timeSeriesObject.groupByFormat("YYYY"),
        // 返回数据集合的键，即年，组成的数组
        years: function() {
          return _.keys(this.map);
        },
        // 统计某一年内的 price 总和
        sum: function(year) {
          return _.sumBy(this.map[year], "price");
        },
        // 统计某一年内 平均每天的 price
        average: function(year) {
          const dates = this.map[year];

          const sum = this.sum(year);

          return sum / dates.length;
        }
      };
      return groupedResult;
    },
    dates: function() {
      return this.groupByDate().dates();
    },
    weeks: function() {
      return this.groupByWeek().weeks();
    },
    months: function() {
      return this.groupByMonth().months();
    },
    years: function() {
      return this.groupByYear().years();
    },
    // 统计某一时间段内的总和
    sum: function(unit, point) {
      switch (unit) {
        case "date":
          return this.groupByDate().sum(point);

        case "week":
          return this.groupByWeek().sum(point);

        case "month":
          return this.groupByMonth().sum(point);

        case "year":
          return this.groupByYear().sum(point);
      }
    },
    // 统计某一时间段内的平均值
    average: function(unit, point) {
      switch (unit) {
        case "week":
          return this.groupByWeek().average(point);

        case "month":
          return this.groupByMonth().average(point);

        case "year":
          return this.groupByYear().average(point);
      }
    }
  };
  return timeSeriesObject;
} */

// const timeSeries = createTimeSeries(transactions);
// console.log(timeSeries.sum("month", "2018-03")); //=> 192.75
// console.log(timeSeries.average("month", "2018-03")); //=> 96.375

// 再抽象封装：增加聚合缓存
function createTimeSeries(timeSeriesArray) {
  // 缓存对象
  const caches = {};

  const timeSeriesObject = {
    // 将时间戳转换为 Moment 类的对象
    array: timeSeriesArray.map(function(item) {
      item.moment = moment(item.timestamp);
      return item;
    }),
    // 抽象出按不同时间格式分组的方法
    groupByFormat: function(formatPattern) {
      // 首先检查 `caches` 对象中是否存在当前 `formatPattern` 的结果缓存
      if (caches[formatPattern]) {
        return caches[formatPattern];
      }
      const result = _.groupBy(timeSeriesObj.array, function(data) {
        return data.moment.format(formatPattern);
      });

      // 缓存结果
      caches[formatPattern] = result;

      return result;
    },
    // 按天分组
    groupByDate: function() {
      // return this.groupByFormat("YYYY-MM-DD");
      const groupedResult = {
        // 按天分组后的数据集合
        map: timeSeriesObject.groupByFormat("YYYY-MM-DD"),
        // 返回数据集合的键，即日期，组成的数组
        dates: function() {
          return _.keys(this.map);
        },
        // 统计某个日期的 price 总和
        sum: function(date) {
          return _.sumBy(this.map[date], "price");
        }
      };
      return groupedResult;
    },
    // 按周分组
    groupByWeek: function() {
      // return this.groupByFormat("YYYY-WW");
      const groupedResult = {
        // 按周分组后的数据集合
        map: timeSeriesObject.groupByFormat("YYYY-WW"),
        // 返回数据集合的键，即周，组成的数组
        weeks: function() {
          return _.keys(this.map);
        },
        // 统计某一周内的 price 总和
        sum: function(week) {
          return _.sumBy(this.map[week], "price");
        },
        // 统计某一周内 平均每天的 price
        average: function(week) {
          const dates = this.map[week];

          const sum = this.sum(week);

          return sum / dates.length;
        }
      };
      return groupedResult;
    },
    // 按月分组
    groupByMonth: function() {
      // return this.groupByFormat("YYYY-MM");
      const groupedResult = {
        // 按月分组后的数据集合
        map: timeSeriesObject.groupByFormat("YYYY-MM"),
        // 返回数据集合的键，即月，组成的数组
        months: function() {
          return _.keys(this.map);
        },
        // 统计某一月内的 price 总和
        sum: function(month) {
          return _.sumBy(this.map[month], "price");
        },
        // 统计某一月内 平均每天的 price
        average: function(month) {
          const dates = this.map[month];

          const sum = this.sum(month);

          return sum / dates.length;
        }
      };
      return groupedResult;
    },
    // 按年分组
    groupByYear: function() {
      // return this.groupByFormat("YYYY");
      const groupedResult = {
        // 按年分组后的数据集合
        map: timeSeriesObject.groupByFormat("YYYY"),
        // 返回数据集合的键，即年，组成的数组
        years: function() {
          return _.keys(this.map);
        },
        // 统计某一年内的 price 总和
        sum: function(year) {
          return _.sumBy(this.map[year], "price");
        },
        // 统计某一年内 平均每天的 price
        average: function(year) {
          const dates = this.map[year];

          const sum = this.sum(year);

          return sum / dates.length;
        }
      };
      return groupedResult;
    },
    dates: function() {
      return this.groupByDate().dates();
    },
    weeks: function() {
      return this.groupByWeek().weeks();
    },
    months: function() {
      return this.groupByMonth().months();
    },
    years: function() {
      return this.groupByYear().years();
    },
    // 统计某一时间段内的总和
    sum: function(unit, point) {
      switch (unit) {
        case "date":
          return this.groupByDate().sum(point);

        case "week":
          return this.groupByWeek().sum(point);

        case "month":
          return this.groupByMonth().sum(point);

        case "year":
          return this.groupByYear().sum(point);
      }
    },
    // 统计某一时间段内的平均值
    average: function(unit, point) {
      switch (unit) {
        case "week":
          return this.groupByWeek().average(point);

        case "month":
          return this.groupByMonth().average(point);

        case "year":
          return this.groupByYear().average(point);
      }
    }
  };
  return timeSeriesObject;
}

const timeSeries = createTimeSeries(transactions);
console.log(timeSeries.sum("month", "2018-03")); //=> 192.75
console.log(timeSeries.average("month", "2018-03")); //=> 96.375
