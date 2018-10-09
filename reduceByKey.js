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

// 按词频从高到低排序
const sorted = wordCountResult.sort(function(leftTuple, rightTuple) {
  return rightTuple[1] - leftTuple[1];
});

// 取词频最高的五个的单词
const top5 = _.take(sorted, 5).map(function(tuple) {
  return tuple[0];
});

// 取词频最低的五个单词
const less5 = _.takeRight(sorted, 5).map(function(tuple) {
  return tuple[0];
});
