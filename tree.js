class Node {
  // 构造函数
  constructor(value) {
    this.value = value;
    this.children = [];

    // 默认一个节点在产生时为一个无父节点的根节点
    this.parent = null;
  }

  // 增加 子节点
  addChild(node) {
    // 指定子节点的父节点属性
    node.parent = this;

    this.children.push(node);
    return this;
  }

  // 获取 兄弟节点
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

  // 获取 degree 值
  get degree() {
    return this.children.length;
  }

  // 获取 depth 值
  get depth() {
    let depth = 0;
    let currentNode = this;
    while (currentNode.parent) {
      currentNode = currentNode.parent;
      depth++;
    }
    return depth;
  }
}

const root = new Node("root");
const node1 = new Node("node 1");
const node2 = new Node("node 2");
const node3 = new Node("node 3");

root.addChild(node1).addChild(node2);
node1.addChild(node3);
console.log(node1.siblings()); //=> [Node{'node 2'}]...
