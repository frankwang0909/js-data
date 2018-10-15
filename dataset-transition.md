# 结构转换

不同的数据结构各自承担着不同类型数据的承载功能。不同的数据之间有着不同的表现方式，而在实际工作中我们却常常需要将不同的数据类型进行相互转换，以满足不同的需求。

## 1. Any <==> 字符串

在开发数据应用的时候，有大部分的数据都不会是由 JavaScript 或用户的操作实时生成的，更多的是直接从`服务端`的`数据存储设施`中提取出来，然后通过`网络协议`传输到`客户端`以用于展示。

前端使用的数据大部分都需要通过网络协议从服务端传往前端，那这样一个传输过程就是抽象内容的`编码`和`解编码`的过程。而且在计算机科学中，通信协议基本上都是以`字符串（或二进制）`为基础承载数据结构，也就是说在一个服务端与客户端的通信架构中，会需要将`各种数据结构`首先转换为`字符串`，经过了网络的传输过程而达到另一端之后，再以相同的方式转换为`原本的数据结构`。

把将`非字符串类型`的数据通过某种算法转换为`字符串`的过程称为`序列化`（字符串也是一种有序序列），而利用 `JSON 格式`便是目前最流行的序列化方法之一。

### 1.1 JSON

JSON，全称为 JavaScript Object Notation，是目前最流行的网络数据传输格式之一。相比于 CSV（Comma-Separated Values，逗号分隔值）、XML（Extensible Markup Language，可扩展标记语言）等历史更为悠久的格式化数据传输格式，JSON 同时拥有着易读性强（完全符合 JavaScript 标准）、格式不敏感和轻量化的特点。

使用现代 JavaScript 引擎中提供的或其他可信任的 `JSON.parse()` 函数进行解码和 `JSON.stringify()` 函数进行编码。

```js
const jsonStr = JSON.stringify({
  name: "Michael Jackson",
  nickname: "Whacko Jacko"
});

console.log(jsonStr); //=> {"name":"Michael Jackson","nickname":"Whacko Jacko"}
```

### 1.2 直接类型转换

JSON 格式的好处是将`结构不确定的数据`转换为`字符串格式`，但同时也会强行带来可能不必要的内容，比如 JSON 的边界字符（如 "、{} 等）。在需要转换的目标数据类型是确定的，而且将序列化后的字符串数据进行解析的接收方也是可控的的情况下，可以选择直接对数据进行类型转换。

#### 1.2.1 数值类型

1.数值类型 ==> 字符串类型

在 JavaScript 中所有的对象都会默认带有一个 `toString()` 方法，而对于数值类型来说，可以直接使用这个方法来进行向`字符串类型`的转换。

```js
const n1 = 1;
const n2 = 1.2;

const s1 = n1.toString();
const s2 = n2.toString();

console.log(s1, typeof s1); //=> 1 string
console.log(s2, typeof s2); //=> 1.2 string
```

2.数值类型 ==> 字符串形式存储的指定精度的数值

将数据类型的小数点后的值固定在一个长度范围内，比如 `5 -> 5.00` 和 `3.1415 -> 3.14`，这个主要用于表格和图表的展示上。

JavaScript 不区分开`整型`和`非整型`的数值，所以它提供了一个用于实现这个需求的方法 `Number.toFixed()`。

这个方法接受一个`数值参数`，即小数点后的保留位数，返回的是一个`字符串形式`存储的指定精度的数值。一般来说，这个参数需要是`非负整型数值`，当然如果传入一个非整型数值，该方法也会自动取整进行计算。.

```js
const int = 5;
const pi = Math.PI; //=> 3.141592653589793 (约等于)

console.log(int.toFixed(2)); //=> '5.00'
console.log(typeof int.toFixed(2)); //=> "string"
console.log(pi.toFixed(2)); //=> '3.14'
console.log(int.toFixed(pi)); //=> '5.000'
```

3.字符串 ==> 数值类型

可以通过 `parseInt()` 和 `parseFloat()` 将以`字符串形式`存储的数值转换为`整型`或`浮点型`。

另外，也可以通过 `Number()` 将以`字符串形式`存储的数值转换为`整型`或`浮点型`。

```js
console.log(parseInt("5.00")); //=> 5
console.log(parseFloat("3.14")); //=> 3.14
console.log(Number("3.14")); //=> 3.14
```

主要区别在于，`Number()` 更加严格，如果字符串中有包含非数字，则会转换成 NaN。而 parseInt() 和 parseFloat() 则只会转换前面的数值部分。

```js
console.log(parseInt("3.14A2")); //=> 3
console.log(parseFloat("3.14A2")); //=> 3.14
console.log(Number("3.14A2")); //=> NaN
```

另外，parseInt() 函数还可以传入第二个参数，表示要解析的数字的基数，该值介于 2 ~ 36 之间。默认值为 10.

```js
parseInt("11"); //=> 11
parseInt("11", 10); //=> 11 = 10 + 1
parseInt("11", 2); //=> 3 = 2 + 1
```

#### 1.2.2 布尔值（逻辑型）

1.布尔值 ==> 字符串

布尔值也就是真与假，在 JavaScript 中表现为 true 与 false。显而易见，这两个值各自都有一个以英文单词来表示的意义，那么我们自然可以非常简单地对其进行转换了。

```js
console.log(true.toString()); //=> 'true'
console.log(false.toString()); //=> 'false'
```

2.字符串 ==> 布尔值

我们可以使用强类型判断 `===` 分别判断一个字符串是否是 `"true"`，不是则为 `false`。

```js
function parseBoolean(string) {
  return string === "true";
}

console.log(parseBoolean("true")); //=> true
console.log(parseBoolean("false")); //=> false...
```

#### 1.2.3 数组

1.数组 ==> 字符串

数组也可以进行组合变成一个字符串，使用的是 `Array.join()` 方法。

```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.join()); //=> 1,2,3,4,5
console.log(arr.join("#")); //=> 1#2#3#4#5
```

2.字符串 ==> 数组

字符串中的 `split()` 方法，可以将一个字符串以 `指定字符串` 为 `分隔符` 分割成一个 `数组` 。

```js
const str = "1,2,3,4,5";
const arr = str.split(",");

console.log(arr); //=> [ 1, 2, 3, 4, 5 ]
```

## 2.对象 <==> 数组

在 JavaScript 中的数组实际上是一个特殊的对象字面量，那么在从属关系上看数组应该是对象字面量的一个子集 。

有时候，我们需要将一个对象字面量中的`属性`以`列表的形式`展示出来。

```js
{
	name: "Bill Gates",
	title: "Engineer",
	subject: "Computer Science"
}
// ==>
[
	[name: "Bill Gates"],
	[title: "Engineer"],
	[subject: "Computer Science"]
]
```

JavaScript 中提供了一个 `Object.keys()` 方法，可以提取出对象的所有`属性键`，并以`数组`的形式表示。

```js
const object = {
  name: "Bill Gates",
  title: "Engineer",
  subject: "Computer Science"
};

const keys = Object.keys(object);
console.log(keys); //=> ["name", "title", "subject"]
```

得到了目标对象的属性键数组后，配合数组的 `map()` 方法便可以将每一个属性键对应的值提取出来。

```js
const list = keys.map(key => {
  return {
    key,
    value: object[key]
  };
});

console.log(list);
//=> [
// {key: "name", value: "Bill Gates"},
// {key: "title", value: "Engineer"},
// {key: "subject", value: "Computer Science"}
// ]
```

也可以将第二层中的对象也使用`数组`表示。

```js
const pairs = keys.map(key => {
  return [key, object[key]];
});

console.log(pairs);
// => [
// ["name", "Bill Gates"],
// ["title", "Engineer"],
// ["subject", "Computer Science"]
// ]
```

第三方类库 Lodash 中提供的 `_.toPairs()` 方法可以将`对象`转换为`以双元素为键值对`表达方式的`数组`。

```js
const pairs = _.toPairs(object);
console.log(pairs);
// => [
// ["name", "Bill Gates"],
// ["title", "Engineer"],
// ["subject", "Computer Science"]
// ]
```

完成了从对象到数组的转换后自然需要一个将其进行逆转换的方法，可以直接使用 Lodash 中提供的 `_.fromPairs()`。

```js
const object = _.fromPairs(pairs);
console.log(object);
// => {
//   name: "Bill Gates",
//   title: "Engineer",
//   subject: "Computer Science"
// };
```

数据转换的出发点和目的都是为了`服务需求`，而不是单纯地将其进行数据结构上的转换。在思考如何对数据进行处理之前，首先要明确`目标需求`究竟需要怎样的数据形式, 究竟是需要一个以`数值作为元素的数组`（如人工神经网络的输入和输出值），还是`以对象作为元素类型的数组`以用于表格的展示（每一个对象元素代表表格中的一行），或是`以列为单位存储的数据框对象`（如 ECharts 框架中常用）。

```js
// Input data for ANN
const xorArray = [1, 0, 0, 1, 1, 0, 1];

// Row-base dataset
const rDataset = [
  { name: "August", gender: "male" },
  { name: "Summer", gender: "female" }
];

// Column-base dataset
const cDataset = {
  name: ["August", "Summer"],
  gender: ["male", "female"]
};
```

## 3. 数据集

两种用于存储表格数据的结构：行式数据集（Row-oriented Dataset）和列式数据集（Column-oriented Dataset）。这两种数据集在二维空间中都同样标识了一个`矩阵式数据集`，但它们存储的方式和适用的范围不一样。

例如，以下这个数据集存储了某公司的一部分人员信息。该数据集包含了五个`数据列`和五个`数据行`，其中每一行代表了`一个员工的信息`，而每一列对应的则是`不同的信息维度`。

| RowId | EmpId | Lastname | Firstname | Salary |
| ----- | ----- | -------- | --------- | ------ |
| 001   | 10    | Smith    | Joe       | 40000  |
| 002   | 12    | Jones    | Mary      | 50000  |
| 003   | 11    | Johnson  | Cathy     | 44000  |
| 004   | 22    | Jones    | Bob       | 55000  |
| 005   | 24    | Steve    | Mike      | 62000  |

如果将这个数据集分别使用行式数据集和列式数据集两种数据结构进行存储的话，则将会是以下形式的实际结构。

1.行式数据集

```js
// Row-oriented Dataset
const empsRows = [
  {
    RowId: "001",
    EmpId: "10",
    Lastname: "Smith",
    Firstname: "Joe",
    Salary: 40000
  },
  {
    RowId: "002",
    EmpId: "12",
    Lastname: "Jones",
    Firstname: "Mary",
    Salary: 50000
  },
  {
    RowId: "003",
    EmpId: "11",
    Lastname: "Johnson",
    Firstname: "Cathy",
    Salary: 44000
  },
  {
    RowId: "004",
    EmpId: "22",
    Lastname: "Jones",
    Firstname: "Bob",
    Salary: 55000
  },
  {
    RowId: "005",
    EmpId: "24",
    Lastname: "Steve",
    Firstname: "Mike",
    Salary: 62000
  }
];
```

2.列式数据集

```js
// Column-oriented Dataset
const empsColumns = {
  RowId: ["001", "002", "003", "004", "005"],
  EmpId: ["10", "12", "11", "22", "24"],
  Lastname: ["Smith", "Jones", "Johnson", "Jones", "Steve"],
  Firstname: ["Joe", "Mary", "Cathy", "Bob", "Mike"],
  Salary: [40000, 50000, 44000, 55000, 62000]
};
```

这两种数据集存储结构各有其不同的优势和优化方式，在数据库领域中有分别基于这两种结构实现的不同数据库软件，如`基于行式的 MySQL` 以及`基于列式的 Apache HBase`。

行式数据集有`直观、单一行内的数据结构稳定、利于行式切分存储`等优点，而列式数据集的好处是`可以通过忽略非必要列以加速数据读取、查询等操作`。甚至有些框架或者语言中的数据集就是以列式进行存储的，比如在广泛用于统计领域的 R 语言中的数据框 `data.frame`，其中的每一列都是以一个`向量 vector` 进行存储的。

事实上我们在很多的数据 API 中都会发现，API 所提供的数据结构基本上都是以`行式数据`提供的。这是因为后端服务所使用的大部分都是`行式数据库`，再者`行式数据`在后端程序的处理中也更为方便直接。

### 3.1 使用列式数据集

在前端开发中，列式数据集又有哪些应用场景?

我们再次将目光放回到上面这张员工数据集上，如果要统计数据集中各员工的`收入水平`，我们可以选用最大公约数再乘以 10 作为约数，然后进行取整的结果作为统计区间。然而这里我们只需要用到`数据集中的 Salary 这一个字段`，如果该数据集的尺寸远比 5\*5 大的话，使用整个数据集进行计算显然会浪费非常多的计算资源（CPU 时间、内存空间、IO 等）。这时候`列式数据集`的优势便体现出来了，只取该一列的数据进行计算即可。

```js
// 最大公约数
function gcd(a, b) {
  if (b === 0) {
    return a;
  }

  return gcd(b, a % b);
}

const w = empsColumns.Salary.reduce(gcd) * 10;
const W = empsColumns.Salary.map(function(s) {
  return Math.floor(s / w);
});

console.log(W); //=> [4, 5, 4, 5, 6]
```

得到了各数据所落到的区间后，再进行统计，最后得到的结果便可用于图表绘制了。同样，我们可以使用前面编写的 `_.reduceByKey()` 进行统计计算。

```js
const salaryAnalysis = _.reduceByKey(
  W.map(function(W_i) {
    return [W_i, 1];
  }),
  function(a, b) {
    return a + b;
  }
);

console.log(salaryAnalysis);
//=> [
//   ["4", 2],
//   ["5", 2],
//   ["6", 1]
// ]
```

如果要找出不同收入层次的人的名字，需要使用到其他列的数据，那么在列式数据集中该如何使用呢？其实非常简单，无论是在 JavaScript 中的列式数据集还是基于列式的数据库，当需要使用到其他列的时候`使用相同的下标`即可。

```js
const groupedNames = _.mapValues(
  _.groupBy(
    empsColumns.Salary.map(function(s) {
      return Math.floor(s / w);
    }).map(function(W_i, i) {
      return {
        w: W_i,
        name: `${empsColumns.Firstname[i]} ${empsColumns.Lastname[i]}`
      };
    }),
    "w"
  ),
  function(items) {
    return items.map(_.iteratee("name"));
  }
);

console.log(groupedNames);
//=> {
//   4: [ "Joe Smith", "Cathy Johnson" ],
//   5: [ "Mary Jones", "Bob Jones" ],
//   6: [ "Mike Steve" ]
// }
```

### 3.2 行式数据集 ==> 列式数据集

了解完列式数据集的好处和实际使用方式之后，我们来学习下如何将前端生成或者从后端服务中取得的行式数据集转换为列式数据集。

首先，我们要了解数据集并不一定是完全密集的，也就是说`某些字段是允许为空的`，在以`对象字面量`作为一行的`行式数据集`中便有`某一个字段不存在`或为 `null/undefined`。同样，在`列式数据集`中也可以使用 `null` 或 `undefined` 来表示空字段。

假设我们并不知道某个行式数据集究竟有哪些字段列，因为很有可能前面所有的数据行中都不存在的某个字段，在最后一行出现了。而且在实际业务开发中很有可能数据并非一次性加载完成，而是通过`数据流`的形式不断添加的。因此，我们需要能够`随时检查是否有新字段列产生`。如果有，将其添加到目标`列式数据集`中。

首先，定义一个用于初始化`列式数据集`中新字段的函数，逻辑很简单，检查目标数据集中是否已经存在目标字段，如果不存在将其初始化为一个`空数组`。

```js
function applyColumn(colDataset, columnName) {
  if (!_.has(colDataset, columnName)) {
    colDataset[columnName] = [];
  }

  return colDataset;
}
```

然后将`行式数据集`中的每一个`对象字面量`所包含的字段都插入到对应行列位置上即可。

```js
function rowOriented2ColOriented(rowDataset) {
  let colDataset = {};

  rowDataset.forEach(function(row, i) {
    const columnNames = _.keys(row);

    columnNames.forEach(function(columnName) {
      colDataset = applyColumn(colDataset, columnName);
      colDataset[columnName][i] = row[columnName];
    });
  });

  return colDataset;
}

const transformedDataset = rowOriented2ColOriented(empsRows);

console.log(transformedDataset);
//=> {
//  RowId: [ '001', '002', '003', '004', '005' ],
//  EmpId: [ '10', '12', '11', '22', '24' ],
//  Lastname: [ 'Smith', 'Jones', 'Johnson', 'Jones', 'Steve' ],
//  Firstname: [ 'Joe', 'Mary', 'Cathy', 'Bob', 'Mike' ],
//  Salary: [ 40000, 50000, 44000, 55000, 62000 ]
// }
```

### 3.3 列式数据集 ==> 行式数据集

当需求变成将 `列式数据集` 转换为 `行式数据集` 时，需要考虑的技术点也会相应地发生改变。在行式转列式的过程中需要注意的是未知字段列的添加，而`列式转行式`时则需要注意`跳过空字段`。

而且因为`列式数据集`是必须`带有顺序的`，所以很有可能会出现当前最后一行数据并不是完整的数据，即所有的字段列的长度并不一定相等。

因此在开始遍历每一个字段列之前，需要`先检查该数据集究竟有多少个数据行`，方法也很简单，就是`找出最长的那个字段列`。

```js
function rowOriented2ColOriented(colDataset) {
  const columnNames = _.keys(colDataset);

  const n = _.max(
    columnNames.map(function(colName) {
      return colDataset[colName].length;
    })
  );

  const rowDataset = [];

  for (let i = 0; i < n; ++i) {
    const row = {};

    columnNames.forEach(function(colName) {
      if (!_.isNil(colDataset[colName][i])) {
        row[colName] = colDataset[colName][i];
      }
    });

    rowDataset[i] = row;
  }

  return rowDataset;
}

const empsRows = rowOriented2ColOriented(empsColumns);

console.log(empsRows);
//=> [
//   { RowId: '001', EmpId: '10', Lastname: 'Smith', Firstname: 'Joe', Salary: 40000 },
//   { RowId: '002', EmpId: '12', Lastname: 'Jones', Firstname: 'Mary', Salary: 50000 },
//   { RowId: '003', EmpId: '11', Lastname: 'Johnson', Firstname: 'Cathy', Salary: 44000 },
//   { RowId: '004', EmpId: '22', Lastname: 'Jones', Firstname: 'Bob', Salary: 55000 },
//   { RowId: '005', EmpId: '24', Lastname: 'Steve', Firstname: 'Mike', Salary: 62000 }
// ]
```
