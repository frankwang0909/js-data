# 基于 ECharts 的基础表达性统计图表

## 1.散点图 Scatter

在数据统计处理开发中，最主要的数据类型通常是`离散型单值数值类型`，比如学校班级中的每一个学生的身高体重信息、记账本中的每一次支出的价格等等。

而就比如班级中的身高体重信息，因为严格意义上人与人之间并没有一定的顺序，所以要展示每一个个体的数据应该选用`散点图`来展示`离散的数值数据`。

```js
// 以下代码构造一个50人的班级的学生身高信息的数据集
const students = [];
const n = 50;

// 身高的取值范围
const heightRanges = {
  male: [155, 180],
  female: [145, 170]
};

// 获取某个数值区间中的随机数
function getRandomInt(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

for (let i = 0; i < 50; ++i) {
  const gender = Math.random() > 0.5 ? "male" : "female";
  const [min, max] = heightRanges[gender];

  const student = {
    id: i + 1,
    gender: gender,
    height: getRandomInt(min, max)
  };

  students.push(student);
}

console.log(students);
//=>
// [
//   { id: 1, gender: "male", height: 157 },
//   { id: 2, gender: "male", height: 165 },
//   { id: 3, gender: "female", height: 157 },
//   { id: 4, gender: "female", height: 169 },
//   ...
// ]...
```

## 2. ECharts 简单入门

ECharts 是由百度开发并开源的一个基于 JavaScript 和 Canvas（在 4.0 中支持了 SVG 渲染）数据可视化图表工具库。

### 2.1 可视化图表基本元素

使用 ECharts 绘制可视化图表需要提供以下几种元素（对应不同的图表组件），以组成一个完整的数据图表。

- 数据（必需）
- 数据系列（必需）
- 坐标轴

除此之外还有如`辅助线`、`标记文本`、`图例`等等元素。ECharts 以`图表配置`为主要使用方式，使用的时候将所需要展示在图表上的元素加入到`图表配置`中即可。

### 2.2 数据集 dataset

从 ECharts 4.0 版本开始，它提供了一个非常适合我们学习和使用的数据集配置方法 dataset，它的主要用法是使用我们在第 10 节中所学习过的行式数据集以及列式数据集。

行式数据集

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

const option = {
  dataset: {
    source: empsRows
  }
};
```

列式数据集

```js
// Column-oriented Dataset
const empsColumns = {
  RowId: ["001", "002", "003", "004", "005"],
  EmpId: ["10", "12", "11", "22", "24"],
  Lastname: ["Smith", "Jones", "Johnson", "Jones", "Steve"],
  Firstname: ["Joe", "Mary", "Cathy", "Bob", "Mike"],
  Salary: [40000, 50000, 44000, 55000, 62000]
};

const option = {
  dataset: {
    source: empsColumns
  }
};
```

### 2.3 数据系列 series

准备好`数据集`以后，便需要将其与所需要的`数据系列`（如本节将会介绍的散点图和折线图）进行绑定，使数据可以真正地展示在数据图表上。

```js
// 散点图 Scatter
const option = {
  series: {
    type: "scatter",
    encode: {
      x: "Firstname",
      y: "Salary"
    }
  }
};
```

在这个数据系列中，我们指定了数据系列的类型为 scatter，即我们需要的散点图。然后通过 encode 绑定前面在 dataset 中数据的维度，如 x 坐标轴绑定到 Firstname，y 坐标轴绑定到 Salary 上。

### 2.4 坐标轴 axis

准备好了 `数据集` 和用于展示的 `数据系列` 之后，因为我们所需要展示的数据图表类型为散点图，所以至少需要 `一个坐标轴` 来作为数据的载体，而在一般情况下我们所使用的坐标轴为直角坐标轴（即一个 X 坐标轴和一个 Y 坐标轴）。

```js
const option = {
  xAxis: {
    type: "category" // X 坐标轴数据为名义数据（分类数据）
  },
  yAxis: {
    type: "value" // Y 坐标轴为计量数据（数值数据）
  }
};
```

### 2.5 组合图表元素

我们将上面准备好的三个图表元素组合在一起，然后将得到的图表配置传到 ECharts 的实例中，这里以行式数据集为例。

```js
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

const option = {
  dataset: {
    source: empsRows
  },
  xAxis: {
    type: "category"
  },
  yAxis: {
    type: "value"
  },
  series: {
    type: "scatter",
    encode: {
      x: "Firstname",
      y: "Salary"
    }
  }
};
```

## 3. 使用 ECharts 绘制一个用于展示班级内各同学身高的散点图

### 3.1 实现散点图

将上面这个图表配置中的数据集换成所需要展示的 students，然后将数据系列中的 encode 维度绑定更改为学生 ID 和身高信息。

```js
const option = {
  dataset: {
    source: students
  },
  xAxis: {
    type: "category"
  },
  yAxis: {
    type: "value"
  },
  series: {
    type: "scatter",
    encode: {
      x: "id",
      y: "height"
    }
  }
};
```

### 3.2 优化图表

虽然我们确实使用了 ECharts 来将我们所生成的数据进行了可视化，但我们也同样发现这个图表并不尽如人意：

- 图表中数据点都分布在图表的上方，图表的下半部分有一大片的空白区域；
- 坐标轴上没有任何的提示信息，单从图表数据无法判断数据的语义信息；
- 除了身高数据以外，数据中还提供了每一位学生的性别信息 gender（分别为 male 和 female），希望能够在图表中有所表示。

我们可以一步一步地来对既有图表进行优化，首先便是解决`图表空白区域太多`的问题。产生这个问题的原因是因为数据普遍分布在 145 ~ 180 之间，所以 0 ~ 145 这个区间便完全空白。

#### 3.2.1 拉伸数轴

要解决这个问题只需要在 Y 坐标轴上让 ECharts 对数轴进行拉伸，去掉空白区域。

```js
const option = {
  yAxis: {
    type: "value",
    scale: true // 是否拉伸数轴
  }
};
```

#### 3.2.2 添加数据信息

我们可以分别在 X 轴和 Y 轴上加入`对应数据的名称`，并让它们`显示在指定的位置`。

```js
const option = {
  xAxis: {
    type: "category",
    name: "学号", // 指定坐标轴所需要显示的名称（即数据名称）
    nameLocation: "middle", // 指定名称的显示方位
    nameGap: 25
  },
  yAxis: {
    type: "value",
    scale: true,
    name: "身高",
    nameLocation: "end"
  }
};
```

#### 3.2.3 数据分组

要实现这个需求，目前需要将男生的数据和女生的数据分别使用`各自的数据系列`进行表示，但是因为使用了 `dataset` 来统一集中数据配置，而通过 `encode` 也并不支持对 `dataset` 中的数据维度进行筛选。

所以我们可以另辟蹊径，使用 ECharts 中的另外一个组件`视觉映射（visualMap）`来实现这个功能。一般来说这个组件主要用于表示`不同范围或不同程度的数据`所对应的不同表现方式（如不同的颜色），比如 0 ~ 10、10 ~ 20、20 ~ 30 等。

但 ECharts 的 VisualMap 组件除了`支持区间范围`之外，还支持`完全匹配某一个值来作为一个区间`。那么我们便可以利用这个特性来`匹配不同的性别参数`，只需要在将其匹配目标指定为我们的性别维度 gender 即可。

```js
const option = {
  visualMap: {
    type: "piecewise", // piecewise 表示的是分段式，continuous 则为连续式
    dimension: "gender",
    pieces: [
      { value: "male", label: "男生", color: "#1890ff" },
      { value: "female", label: "女生", color: "#f5222d" }
    ],
    orient: "horizontal"
  }
};
```

## 4. 折线图 Lines

折线图更适合用于表示`计量数据随时间`或某种特定有序排列的数值`变化趋势`。

### 4.1 生成随机时间序列

使用 JavaScript 中用于生成均匀分布在开区间 (0, 1)（不包含 0 与 1）随机数的 `Math.random()` 生成需要的随机数 rand，然后通过以下公式得到一个均匀分布在区间 (-r, r) 的随机系数。

```
coefficient = 2 * r * (rand - 0.5)
```

```js
function randomCoefficient(r) {
  const rand = Math.random();
  const coefficient = (rand - 0.5) * 2 * r;

  return coefficient;
}
```

每一项数据便为上一项数据加上该变化率。

```
T2 = T1  * ( 1 + coefficient)
```

我们假设数据集的第一项为 100，数据项总数目为 50，得到以下数据生成代码。

```js
const X = [100];
const n = 50 - 1;
const r = 0.1;

function randomCoefficient(r) {
  const rand = Math.random();
  const coefficient = (rand - 0.5) * 2 * r;

  return coefficient;
}

function getRandomTimeSeires(arr) {
  for (let i = 0; i < n; ++i) {
    const coefficient = randomCoefficient(r);
    const newValue = parseFloat((arr[i] * (1 + coefficient)).toFixed(2));
    arr.push(newValue);
  }
}
getRandomTimeSeires(X);
console.log(X); //=> [ 100, 95.23, ... ]

const data = X.map(function(x, i) {
  return { time: i + 1, value: x };
});
```

### 4.2 绘制折线图

得到了绘制所需要的数据集后，我们便可以将其应用到我们上面所使用到的数据图表中，替换掉原本的散点图数据。

```js
const option = {
  dataset: {
    source: data
  },
  xAxis: {
    type: "value",
    name: "i",
    nameLocation: "middle",
    nameGap: 30
  },
  yAxis: {
    type: "value",
    scale: true,
    name: "x",
    nameLocation: "end"
  },
  series: {
    type: "line",
    encode: {
      x: "time",
      y: "value"
    }
  }
};
```

### 4.3 优化折线图

在 ECharts 中折线图直接提供了一个使用方法非常简单的功能，能将原本的折线变成光滑的曲线图，我们只需要在类型为 line 的`series`中加入一项 `smooth` 即可。

```js
const option = {
  dataset: {
    source: data
  },
  xAxis: {
    type: "value",
    name: "i",
    nameLocation: "middle",
    nameGap: 30
  },
  yAxis: {
    type: "value",
    scale: true,
    name: "x",
    nameLocation: "end"
  },
  series: {
    type: "line",
    smooth: true, // 光滑曲线
    encode: {
      x: "time",
      y: "value"
    }
  }
};
```

## 5. 柱状图 Bar

在我们日常生活中能看到的数据可视化图表中，柱状图可能会占据着大多数，因为它非常适合用于展示`同一量纲下不同计量数据值的区别`。比如需要对比某年某市多所高中的本科录取人数、本科率等，柱状图绝对是最适合的选择。

### 5.1 准备数据

柱状图所需要的数据集非常简单，每一个类目对应着一个柱状数据，柱状的高度对应着该类目的计量数据。假设某年某市 4 所高中的本科录取人数以及本科率如下表所示。

| 学校         | 高中 A | 高中 B | 高中 C | 高中 D |
| ------------ | ------ | ------ | ------ | ------ |
| 本科录取人数 | NA     | NB     | NC     | ND     |
| 本科率       | PA     | PB     | PC     | PD     |

其中，我们假设数列 N 中的每一个元素都为大于 1000 小于 1500 的随机数，而数列 P 中的元素则为大于 0.85 小于 1 的随机数。同样，我们使用 JavaScript 生成一个符合这些约束的数据集。

```js
const N = [];
const P = [];
const n = 4;

function getRandomInt(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

for (let i = 0; i < n; ++i) {
  N.push(getRandomInt(1000, 1500));
  P.push(getRandomInt(85, 100) / 100);
}

console.log(N); //=> [ 1395, 1318, 1447, 1437 ]
console.log(P); //=> [ 0.96, 0.89, 0.98, 0.99 ]
```

得到了两个数列之后，还需要将它们整合起来成为一个 ECharts 可用的`行式数据集`。

```js
const schools = [];

for (let i = 0; i < n; ++i) {
  schools.push({
    name: String.fromCharCode(65 + i),
    N: N[i],
    P: P[i]
  });
}

console.log(schools); //=> [ { name: 'A', N: 1395, P: 0.96 }, ... ]
```

### 5.2 绘制柱状图

修改图表配置，首先将 `dataset.source` 改成我们现在需要用的 `schools` 学校数据集。

```js
const option = {
  dataset: {
    source: schools
  }
};
```

然后将 `series` 中的 `type` 改成目前我们需要使用的柱状图 `bar`，并同时修改 `encode` 中的维度绑定以符合我们新的数据集。

```js
const option = {
  series: {
    type: "bar",
    encode: {
      x: "name",
      y: "N"
    }
  }
};
```

最后得到完整的图表配置项，将其应用到 ECharts 实例中查看效果。

```js
const option = {
  dataset: {
    source: schools
  },
  xAxis: {
    type: "category"
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      type: "bar",
      encode: {
        x: "id",
        y: "N"
      }
    }
  ]
};
const chartEl = document.querySelector("#chart");
const myChart = echarts.init(chartEl);
myChart.setOption(option);
```

### 5.3 优化图表

#### 5.3.1 添加数据标签

在上面的图表中，虽然左侧有 Y 坐标轴提供数值指示的功能，但因为 Y 坐标轴所能标识的数值有限，而柱状图本身也并不具备标明精确数值的功能，所以我们需要添加`数据标签`以准确指明数值。

在 bar `数据系列`中添加一个 `label` 配置，以显示一个数值标签。

```js
const option = {
  series: [
    {
      type: "bar",
      encode: {
        x: "id",
        y: "N"
      },
      label: {
        normal: {
          show: true,
          position: "top"
        }
      }
    }
  ]
};
```

#### 5.3.2 添加平均值辅助线

除了对数值进行标识之外，对于标识不同分类数值的柱状图来说，通常还需要向读者传递一些`统计信息`，比如该数值的平均值等。在 ECharts 中为图表添加这些信息可以用到 `markLin`e 组件来添加带数值的`辅助线`。

比如我们需要为某一个柱状图数据系列添加一个表示均值的辅助线，可以如下修改配置项。

```js
const option = {
  series: [
    {
      type: "bar",
      encode: {
        x: "id",
        y: "N"
      },
      label: {
        normal: {
          show: true,
          position: "top"
        }
      },
      markLine: {
        data: [{ type: "average", name: "平均值" }]
      }
    }
  ]
};
```

#### 5.4 绘制多个数据系列

我们在准备数据的时候，除了每一个学校的本科录取人数以外，还有该学校的本科率。而上面我们所绘制的图表中只使用到了一个数据系列来表示本科录取人数，所以我们接下来为了让可视化图表更好地表达我们所准备的数据内容，需要将本科率也展示在图表上。

我们可以首先在 series 配置中添加一个新的 `bar 数据系列`，并将数据绑定 `encode.y` 改为 `P`, 即各学校的本科率。

```js
const option = {
  series: [
    {
      type: "bar",
      encode: {
        x: "id",
        y: "N"
      },
      label: {
        normal: {
          show: true,
          position: "top"
        }
      },
      markLine: {
        data: [
          {
            type: "average",
            name: "平均值",
            lineStyle: {
              color: "blue"
            }
          }
        ]
      }
    },
    {
      type: "bar",
      encode: {
        x: "id",
        y: "P"
      },
      label: {
        normal: {
          show: true,
          position: "top"
        }
      },
      markLine: {
        data: [
          {
            type: "average",
            name: "平均值",
            lineStyle: {
              color: "green"
            }
          }
        ]
      }
    }
  ]
};
```

本科录取人数的数据范围在 1000 到 1500 之间，而本科率的范围则在 0 到 1 之间，而且量纲也相异。所以我们需要借助其他辅助手段对图表进行优化。

虽然说我们比较常用的坐标轴为笛卡尔坐标系也就是直角坐标系，只有一个 X 坐标轴和一个 Y 坐标轴。但若需要将不同量纲的数据在同一个数据图表中展示，就可以使用多个不同的 Y 坐标轴表示。

我们需要在 yAxis 上添加一个新的 Y 坐标轴，然后把本科率的数据系列绑定到这个坐标轴上。

```js
const option = {
  yAxis: [
    {
      type: "value",
      name: "本科录取人数"
    },
    {
      type: "value",
      name: "本科率"
    }
  ],
  series: [
    {
      type: "bar",
      encode: {
        x: "id",
        y: "N"
      },
      label: {
        normal: {
          show: true,
          position: "top"
        }
      },
      markLine: {
        data: [
          {
            type: "average",
            name: "平均值",
            lineStyle: {
              color: "blue"
            }
          }
        ]
      }
    },
    {
      type: "bar",
      yAxisIndex: 1, // 绑定副 Y 坐标轴
      encode: {
        x: "id",
        y: "P"
      },
      label: {
        normal: {
          show: true,

          position: "top"
        }
      },
      markLine: {
        data: [
          {
            type: "average",
            name: "平均值",
            lineStyle: {
              color: "green"
            }
          }
        ]
      }
    }
  ]
};
```

## 6. 饼图 Pie

柱状图可以用于展示不同组别的数值数据的大小，而饼图的作用则是将`不同组别的数值数据合并在同一个数轴上`，并以更直观的方式展示`不同组别之间的大小关系`。

### 6.1 绘制基本饼图

同样是通过修改数据系列的类型为 pie，然后更改数据绑定 encode 中的维度信息。因为饼状图并不需要使用到直角坐标系，所以我们这里可以将前面一直都有使用到的 xAxis 和 yAxis 删除。

```js
const option = {
  dataset: {
    source: schools
  },
  series: {
    type: "pie",
    encode: {
      itemName: "name",
      value: "N"
    }
  }
};
```

### 6.2 2 添加数据标签

为饼图添加`数据标签`以表明准确的数值数据。

可以通过修改 ECharts 中饼图的 `label` 也就是标签，来显示每一个组别的组别名、准确数值及其百分比。在 `label.formatter` 中添加 `{@name}` 以显示组别名（维度 name），添加 `{@N}` 以显示每一个学校的本科录取人数，以及内置的变量 `{d}` 以显示每一个学校的百分比。

```js
const option = {
  dataset: {
    source: schools
  },
  series: {
    type: "pie",
    label: {
      formatter: "{@name}: {@N} ({d}%)"
    },
    encode: {
      value: "N",
      itemName: "name"
    }
  }
};
```

## 7. 辅助线

在我们进行可视化图表开发的时候经常会发现，如果仅仅将数据使用`数据系列`展示在图表上的话，是没办法非常直观地展示所有数据信息的。而这个时候，`辅助线`便成了帮助开发人员和分析人员更好地利用可视化图表的强有力工具。

### 7.1 辅助线基本操作

在 ECharts 中辅助线并不是一种独立的数据类型，它需要依附在某一个数据系列上以表示其与该数据系列的关系。

假设我们有以下数据集，并将其绘制成一个简单的柱状图。

```js
const data = [50, 61, 56, 46, 72, 53];
const option = {
  dataset: {
    source: data.map((y, i) => ({
      x: i + 1,
      y
    }))
  },
  xAxis: {
    type: "category"
  },
  yAxis: {
    type: "value"
  },
  series: {
    type: "bar",
    encode: {
      x: "x",
      y: "y"
    }
  }
};
const chartEl = document.querySelector("#chart");
const myChart = echarts.init(chartEl);
myChart.setOption(option);
```

通过非常简单的计算，得出这一组数据的平均数。

```js
const mean = data.reduce((left, right) => left + right) / data.length;
console.log(mean); //=> 56.333333333333336
```

如果需要将这个计算结果展示在图表上，那么根据目前所设定的坐标系可知我们需要添加一条横向的水平线，而这条水平线的纵向位置应该为 y 坐标轴上该数值所对应的位置。

在 ECharts 中需要在对应的`数据系列`上添加一个 `markLine`配置，并在 `markLine.data` 中添加一个 `yAxis` 值为对应平均值的配置。

```js
const option = {
  dataset: {
    source: data.map((y, i) => ({
      x: i + 1,
      y
    }))
  },
  xAxis: {
    type: "category"
  },
  yAxis: {
    type: "value"
  },
  series: {
    type: "bar",
    encode: {
      x: "x",
      y: "y"
    },
    markLine: {
      data: [
        {
          name: "平均线",
          yAxis: mean
        }
      ]
    }
  }
};
```

### 7.2 ECharts 的自带辅助线

除了我们可以自行计算目标辅助线的数值以外，ECharts 自身也提供了一些比较常用的辅助线，比如 `平均值`，`最大值` 和 `最小值`。

```js
const option = {
    dataset: {
      source: data.map((y, i) => ({
        x: i + 1,
        y
      }))
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      type: "value"
    },
    series: {
      type: "bar",
      encode: {
        x: "x",
        y: "y"
      },
      markLine: {
        data: [
          { name: "平均值", type: "average" },
          { name: "最大值", type: "max" },
          { name: "最小值", type: "min" }
        ]
      }
    }
  };
};
```

### 7.3 辅助线高级用法

#### 7.3.1 SPC 控制图

在传统的统计学领域中，有一种广泛用于工业生产的统计方法——质量管理。在工业生产领域中，企业为了能够稳定且长期地发展产品的质量和销量，必须要对产品生产过程中的各种数据进行监控和分析，比如生产原料、成本、产品特性、质量指标、销量等等。

而其中成本和质量指标直接关系到了企业的长期生存条件，所以对这些数据的监控和分析则显得尤为重要。其中有一种名为 `SPC 控制图`的数据可视化图表的应用非常广泛，它通过对数据进行计算并将计算结果作为辅助线绘制在图表上。这些辅助线可以帮助数据分析人员非常直观地看到数据中的总体状况和突发的异常情况等。

`SPC 控制图`事实上是多种控制图表的总称，但其核心都是相似的。`SPC 控制图`主要通过计算三个控制线：`UCL`（控制上限）、`CL`（中心线）和 `LCL`（控制下限）。在一些情况下还可以将控制图的`上下限的中间区域`分为 6 等份，并分别标记为控制 A 区、B 区以及 C 区，并通过`记录数据点落在这三个控制区域的数量`来对数据的稳定性进行直观的判定。

![SPC 控制图](https://user-gold-cdn.xitu.io/2018/10/26/166ae6040e8e262f?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

#### 7.3.2 建立数据集

假设我们通过随机方法生成一组数值数据，并将其绘制到`折线图`上。

```js
const X = [100];
const n = 50 - 1;
const r = 0.1;

function randomCoefficient(r) {
  const rand = Math.random();
  const coefficient = (rand - 0.5) * 2 * r;

  return coefficient;
}

for (let i = 0; i < n; ++i) {
  const coefficient = randomCoefficient(r);
  const newValue = X[i] * (1 + coefficient);

  X.push(newValue);
}

console.log(X); //=> [ 100, 95.23, ... ]

const data = X.map(function(x, i) {
  return { time: i + 1, value: x };
});

const option = {
  dataset: {
    source: data
  },
  xAxis: {
    type: "value",
    name: "i",
    nameLocation: "middle",
    nameGap: 25
  },
  yAxis: {
    type: "value",
    scale: true,
    name: "x",
    nameLocation: "end"
  },
  series: {
    type: "line",
    encode: {
      x: "time",
      y: "value"
    }
  }
};
```

#### 7.3.3 计算 SPC 控制图的必要数值

SPC 控制图所使用的数据主要需要计算数据的`平均值`和`标准差`（Standard deviation，并非标准误 Standard error）。平均值的计算我们使用 Lodash 中的 `_.mean()` 即可，但 Lodash 并没有提供`标准差`的计算方法，所以我们这里也需要自行实现一下标准差的计算方法。

概率论中`方差`用来度量随机变量和其数学期望（即均值）之间的偏离程度。统计中的`方差（样本方差）`是`每个样本值`与全体样本值的`平均数`之差的平方值的`平均数`。

标准差（Standard Deviation）：又常称`均方差`，是`方差`的算术平方根，用 `σ` 表示。标准差能反映一个数据集的离散程度。

其实方差与标准差都是反映一个数据集的离散程度，只是由于方差出现了平方项造成量纲的倍数变化，无法直观反映出偏离程度，于是出现了标准差。

$$ \overline{x} = \frac{\sum^{N}*{i=1} x*i}{N} \\ $$
$$ \sigma = \sqrt{\frac{\sum^{N}*{i=1}(x*i - \overline{x})^2}{N - 1}} $$

```js
function sd(array) {
  const mean = _.mean(array);

  const top = array
    .map(function(x) {
      return Math.pow(x - mean, 2);
    })
    .reduce(function(left, right) {
      return left + right;
    });
  const bottom = array.length - 1;

  return Math.sqrt(top / bottom);
}
```

计算所得数据的平均值和标准差后，便可以计算 SPC 控制图中的 UCL 和 LCL 控制值了。UCL 和 LCL 的值分别为以下：

$$ UCL = \overline{x} + 3 \times \sigma \\ $$
$$ LCL = \overline{x} - 3 \times \sigma $$

SPC 控制图可以将从 LCL 到 UCL 中间的区域等分为 6 份，显然可以得出控制区域的区间为以下：

$$
A = \left\{
\begin{array}{lr}
[\overline{x} + 2 * \sigma, \overline{x} + 3 * \sigma], & \\
[\overline{x} - 3 * \sigma, \overline{x} - 2 * \sigma] &  
 \end{array}
\right. \\
$$

$$ B = \left\{
\begin{array}{lr}
[\overline{x} + \sigma, \overline{x} + 2 * \sigma], & \\
[\overline{x} - 2 * \sigma, \overline{x} - \sigma] &  
 \end{array}
\right. \\
$$
$$ C = [\overline{x} - \sigma, \overline{x} + \sigma] $$

ECharts 提供了一个非常实用的工具 `visualMap`。它可以将图表中`某一个区域内的元素统一为一种颜色`，这正好可以应用到 SPC 控制图的三个控制区域上。

首先我们需要计算所需要的数据。

```js
const mean_X = _.mean(X);
const sd_X = sd(X);

const ucl = mean_X + 3 * sd_X;
const lcl = mean_X - 3 * sd_X;

const areaA = [
  [mean_X + 2 * sd_X, mean_X + 3 * sd_X],
  [mean_X - 3 * sd_X, mean_X - 2 * sd_X]
];
const areaB = [
  [mean_X + sd_X, mean_X + 2 * sd_X],
  [mean_X - 2 * sd_X, mean_X - sd_X]
];
const areaC = [[mean_X - sd_X, mean_X + sd_X]];
```

#### 7.3.4 绘制 SPC 控制图

首先我们将控制线通过 `markLine` 组件绘制在图表上。

```js
const option = {
  // ...

  yAxis: {
    type: "value",
    name: "x",
    nameLocation: "end",
    max: Math.max(ucl + 5, Math.max(...X)),
    min: Math.min(lcl - 5, Math.min(...X))
  },

  series: {
    // ...

    markLine: {
      data: [
        { name: "UCL", yAxis: ucl },
        { name: "Area B", yAxis: areaB[0][1] },
        { name: "Area C", yAxis: areaC[0][1] },
        { name: "Mean", yAxis: mean_X },
        { name: "Area C", yAxis: areaC[0][0] },
        { name: "Area B", yAxis: areaB[1][0] },
        { name: "LCL", yAxis: lcl }
      ]
    }
  }
};
```

然后，再结合 `visualMap`，便可以将完整的 SPC 控制图绘制出来了。

```js
const option = {
  // ...

  visualMap: {
    top: 10,
    right: 10, // visualMap 图例位置
    pieces: [
      /* Area A */ { gt: areaA[0][0], lte: areaA[0][1], color: "#cc0033" },
      /* Area B */ { gt: areaB[0][0], lte: areaB[0][1], color: "#ffde33" },
      /* Area C */ { gt: areaC[0][0], lte: areaC[0][1], color: "#096" },
      /* Area B */ { gt: areaB[1][0], lte: areaB[1][1], color: "#ffde33" },
      /* Area A */ { gt: areaA[1][0], lte: areaA[1][1], color: "#cc0033" }
    ]
  }
};
```
