# 前端数据可视化之 JavaScript 数据处理

## 1.基本数据的处理

### 1.1 数组/数列 的处理

- 数组的长度
- 对数组进行`增删改查`
- 以数组为单位的基本处理方法 (lodash 函数库)

详见 [数组的处理](./array.md)

### 1.2 基本统计

- 平均值
- 众数（词频，排序，裁剪）

详见 [基本统计](./basic.md)

## 2.复杂数据的处理

### 2.1 时间序列

`时间序列`一般用于表达一组建立在`时间轴上的数据`，比如工业生产设备中传感器所定时记录的数据。但由于传感器设备同样存在误差，而且由于实际应用中也有可能出现不工作的情况，所以真正所记录下来的数据很有可能是断断续续的。

这种数据集我们可以将其称为`稀疏序列`。

数组元素中必定包含用于存储每一个数据点所对应的`时间戳（Timestamp）`。

- 时间的处理 (时间库 Moment.js)
- 时间序列统计计算

详见 [时间序列](./time-series.md)

### 2.2 树形结构

`树形结构`是由多个包含子节点内容的节点（Node）所组成的，也就是说树形结构由根节点开始至每一个叶节点为止，都是由同一种数据结构组成的。

详见 [树形结构](./tree.md)

### 2.3 关系图谱

## 3. 数据结构转换

不同的数据结构各自承担着不同类型数据的承载功能。不同的数据之间有着不同的表现方式，而在实际工作中我们却常常需要将不同的数据类型进行相互转换，以满足不同的需求。

- Any <==> 字符串
- 对象 <==> 数组
- 数据集（行式数据集 <==> 列式数据集）

详见 [数据结构转换](./dataset-transition.md)

## 基于 ECharts 的基础表达性统计图表

- ECharts 简单入门（数据集 dataset，数据系列 series，坐标轴 axis）。
- 散点图 Scatter：展示`离散的数值数据`。
- 折线图 Lines： 表示`计量数据`随时间的`变化趋势`或某种特定有序排列的数值`变化趋势`。
- 柱状图 Bar: 展示`同一量纲下不同计量数据值的区别`。
- 饼图 Pie： 将`不同组别的数值数据合并在同一个数轴上`，并以更直观的方式展示`不同组别之间的大小关系`。
- 辅助线

详见[基于 ECharts 的基础表达性统计图表](./ECharts-based-basic-charts.md)
