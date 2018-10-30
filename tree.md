# 树形结构

## 1.创建节点

`树形结构`是由多个包含子节点内容的节点（Node）所组成的，也就是说树形结构由根节点开始至每一个叶节点为止，都是由同一种数据结构组成的。

一般来说，普通树形结构的节点由一个用于存储节点内容的空间，以及一个用于存储子节点的引用（在其他语言中也可以为指针）的数组所组成。

### 1. JavaScript 类的写法

```js
class Person {
  // 构造函数
  constructor(givenName, familyName) {
    this.givenName = givenName;
    this.familyName = familyName;
  }
  // getter
  get fullName() {
    return `${this.givenName} ${this.familyName}`;
  }
  // 普通方法
  hello() {
    return `Hello, my name is ${this.fullName}`;
  }
}

const me = new Person("Will", "Gunn");
console.log(me.hello()); //=> Hello, my name is Will Gunn
```

### 2. 定义节点类型

一般情况下每一个节点都包含一个用于`存储内容的容器`，我们可以使用一个简单的 `value 属性`来表达；而对于`子节点的引用`则可以使用一个`数组属性 children`来承载。

```js
class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

const node = new Node("node value");
```

有了节点以后，就需要将多个节点组合起来了，比如将两个节点加入到另外一个节点中以作为其子节点。那么我们可以先为这个 Node 类添加一个 `addChild` 方法。

```js
class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
    return this;
  }
}
```

我们定义四个节点，其中一个包含内容 root 的节点作为根节点，而节点 node 1 和 node 2 作为根节点的子节点，节点 node 3 作为节点 node 1 的子节点。从而形成了一棵非常简单的树形结构。

```js
const root = new Node("root");
const node1 = new Node("node 1");
const node2 = new Node("node 2");
const node3 = new Node("node 3");

root.addChild(node1).addChild(node2);
node1.addChild(node3);
```

每一种数据结构被发明出来就肯定会有其使用的方法和特征，就如数组结构有其长度特征 length，包含数字的数组则有平均值等等数学特征值。那么对于树形结构及其节点来说又有哪些特征值呢？

每一个节点还可以包含其父节点的信息，所以在之前的 Node 类中我们可以加入一个 parent 属性，以存储该节点的父节点。

而在前面定义的 addChild 方法中，我们就可以将定义父节点这个任务放在这里了。

```js
class Node {
  // 构造函数
  constructor(value) {
    this.value = value;
    this.children = [];

    // 默认一个节点在产生时为一个无父节点的根节点
    this.parent = null;
  }

  addChild(node) {
    // 指定子节点的父节点属性
    node.parent = this;

    this.children.push(node);
    return this;
  }
}
```

### 3. 扩展节点类型

#### 3.1 Siblings 兄弟节点

当每一个节点有了其父节点的信息之后，就可以去尝试访问它的兄弟节点了，通过查询 node.parent.children 中的节点排除掉自己后便是它的兄弟节点。

```js
class Node {
  // 构造函数
  constructor(value) {
    this.value = value;
    this.children = [];

    // 默认一个节点在产生时为一个无父节点的根节点
    this.parent = null;
  }

  addChild(node) {
    // 指定子节点的父节点属性
    node.parent = this;

    this.children.push(node);
    return this;
  }

  siblings() {
    const self = this;

    if (this.parent) {
      // 父节点的子节点，排除自身，即为兄弟节点
      return this.parent.children.filter(function(node) {
        return node !== self;
      });
    } else {
      return [];
    }
  }
}

const root = new Node("root");
const node1 = new Node("node 1");
const node2 = new Node("node 2");
const node3 = new Node("node 3");

root.addChild(node1).addChild(node2);
node1.addChild(node3);
console.log(node1.siblings()); //=> [Node{'node 2'}]...
```

#### 3.2 degree

在树形结构中，每一个节点的 degree 值就等于`直接与它相连的子节点数`。这里我们就可以用到前面学习到的“虚拟属性”了。

```js
class Node {
  // 构造函数
  constructor(value) {
    this.value = value;
    this.children = [];
    this.parent = null;
  }
  // 增加 子节点
  addChildren(node) {
    node.parent = this;
    this.children.push(node);
    return this;
  }

  // 获取 兄弟节点
  siblings() {
    const self = this;
    if (this.parent) {
      return this.parent.children.filter(function(item) {
        return item !== self;
      });
    } else {
      return [];
    }
  }

  // 获取 degree 值
  get degree() {
    return this.children.length;
  }
}

const root = new Node("root");
const node1 = new Node("node 1");
const node2 = new Node("node 2");

root.addChild(node1);
root.addChild(node2);

console.log(root.degree); //=> 2...
```

#### 3.3 Depth 深度

深度的定义为`从某一个节点`到其所在的树形结构中的`根节点`所经过`边`的数目。

就好比上面的例子中，从节点 node 3 到节点 node 1 最后到根节点 root 中间经过了`两个边`，所以节点 node 3 的深度则为 2。

这个在 JavaScript 中也是非常好实现的，只需不断检查经过的每一个父节点是否存在继续往根部走的父节点，并`记录循环次数`即可。当找到了没有父节点的节点时，则该节点就是这棵树的根节点，而`循环次数`便是目标节点的深度值。

```js
class Node {
  // 构造函数
  constructor(value) {
    this.value = value;
    this.children = [];
    this.parent = null;
  }
  // 增加 子节点
  addChildren(node) {
    node.parent = this;
    this.children.push(node);
    return this;
  }

  // 获取 兄弟节点
  siblings() {
    const self = this;
    if (this.parent) {
      return this.parent.children.filter(function(item) {
        return item !== self;
      });
    } else {
      return [];
    }
  }

  // 获取 degree 值
  get degree() {
    return this.children.length;
  }

  // 获取 depth 值
  get depth() {
    const depth = 0;
    const currNode = this;
    while (currNode.parent != null) {
      currNode = currNode.parent;
      depth++;
    }
    return depth;
  }
}

const root = new Node("root");
const node1 = new Node("node 1");
const node3 = new Node("node 3");

root.addChild(node1);
node1.addChild(node3);
console.log(node3.depth); //=> 2
```

#### 3.4 Height 高度

高度的定义则是以`某一个节点为根`所形成的树形结构（该树形结构可能是一棵更大的树形结构中的一部分，即子树）中，这个节点到`最深的子节点`中间经过的`边`的数目。

每一个节点的高度其实就是等于以该节点为根的的子树中，`最深的一个子节点的深度`。也就是说只要找到最深的一个子节点，并计算当前子树的深度即可。

但是我们前面在计算深度的时候是直接计算整棵树的深度，那么为了能够让每一个子节点都能够`计算指定子树的深度`，我们需要对前面的代码进行一些修改。

我们可以首先假设每一棵树的根目录都有一个虚拟的父节点 null，那么就直接在计算深度时候，将 `currNode.parent != null` 改成 `currNode.parent != root`，当 root 为 null 的时候将最后的结果加上 1 便是该节点到整棵树根节点的深度。

定义一个 FIFO（First In First Out，先进的先出）的队列，将每一个层的节点不断地推入到这个队列中，并不断取出前面被推入的节点，并检查是否有子节点，直到最后一个节点便是最深子节点。

```js
class Node {
  // 构造函数
  constructor(value) {
    this.value = value;
    this.children = [];
    this.parent = null;
  }
  // 增加 子节点
  addChildren(node) {
    node.parent = this;
    this.children.push(node);
    return this;
  }

  // 获取 兄弟节点
  siblings() {
    const self = this;
    if (this.parent) {
      return this.parent.children.filter(function(item) {
        return item !== self;
      });
    } else {
      return [];
    }
  }

  // 获取 degree 值
  get degree() {
    return this.children.length;
  }

  getDepthByRoot(root) {
    let depth = 0;
    let currNode = this;

    while (currNode.parent !== root) {
      depth++;
      currNode = currNode.parent;
    }

    return depth + 1;
  }

  // 获取 depth 值
  get depth() {
    return this.getDepthByRoot(null);
  }

  // 获取 height 值
  get height() {
    // 定义一个 先进先出 的队列
    const queue = [this];
    let deepestNode = this;

    while (queue.length > 0) {
      const len = queue.length;

      for (let i = 0; i < len; ++i) {
        const currNode = queue.shift();

        deepestNode = currNode;

        if (currNode.children.length > 0) {
          queue.push(...currNode.children);
        }
      }
    }

    return deepestNode.getDepthByRoot(this);
  }
}

const root = new Node("root");
const node1 = new Node("node 1");
const node2 = new Node("node 2");
const node3 = new Node("node 3");
const node4 = new Node("node 4");
const node5 = new Node("node 5");
const node6 = new Node("node 6");

root.addChild(node1);
root.addChild(node2);
node1.addChild(node3);
node1.addChild(node4);
node2.addChild(node5);
node5.addChild(node6);

console.log(root.height); //=> 3
console.log(node1.height); //=> 1
console.log(node2.height); //=> 2
```

#### 3.5 树形节点代码清单

最后我们便得到了一个完整的树形结构节点类，以用于完成一些我们需要的需求实现。

```js
class Node {
  constructor(name) {
    this.name = name;
    this.parent = null;
    this.children = [];
  }

  addChild(node) {
    node.parent = this;
    this.children.push(node);

    return this;
  }

  siblings() {
    const self = this;

    if (this.parent) {
      return this.parent.children.filter(function(node) {
        return node !== self;
      });
    } else {
      return [];
    }
  }

  get degree() {
    return this.children.length;
  }

  getDepthByRoot(root) {
    let depth = 0;
    let currNode = this;

    while (currNode.parent !== root) {
      depth++;
      currNode = currNode.parent;
    }

    return depth + 1;
  }

  get depth() {
    return this.getDepthByRoot(null);
  }

  get height() {
    const queue = [this];
    let deepestNode = this;

    while (queue.length > 0) {
      const len = queue.length;

      for (let i = 0; i < len; ++i) {
        const currNode = queue.shift();

        deepestNode = currNode;

        if (currNode.children.length > 0) {
          queue.push(...currNode.children);
        }
      }
    }

    return deepestNode.getDepthByRoot(this);
  }

  toString(join = true) {
    let parts = [this.name];

    if (this.children.length > 0) {
      parts = parts.concat(
        this.children
          .map(function(node) {
            return node.toString(false);
          })
          .reduce(function(left, right) {
            return left.concat(right);
          })
          .map(function(line) {
            return "  " + line;
          })
      );
    }

    if (join) {
      return parts.join("\n");
    } else {
      return parts;
    }
  }
}
```
