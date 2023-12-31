export const Node = (data, left = null, right = null) => {
  return {
    thisNode: data,
    leftNode: left,
    rightNode: right,
  };
};

export const Tree = (data) => {
  let treeRoot = buildTree(data);
  //   console.log({ treeRoot });

  function buildTree(data) {
    if (data.length == 1) {
      return Node(data[0]);
    } else {
      let half = Math.ceil((data.length - 1) / 2);
      let node = Node(data[half]);
      if (data.length > 1) {
        let left = data.slice(0, half);
        node.leftNode = buildTree(left);
      }
      if (data.length > 2) {
        let right = data.slice(half + 1);
        node.rightNode = buildTree(right);
      }
      return node;
    }
  }

  function insert(num, currentNode = treeRoot) {
    if (num == currentNode.thisNode) return;
    else if (num < currentNode.thisNode && !currentNode.leftNode) {
      return (currentNode.leftNode = Node(num));
    } else if (num > currentNode.thisNode && !currentNode.rightNode) {
      return (currentNode.rightNode = Node(num));
    } else if (num < currentNode.thisNode) {
      return insert(num, currentNode.leftNode);
    } else if (num > currentNode.thisNode) {
      return insert(num, currentNode.rightNode);
    }
  }

  function deleteNode(num, currentNode = treeRoot) {
    if (!currentNode.thisNode) {
      console.log(`${num} not found`);
      return;
    }
    if (
      num == currentNode.thisNode &&
      currentNode.leftNode &&
      currentNode.rightNode
    ) {
      console.log("multiple child parent");
      function findNextNum(xNode) {
        if (!xNode.leftNode) {
          console.log(xNode.thisNode);
          replacementNode = xNode.thisNode;
          deleteNode(xNode.thisNode);
          return replacementNode;
        } else {
          return findNextNum(xNode.leftNode);
        }
      }
      currentNode.thisNode = findNextNum(currentNode.rightNode);
      return currentNode.thisNode;
    }
    if (
      (num == currentNode.thisNode &&
        currentNode.leftNode &&
        !currentNode.rightNode) ||
      (num == currentNode.thisNode &&
        !currentNode.leftNode &&
        currentNode.rightNode)
    ) {
      if (!currentNode.rightNode) {
        currentNode.thisNode = currentNode.leftNode.thisNode;
        currentNode.leftNode = null;
        return currentNode.thisNode;
      }
      if (!currentNode.leftNode) {
        currentNode.thisNode = currentNode.rightNode.thisNode;
        currentNode.rightNode = null;
        return currentNode.thisNode;
      }
    }
    if (
      currentNode.leftNode &&
      num == currentNode.leftNode.thisNode &&
      !currentNode.leftNode.leftNode &&
      !currentNode.leftNode.rightNode
    ) {
      console.log(currentNode.thisNode.leftNode + " removed");
      currentNode.leftNode = null;
      return num;
    }
    if (
      currentNode.rightNode &&
      num == currentNode.rightNode.thisNode &&
      !currentNode.rightNode.leftNode &&
      !currentNode.rightNode.rightNode
    ) {
      console.log(currentNode.thisNode.rightNode + " removed");
      currentNode.rightNode = null;
      return num;
    } else {
      if (num < currentNode.thisNode) {
        return deleteNode(num, currentNode.leftNode);
      } else {
        if (num > currentNode.thisNode) {
          return deleteNode(num, currentNode.rightNode);
        }
      }
    }
  }

  function find(num, currentNode = treeRoot) {
    if (currentNode.thisNode == null) return "no node found";
    if (num == currentNode.thisNode) {
      console.log({ currentNode });
      return currentNode;
    }
    if (num < currentNode.thisNode) {
      return find(num, currentNode.leftNode);
    }
    if (num > currentNode.thisNode) {
      return find(num, currentNode.rightNode);
    }
  }

  function depth(num, currentNode = treeRoot) {
    if (currentNode.thisNode == null) return "no node found";
    if (num == currentNode.thisNode) {
      return 0;
    }
    if (num < currentNode.thisNode) {
      return (height = 1 + depth(num, currentNode.leftNode));
    }
    if (num > currentNode.thisNode) {
      return (height = 1 + depth(num, currentNode.rightNode));
    }
  }

  function levelOrder(levelNum, func = 0) {
    let nodeArr = [treeRoot];
    function constLevel(nodeArr, lev = 0) {
      if (lev == levelNum) return { nodeArr };
      let queue = [];
      nodeArr.forEach((el) => queue.push(el.leftNode, el.rightNode));
      console.log(queue);
      return constLevel(queue, lev + 1);
    }
    if (func) {
      let returnArr = constLevel(nodeArr);
      console.log({ returnArr });
      returnArr.nodeArr.forEach((el) => func(el.thisNode));
      return `${func.name} completed on ${levelNum}: ${returnArr.values}`;
    }
    return constLevel(nodeArr);
  }

  function preOrder(func, node = treeRoot) {
    let nodeArr = [];
    function traverseTree(node, func) {
      if (!node) return;
      nodeArr.push(node.thisNode);
      traverseTree(node.leftNode, func);
      traverseTree(node.rightNode, func);
      return nodeArr;
    }
    if (func) {
      let returnArr = traverseTree(node);
      console.log({ returnArr });
      return returnArr.forEach((el) => func(el));
    } else {
      return traverseTree(node);
    }
  }

  function inOrder(func, node = treeRoot) {
    let nodeArr = [];
    function traverseTree(node, func) {
      if (!node) return;
      traverseTree(node.leftNode, func);
      nodeArr.push(node.thisNode);
      traverseTree(node.rightNode, func);
      return nodeArr;
    }
    if (func) {
      let returnArr = traverseTree(node);
      console.log({ returnArr });
      return returnArr.forEach((el) => func(el));
    } else {
      return traverseTree(node);
    }
  }

  function postOrder(func, node = treeRoot) {
    let nodeArr = [];
    function traverseTree(node, func) {
      if (!node) return;
      traverseTree(node.leftNode, func);
      traverseTree(node.rightNode, func);
      nodeArr.push(node.thisNode);
      return nodeArr;
    }
    if (func) {
      let returnArr = traverseTree(node);
      console.log({ returnArr });
      return returnArr.forEach((el) => func(el));
    } else {
      return traverseTree(node);
    }
  }

  function height(num = treeRoot.thisNode) {
    // let num = tree.treeRoot.thisNode;
    let node = find(num);
    function findHeight(node) {
      if (!node || (!node.leftNode && !node.leftNode)) return 0;
      else {
        let leftHeight = findHeight(node.leftNode);
        let rightHeight = findHeight(node.rightNode);
        if (leftHeight > rightHeight) return leftHeight + 1;
        else return rightHeight + 1;
      }
    }
    return findHeight(node);
  }

  function isBalanced() {
    let nodeArr = [];
    function findLeaf(currentNode = treeRoot) {
      if (!currentNode) return;
      if (!currentNode.leftNode && !currentNode.rightNode) {
        leafHeight = depth(currentNode.thisNode);
        if (!nodeArr.includes(leafHeight)) {
          if (!nodeArr.length) {
            nodeArr.push(leafHeight);
          } else if (leafHeight < nodeArr[0]) {
            nodeArr.unshift(leafHeight);
          } else if (leafHeight > nodeArr[nodeArr.length - 1]) {
            nodeArr.push(leafHeight);
          }
        }
        return nodeArr;
      }
      findLeaf(currentNode.leftNode);
      findLeaf(currentNode.rightNode);
    }
    findLeaf();
    return nodeArr[nodeArr.length - 1] - nodeArr[0] < 2;
  }

  function rebalance() {
    Tree(inOrder());
  }

  const prettyPrint = (node = treeRoot, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.rightNode !== null) {
      prettyPrint(
        node.rightNode,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.thisNode}`);
    if (node.leftNode !== null) {
      prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  return { treeRoot, height, prettyPrint, levelOrder };
};

// Tree([
//   1, 2, 4, 6, 8, 10, 14, 16, 18, 19, 22, 25, 26, 29, 33, 37, 39, 42, 46, 51,
// ]);
