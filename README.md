# LList.js

Doubly linked list class


## Documentation

- List properties
> **head** The first node in the list  
> **count** The list node count
```js
var list = new LList;
list.head;
list.count;
```

- Adding nodes
> **push()** Add a node at the end of the list  
> **unshift()** Add a node at the beginning of the list
```js
var list = new LList;
list.push( 1 );    // {1}
list.unshift( 2 ); // {2,1}
```

- Removing nodes
> **pop()** remove and return the last node  
> **shift()** remove and return the first node  
> **remove()** remove nodes by its data value
```js
var list = new LList;
// ... {1,2,5,2,4}
list.pop();       // {1,2,5,2}
list.shift();     // {2,5,2}
list.remove( 2 ); // {5} 
// list.remove( 2, 1 ); // {5,2}
// by passing a second {Number} argument you can set the maximum of remove operations allowed
```

- Manipulating list
> **concat()** merge an LList with another one  
> **reverse()** reverse the list  
> **sort()** sort the list (a < b)
```js
var list_a = new LList;
// ... {1,2}
var list_b = new LList;
// ... {3,4}

list_a.concat( list_b );  // {1,2,3,4}
list_a.reverse();         // {4,3,2,1}
list_a.sort();            // {1,2,3,4}
```

- List utilities
> **search()** Search and returns the first node which data non strictly equals the search value  
> **getLastNode()** Returns the last node in the list  
> **forEach()** Iterates over the complete list as long as no non-undefined return occurs.
```js
var list = new LList;
// ... {1,2,3,4}

list.search( 2 );   // returns the second node
list.getLastNode(); // returns the last node

list.forEach(function( node, index ) {  
  // node: the current node
  // index: the current node index
  /// A return; statement which does NOT return undefined
  /// stops the loop and forEach() will return the return value!
});
```
