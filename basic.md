# 基本数据处理 · 基本统计

## 基本统计方法

我们经常能在各种地方听到这样的词语“平均”、“绝大部分”、“百分之三十”，这些都可以在统计学中找到对应的东西。比如“平均”就是平均值，或更专业的“数学期望值”，而“绝大部分”对应的就是“众数”。这些我们都可以将它们统称为数列的数学特征值。

### 1. 平均值

数学期望值指的是在概率论中，一个数值集合总体中各种可能性的结合。

使用 Lodash 的 `_.mean()` 方法，可以轻松实现平均值的计算。

```js
const array = [1, 2, 3, 4, 5];

const mean = _.mean(array);

console.log(mean); //=> 3
```

结合转换聚合的概念，我们来计算部门人员数据的人员平均年龄。

```js
const crew = [
  {
    name: "Peter",
    gender: "male",
    level: "Product Manager",
    age: 32
  },
  {
    name: "Ben",
    gender: "male",
    level: "Senior Developer",
    age: 28
  },
  {
    name: "Jean",
    gender: "female",
    level: "Senior Developer",
    age: 26
  },
  {
    name: "Chang",
    gender: "male",
    level: "Developer",
    age: 23
  },
  {
    name: "Siva",
    gender: "female",
    level: "Quality Assurance",
    age: 25
  }
];

const ages = _.map(crew, function(person) {
  return person.age;
});
//=> [32, 28, 26, 23, 25]

const meanAge = _.mean(ages);

console.log(meanAge); //=> 26.8
```

Lodash 还提供了更为简单的函数来应对这样的数组计算。

```js
const meanAge = _.meanBy(crew, "age");

// 或者

const meanAge = _.meanBy(crew, function(person) {
  return person.age;
});
```

### 2. 众数

除了平均数以外，我们最常用到的数学特征值恐怕就要数众数了，因为我们常常希望知道在一个群体中的最大多数是什么。而这就意味着众数并不代表只能用在数值数列上，也可以用于其他可以对比相同的元素上，比如字符串。

在很多情况下我们并不仅仅是想要单一的一个众数，而是想要“频次出现最多的若干个情况”。

#### 2.1 词频统计

一般来对数组中的各种可能性进行`频次统计`，是先创建一个用于`记录频次的对象`，然后通过`遍历数组`中的每一个元素，并将其一个一个放入到前面创建的对象中以记录频次。但是自从我们学会了使用 Map 和 Reduce 开始我们就可以使用更直观的方式进行统计。

首先把每一个词使用变换函数将其变成一个以单词为第一元素，以 1 为第二元素的数组，我们可以将其称为 `Tuple`，相当于对象中的一个键值对。

```js
"hello" -> [ "hello", 1 ]
```

在一般情况下的 Reduce 函数是用于遍历整个数组的，而 reduceByKey 则是根据 Tuple 集中的`键`先进行一次`分类组合`，将具有相同键的`值`进行组合，然后对每一个组合集进行`单独遍历`。

我们可以使用 Lodash 的函数进行组合，对 Lodash 进行拓展。

```js
_.reduceByKey = function(tuples, reduceCallback) {
  const grouped = _.groupBy(tuples, function(tuple) {
    return tuple[0];
  });

  return _.toPairs(
    _.mapValues(grouped, function(tuples) {
      return _.chain(tuples)
        .map(function(tuple) {
          return tuple[1];
        })
        .reduce(reduceCallback)
        .value();
    })
  );
};

const originalText = `
While I'm working on Javascript applications, I often found myself writing utility module which contains, unsurprisingly, utility methods. So what are utility module?

A utility class is a class that defines a set of methods that perform common, often re-used functions. - Wikipedia

From dealing with strings and objects to collections iterating problems, there will always be cases where there is a gap for a utility function to fulfil.

Even with the mainstream adoption of ES6, I dare say that Javascript developers still don't get as much syntax sugars as other languages such as Objective-C and Ruby. Hence, the need to write custom helpers for utilitarian tasks is still prevalent in Javascript applications.

However, as of late, I came to be very fond of a library which provides clean and performant utility methods - Lodash.
`;

const words = originalText.toLowerCase().match(/\w+/g);

const tuples = words.map(function(word) {
  return [word, 1];
});

const wordCountResult = _.reduceByKey(tuples, function(left, right) {
  return left + right;
});

console.log(wordCountResult);
```

#### 2.2 排序

要知道哪些单词出现次数最多，哪些出现最少吧？所以我们需要对上面的统计结果按照频次从大到小或从小到大排序。

JavaScript 中的 `array.sort()` 方法进行简单的排序。

```js
const sorted = wordCountResult.sort(function(leftTuple, rightTuple) {
  return rightTuple[1] - leftTuple[1];
});
```

#### 2.3 裁剪

有了排序之后的统计结果，我们就可以从中取出一部分用于展示统计结果了，比如“频次最多的 5 个单词”和“频次最少的 5 个单词”等。

可以使用 JavaScript 的 `array.slice(startIndex, stopIndex)`方法。这个方法的用途就是`对数组进行切片`。比如前 5 个元素的切片、后 5 个元素的切片和中间某个范围的切片等。

比如我们需要知道词频统计结果中，频次最多的 5 个单词是哪些。那么我们就可以对已经经过从大到小排序的统计结果中，选取前 5 个元素的切片。

```js
const top5 = sorted.slice(0, 5);
const less5 = sorted.slice(sorted.length - 5);
```

Lodash 提供了更简便的 `_.take()` 方法。

`_.take()` 除了第一个参数为被处理数组外，还接受一个参数为个数 n，也就是该函数会返回数组中前 n 个元素的切片。

```js
const top5 = _.take(sorted, 5).map(function(tuple) {
  return tuple[0];
});
```

需要知道出现频次最少的 5 个单词，那就取统计结果的后 5 个元素即可。而 Lodash 同样提供了一个 `_.takeRight()` 方法，用于从数组的右端（也就是末端）开始选取元素。

```js
const less5 = _.takeRight(sorted, 5).map(function(tuple) {
  return tuple[0];
});
```

**练习**

- 1.设某次投票结果为如下 [ 1, 2, 3, 2, 2, 3, 1, 4, 4, 1, 2, 1, 1, 3, 4 ]，请统计投票结果并找出票数最多的选项；

```js
const votes = [1, 2, 3, 2, 2, 3, 1, 4, 4, 1, 2, 1, 1, 3, 4];
const votesTuples = votes.map(function(vote) {
  return [vote, 1];
});

const votesCountResult = _.reduceByKey(votesTuples, function(left, right) {
  return left + right;
});

const votesSorted = votesCountResult.sort(function(leftTuple, rightTuple) {
  return rightTuple[1] - leftTuple[1];
});
// => ["1", 5],["2", 4],["3", 3],["4", 3]]
var mostVote = votesSorted[0][0];
// => "1"
```

- 2.假设某一时间记录软件记录下一个人一天 24 小时中每一个小时的工作状态，其中分别以范围为 1 ~ 8 的自然数标识，1 为生产力最差的程度，而 8 则为生产力最佳的状态。
而该软件记录了某人一天的数据为 [ 1, 1, 1, 1, 1, 1, 1, 1, 6, 7, 8, 4, 3, 7, 8, 8, 6, 6, 4, 3, 3, 3, 1, 1 ]。
假设区间 1 ~ 3 为生产力较低，4 ~ 5 为生产力一般，6 ~ 8 为生产力较高。请统计并分析这份数据中一天的工作状态。

```js
const workCondition = [ 1, 1, 1, 1, 1, 1, 1, 1, 6, 7, 8, 4, 3, 7, 8, 8, 6, 6, 4, 3, 3, 3, 1, 1 ];
const wkTuples = workCondition.map(function(item) {
  return [item, 1];
});
const wkCountResult = _.reduceByKey(wkTuples, function(left, right) {
  return left + right;
});
const wkSorted = wkCountResult.sort(function(leftTuple, rightTuple) {
  return rightTuple[1] - leftTuple[1];
});
console.log(wkSorted);
//  [["1", 10],["3", 4],["6", 3],["8", 3],["4", 2],["7", 2]]
```