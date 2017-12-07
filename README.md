# DoublyLinkedList.js

[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/dbly-linked-list-js)
![Travis build](https://travis-ci.org/SchwSimon/DoublyLinkedList.js.svg?branch=master)
[![License](https://img.shields.io/badge/license-ISC-blue.svg?style=flat)](https://opensource.org/licenses/ISC)

Class to create and handle doubly linked lists

## Installation

```sh
npm install dbly-linked-list-js --save
```

### Default node structure

```js
{
  data: "some data",  // some data
  prev: null,         // node object or null
  next: null          // node object or null
}
```

### Usage

```js
const DoublyLinkedList = require('dbly-linked-list-js');

const dll = new BinarySearchTree;
dll.head; 	// the head node
dll.count;  // the node count

  // adding nodes
list.push(1);
list.push(2,[],{},"f");   // add multiple nodes at once
list.unshift(5);
list.unshift(2,[],{},"f");// head node will be the one with the value "f" here

  // removing nodes
list.pop();       // returns the removed node
list.shift();     // ..
list.remove(3);   // remove nodes by its data value
list.remove(3, 1);// limit the remove operations

  // list manipulation
list.concat(anotherListInstance); // append the list by setting
                                  // the head node of the input list
                                  // as the next node of the last node from the current list

list.reverse(); // reverse the list

list.sort((a, b) => a.data > b.data); // sort the list by passing a compare function
                                      // the example compare function is used by default

  // list utils
list.getLastNode();   // return the last node in the list

list.find(2);         // return the node with the data value 2
list.find(3, 4);      // return the node with the data value 3
                      // beginning at the node with the index 4

list.findIndex(5);    // return the node with the index 5
list.findIndex(6, 2); // return the node with the index 6
                      // beginning at the node with the index 2

  // iterate over the list by proving a callback function
list.forEach((node, index) => {
  // node: the current node
  // index: the current node index
}, thisArg);  // optional argument to use as this in the iteration function

  // filter the list by providing a filter function
  // returns a new instance of the class
  // containing a list of nodes which passed the filter function
list.fiter((node, index) => {
  // node: the current node
  // index: the current node index
  return node.data > 2;
}, thisArg);  // optional argument to use as this in the iteration function
```
