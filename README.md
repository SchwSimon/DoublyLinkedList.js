# LList.js

Doubly linked list class


## Documentation

- LList properties
> **head** The first node in the list  
> **count** The list node count
```js
var list = new LList;
list.head;
list.count;
```

- Adding nodes
> **push()** Add nodes at the end of the list  
> **unshift()** Add nodes at the beginning of the list
```js
var list = new LList;
list.push(1);         // 1
list.push(2,3,4);     // 1,2,3,4
list.unshift(5);      // 5,1,2,3,4
list.unshift(6,7,8);  // 8,7,6,5,1,2,3,4
```

- Removing nodes
> **pop()** remove and return the last node  
> **shift()** remove and return the first node  
> **remove(search[, max])** remove all nodes matching the search value
```js
var list = new LList;
// ...add 1,2,3,4,5
list.pop();       // 1,2,3,4
list.shift();     // 2,3,4
list.remove(3);   // 2,4
```

- Manipulating list
> **concat(llist)** merge an LList with another one  
> **reverse()** reverse the list  
> **sort(compFunc)** sort the list
```js
var list_a = new LList;
// ...add 1,2
var list_b = new LList;
// ...add 3,4

list_a.concat(list_b);        // 1,2,3,4
list_a.reverse();             // 4,3,2,1
list_a.sort((a, b) => a > b); // 1,2,3,4
  // this is the default compare function
```

- List utilities
> **getLastNode()** Returns the last node in the list  
> **find(search[, fromIndex])** Return the first node which data strictly equals the search value
> **findIndex(index[, fromIndex])** Return the index node
> **forEach(callback[, thisArg])** Iterate over the complete list
> **filter(filterFunc[, thisArg])** Return a new LList instance with only the nodes which passed the filter function
```js
var list = new LList;
// ...add 1,2,3,4

list.getLastNode();   // last node (data:4)
list.find(2);         // second node (data:2)
list.find(2, 2);      // null
list.findIndex(0);    // first node (data:1)
list.findIndex(0, 1); // second node (data:2)

list.forEach((node, index) => {  
  // node: the current node
  // index: the current node index
});

var filteredList = list.fiter((node, index) {
  return node.data <= 2;
}); // 1,2
```
