`数组`在数学中也可以称为`“数列”`，是以数字或其他类型内容为元素的`有序集合`。

在数据科学领域中，数组可以说是承载了绝大部分数据的表达任务，无论是规整的`数据表`，还是随时间排序的`时间序列`，或是复杂多变的`非结构化数据`，都可以使用`数组`或`类数组`的形式表达。

## 1. 数组的长度

数组是一个有序集合，它包含了若干个元素。因为它是一个包含了若干元素的集合，所以它就肯定包含了一个属性，即`元素的数量`(又称为 `数组的长度`)。

```js
const array = [1, 2, 3, 4, 5];
console.log(array.length); //=> 5
```

在计算机中，可用内存是有限的，所以大部分程序在创建数据（比如数组）的时候，都需要先设定好该数据的所占长度。但在 JavaScript 中这并不需要，因为实际在 JavaScript 中数组就是一个特殊的对象。

## 2. 对数组进行 增删改查

### 2.1 增加 元素

一般来说向数组增加内容是在数组的末端新增内容（Append），当然也可能存在将新内容添加到数组首端或是插入到中间的某一个部分的需求。

#### 2.1.1 添加到末端 Append

Append 操作在 JavaScript 中使用 `array.push(element1[, ...[, elementN]])` 方法直接实现。

```js
const array = [];

array.push(1);
console.log(array); //=> [1]

array.push(2, 3);
console.log(array); //=> [1, 2, 3]
console.log(array.length); //=> 3
```

#### 2.1.2 添加到首端 Prepend

添加到首端的操作在 JavaScript 中可以使用 `array.unshift(element1[, ...[, elementN]])` 方法。

```js
const array = [4, 5];

array.unshift(3);
console.log(array); //=> [3, 4, 5]

array.unshift(1, 2);
console.log(array); //=> [1, 2, 3, 4, 5]
```

#### 2.1.3 插入到中间某位置 Insert

有的时候我们还需要往数组中的某一个位置添加元素。但需要注意的是，在 JavaScript 中数组元素的位置是从 `0` 开始的，也就是数组的第一个元素的下标为 0，第二个为 1。

假设我们需要在数组 [ 1, 2, 4, 5 ] 中的第三个位置，即下标为 2 的位置上添加元素 3。这需要用到 `array.splice(start, deleteCount, element1[, ...[, elementN]])` 方法。

注意该方法第二个参数是 deleteCount，这个方法可以用来`删除`数组中某一个位置开始的若干个元素，而当我们将这个参数设置为 0 的时候，该方法第三个以及后面的参数便会插入到下标为 start 的位置，后面的元素自动往后推导。

```js
const array = [1, 2, 6, 7];

array.splice(2, 0, 3);
console.log(array); //=> [1, 2, 3, 6, 7]

array.splice(3, 0, 4, 5);
console.log(array); //=> [1, 2, 3, 4, 5, 6, 7]
```

### 2.2 查找 元素

数组是一个有序集合，在对数组中的元素进行查找的时候也是一个有序进行的过程，而最常用的内容查找方法便是 `filter` 过滤器。

过滤器的逻辑，是定义一个`过滤函数`，该函数会有序地被传入数组中当前下标的元素，而它则需要返回该函数是否符合其过滤要求，即结果为 true 或 false。

假设我们需要在数组 [1, 2, 3, 4, 5, 6, 7, 8] 中找出偶数项，即对元素进行对 2 求余结果为 0 时即为偶数。

```js
const array = [1, 2, 3, 4, 5, 6, 7, 8];
const evenNumbers = array.filter(function(x) {
  return x % 2 == 0;
});

console.log(evenNumbers); //=> [2, 4, 6, 8]
```

### 2.3 删除 元素

删除内容在实际应用中有非常多的含义，有可能是`删除不符合某一种条件`的元素，那么使用`过滤器`即可实现；有可能是需要`删除某一个位置上`的元素，那么就需要使用上面提到的 `array.splice(start, deleteCount)` 方法。

比如我们要删除数组 [1, 2, 3, 10, 4, 5] 中下标为 3 的元素 10，就可以这样使用，删除从位置 3 开始的 1 个元素。

另外，还有两个特殊的删除 元素的方法：

1）删除第一个元素：`array.shift()`。

2）删除最后一个元素：`array.pop()`。

```js
const array = [1, 2, 3, 10, 4, 5];

array.splice(3, 1);
//=> [10]
console.log(array);
//=>[1, 2, 3, 4, 5]

array.pop();
//=> 5
console.log(array);
//=> [1, 2, 3, 4]

array.shift();
//=> 1
console.log(array);
//=> [2, 3, 4];
```

### 2.4 修改 元素

对数组中的某一个元素进行修改，这种操作与对象中的`修改对象的属性`是一样的，因为数组就是一个特殊的对象（属性键为自增长自然数）。

```js
const array = [1, 2, 3, 4, 5];

array[0] = 10;
console.log(array); //=> [10, 2, 3, 4, 5]
```

### 2.5 封装 工具类

```js
const arrayUtils = {
  append(array, ...elements) {
    array.push(...elements);

    return array;
  },

  prepend(array, ...elements) {
    array.unshift(...elements);

    return array;
  },

  insert(array, index, ...elements) {
    array.splice(index, 0, ...elements);

    return array;
  },

  remove(array, index) {
    array.splice(index, 1);

    return array;
  }
};

// 使用
const array = [];
arrayUtils.append(array, 3); // 末端添加元素 3
arrayUtils.prepend(array, 1); // 首端添加元素 1
arrayUtils.insert(array, 1, 2); // 在位置 1 添加元素 2

console.log(array); //=> [1, 2, 3]

arrayUtils.remove(array, 1); // 删除位置1上的元素

console.log(array); // => [1, 3]
```

## 3. 以数组为单位的基本处理方法

在大多数情况下，我们都需要以`整个数组`为单位进行运算，比如进行平均数计算等等。那么我们就需要有一些方法来对整个数组进行处理和计算。

一般来说对数组的总体进行处理可以归类为两个操作：`转换` 和 `聚合`。

### 3.1 转换

转换便是将一个数组中的内容，以一定的方式规律地转换为另一个数组内容。

为什么要进行数据转换？因为有时候并不是天生就是可计算的，比如视频、图像、声音和文本等等，而当我们讨论运算的时候，都是以数字为运算的基础。那么为了方便进行运算，就需要先将这些“不可计算”的数据转换为数字，就比如我们前面学习字符串处理的时候就使用过了将英文字母转换为 ASCII 码的过程。

在 JavaScript 中对数组进行“扫描”有不少方法，如前面提到过的 `filter`、只进行循环的 `forEach`、与 filter 类似的但只返回第一个匹配值的 `find`，以及接下来我们需要用到的用于进行数据转换的 `map` 和用于聚合数据的 `reduce`。

假设我们需要将数组 [ 1, 2, 3, 4, 5 ] 中的每一个元素都转换为较其增 2 的数值，也就是说要给每一个元素做 `+ 2` 的操作，那么我们就可以使用 `array.map(callback)` 方法来实现。

```js
const arr = [1, 2, 3, 4, 5];
const addedArr = arr.map(function(item) {
  return item + 2;
});
console.log(addedArr); //=> [3,4,5,6,7]
```

由 ASCII 码组成的数组 [ 72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100 ]，我们需要把它转化为对应的字符串数组。

```js
const asciiArr = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100];
const charArr = asciiArr.map(function(item) {
  return String.fromCharCode(item);
});
console.log(charArr); //=> ["H", "e", "l", "l", "o", "W", "o", "r", "l", "d"]
```

### 3.2 聚合

我们来回忆一下当年我们是怎么一步一步做 1 + 2 + 3 + 4 这道加法运算题的。根据从左到右的运算法则，我们需要首先计算 1 + 2 等于 3；然后将这个和再与 3 相加得到 6，并且以此类推最终得到了这个式子的结果为 10。

其实这个过程就是 reduce 方法的过程。

```js
const arr = [1, 2, 3, 4];
const sumResult = arr.reduce(function(left, right) {
  return left + right;
});
console.log(sumResult); // => 10
```

对这个聚合结果做一个封装，比如求数组中数值相加的和与相乘的积。

```js
const array = [1, 2, 3, 4];

function sum(array) {
  return array.reduce(function(left, right) {
    return left + right;
  });
}

function multi(array) {
  return array.reduce(function(left, right) {
    return left * right;
  });
}

console.log(sum(array)); //=> 10
console.log(multi(array)); //=> 24
```

甚至我们还可以将这个封装的程度再往抽象的方向进一步发展，这其中涉及了一些函数式编程的概念。

```js
const array = [1, 2, 3, 4];

function reduceFn(callback) {
  return function(array) {
    return array.reduce(callback);
  };
}

const sum = reduceFn(function(left, right) {
  return left + right;
});
const multi = reduceFn(function(left, right) {
  return left * right;
});

console.log(sum(array)); //=> 10
console.log(multi(array)); //=> 24
```

### 3.3 Lodash 工具库

Lodash 是一个包含了非常多实用工具函数的 JavaScript 工具库，其中也包括了非常多我们在对对象型、数组型数据进行处理时需要用到的函数。
使用 Lodash 实现数组相加

正好我们可以使用 Lodash 来实现我们前面所用到的数组求和。

```js
const array = [1, 2, 3, 4];

const sumResult = _.sum(array);

console.log(sumResult); //=> 20
```

### 3.4 更复杂的数组

实际开发经验告诉我们，除了包含数值、字符串这样的简单数据外，我们还需要更复杂的数组以对付更复杂的需求。

比如我们需要使用一个数组来存储某个部门的人员数据，那么该数组中的元素就应该代表了该部门中的每一个人的`抽象映射`。而为了能够表达一个人的各种属性，我们需要用对象来完成这样的需求，也就是说我们需要让`对象`成为数组的元素内容。

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
```

当我们需要表达一个抽象的`二维空间`（比如数学中的直角坐标系）甚至更高维度空间中的许多点的集合时，每一个点都可以使用一个向量来表示其在对应空间中的位置，比如 [ 3, 5 ]。那么自然地，用于表达这些点的集合的数组就是一个以`数组`为元素的数组了。

```js
const points = [[1, 1], [2, 3], [3, 5], [4, 7], [5, 10], [6, 15]];
```

甚至我们有的时候还需要一个数组中有着不同类型的元素，比如混杂着字符串和数值。

```js
const array = [["Hello", 1], ["World", 1]];
```

**练习题**

- 1.将数组 [ 1, 2, 3, 4, 5 ] 转换为 [ 'a1', 'a2', 'a3', 'a4', 'a5' ]；

```js
const arr = [1, 2, 3, 4, 5];
arr.map(function(item) {
  return "a" + item;
});
// => ["a1", "a2", "a3", "a4", "a5"]
```

- 2.将数组 [ 1, 2, 3, 4, 5 ] 转换为 [ 'a1', 'b2', 'c3', 'd4', 'e5' ]；

```js
const =  [ 1, 2, 3, 4, 5 ];
arr.map(function(item) {
  return String.fromCharCode(96 + item) + item;
});
// => ["a1", "b2", "c3", "d4", "e5"]
```

- 3.将数组 [ 1, 2, 3, 4, 5 ] 转换为 [ 1, 4, 9, 16, 25 ]；

```js
const arr = [1, 2, 3, 4, 5];
arr.map(function(item) {
  return item * item;
});
// => [1, 4, 9, 16, 25]
```

- 4.查询 JavaScript 中 Array.prototype.map 方法的详细文档，并将数组 [ 0, 0, 0, 0, 0 ] 转换为 [ 'A', 'B', 'C', 'D', 'E' ]；

```js
const arr = [0, 0, 0, 0, 0];
arr.map(function(item, index) {
  return String.fromCharCode(65 + index);
});
// => ["A", "B", "C", "D", "E"]
```

- 5.提取数组 [ 1, 2, 3, 4, 5 ] 中的 [ 2, 3, 4 ]。

```js
const arr = [1, 2, 3, 4, 5];
const arr2 = arr.splice(1, 3);
console.log(arr2); // => [ 2, 3, 4 ]
```
