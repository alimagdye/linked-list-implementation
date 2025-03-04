// piece of data - value
//reference to next node - next

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor(name) {
    this.name = name;
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // O(1) because we can always access the property tail and create newNode after it
  // push to end
  push(value) {
    // create a new node
    let newNode = new Node(value);
    // if it's the first node to be pushed a value:
    if (this.length === 0) {
      // make head, tail point to first node: newNode
      this.head = this.tail = newNode;
      // if it's not the first node:
    } else {
      // make the next of tail be the newNode to add the new node in the end
      this.tail.next = newNode;
      // then make tail points to last node
      this.tail = newNode;
    }
    this.length++; // increment length at every push
    return this; // return this, to enable method chaining
  }

  // to add a node at the first: O(1) because we use head
  unshift(value) {
    // create a new node: newNode
    let newNode = new Node(value);
    // if there are no nodes
    if (this.length === 0) {
      this.head = this.tail = newNode;
    }
    // if there are many nodes or one (head):
    else {
      // make newNode next points to head, but now head points to second node
      newNode.next = this.head;
      // make head points to newNode
      this.head = newNode;
    }
    this.length++;
    return this; // return this, to enable method chaining
  }

  // remove last node: O(n) because we don't know what is the node before the tail
  pop() {
    if (this.length === 0) return undefined;
    let lastNodeValue;
    // if it is only one node
    if (this.length === 1) {
      lastNodeValue = this.head.value;
      this.head = this.tail = null;
    }
    // if there are more than one nodes
    else {
      // points to head
      let current = this.head;
      // if the node is previous to last then its next will be last, and the next of last will be null
      while (current.next.next !== null) {
        current = current.next;
      }
      // move tail to its previous node
      this.tail = current;
      // remove last node: garbage collector will free it
      lastNodeValue = current.next.value;
      current.next = null;
    }
    this.length--;
    return lastNodeValue;
  }

  // removes the first node: O(1) because we know the head
  shift() {
    // case there are no nodes
    if (this.length === 0) return undefined;
    let firstNodeValue;
    // case there is one node only
    if (this.length === 1) {
      firstNodeValue = this.head.value;
      this.head = this.tail = null;
    }
    // case there are many nodes
    else {
      firstNodeValue = this.head.value;
      this.head = this.head.next;
    }
    this.length--;
    return firstNodeValue;
  }

  // takes index and return its node: O(1) if first or last node, else O(n)
  getNode(index) {
    // if it's empty or index is negative or more than or equal the length
    if (this.length === 0 || index < 0 || index >= this.length)
      return undefined;

    if (index === this.length - 1) return this.tail;
    // else: it's first or last or between
    let currentIndex = 0;
    let currentNode = this.head;
    while (true) {
      if (index === currentIndex) return currentNode;
      currentIndex++;
      currentNode = currentNode.next;
    }
  }

  // takes index and return its node value: O(1) if first or last node, else O(n)
  get(index) {
    const node = this.getNode(index);
    if (node) {
      return node.value;
    }
    return undefined;
  }

  // takes index and sets its node value: O(1) if first or last node, else O(n)
  set(index, value) {
    const node = this.getNode(index);
    if (node) {
      node.value = value;
    }
    return undefined;
  }

  // takes index and value and insert this value before the index node: O(n), O(1) if at start or end, or after end (only end + 1)
  insert(index, value) {
    // case inserting at start:
    if (index === 0) this.unshift(value); // we used unshift, as we can't get node before head
    // case inserting at end or after end or between start and end:
    let newNode = new Node(value);
    // get the node before the one at index
    const nodeBeforeIndex = this.getNode(index - 1);
    // if it exists
    if (nodeBeforeIndex) {
      // get the node after it (node at index passed)
      let afterNewNode = nodeBeforeIndex.next;
      nodeBeforeIndex.next = newNode;
      // add the node at index passed after newNode
      newNode.next = afterNewNode;
      this.length++;
    }
    // if doesn't exist: means more than length, or less than 0
    return undefined;
  }

  // remove node and return its value: O(n), O(1) if first
  remove(index) {
    // if it's empty or index is negative or more than or equal last:
    if (this.length === 0 || index < 0 || index >= this.length)
      return undefined;
    // if there is only one node:
    if (index === 0) return this.shift();

    // if there are more than one but index is between first, last or last:
    let nodeBeforeIndex = this.getNode(index - 1);
    let nodeToRemoveVal = nodeBeforeIndex.next.value;
    nodeBeforeIndex.next = nodeBeforeIndex.next.next;
    this.length--;
    return nodeToRemoveVal;
  }

  // O(n)
  reverse() {
    // if there is only one node don't do any thing:
    if (this.length === 1 || this.length === 0) return;
    // if there are only two nodes or more:
    // set tail to head
    this.tail = this.head;
    // set pointers: left on first node (head), right on second node (after head)
    let left = this.head,
      right = this.head.next;
    // make tail.next be null as normal
    this.tail.next = null;
    // make another pointer: beforeLeft points to node before left node
    let beforeLeft;
    // while not reaching end: travers the list
    while (right !== null) {
      beforeLeft = left; // make beforeLeft points to left node
      left = right; // make left points to its next node which is right node
      right = right.next; // make right be its next node
      left.next = beforeLeft; // change direction of pointer: make left points to its previous node instead of its next
    }
    this.head = left; // in the end right will be null, left will be tail, so make head points to tail
  }

  // O(n)
  display() {
    if (this.length === 0) {
      console.log(this.name + " [ ]");
      return;
    }
    let current = this.head;
    let str = this.name + " [ ";
    if (typeof current.value === "string") str += "'" + current.value + "'";
    else if (typeof current.value === "object")
      str += "Array(" + current.value + ")";
    else str += current.value;
    current = current.next;
    // while not null
    while (current !== null) {
      if (typeof current.value === "string") str += ", '" + current.value + "'";
      else if (typeof current.value === "object")
        str += ", Array(" + current.value + ")";
      else str += ", " + current.value;
      current = current.next;
    }
    str += " ]";
    console.log(str);
  }
}

const list1 = new SinglyLinkedList("list1");
list1
  .push(100)
  .push("Hello")
  .push("MR:")
  .push([9, 9, "yes"])
  .push("Ali")
  .push("numbers")
  .push(1);
list1.push([1, 2, 3]);
console.log(list1.head); // to debug (fast print)
list1.display();
console.log(list1.pop());
console.log(list1.pop());
list1.display();
console.log(list1.shift());
list1.display();
list1.unshift("add to first");
list1.display();
console.log(list1.get(0));
console.log(list1.get(2));
console.log(list1.get(5));
console.log(list1.get(9)); // more than the length
list1.set(1, "Hi");
list1.display();
list1.insert(6, 7);
list1.display();
console.log(list1.remove(3));
list1.display();

console.log();

const list2 = new SinglyLinkedList("list2");
list2.display();
console.log(list2.pop());
console.log(list2.shift());
list2.unshift("first node");
list2.display();
console.log(list2.shift());
console.log(list2.get(0)); // list is empty
list2.insert(0, "yay");
list2.display();
list2.remove(0);
list2.display();
list2.push(1);
list2.display();
list2.reverse();
list2.display();
list2.push(2).push(3).push(4);
list2.reverse();
list2.display();
list2.remove(3);
list2.display();
list2.reverse();
list2.display();
