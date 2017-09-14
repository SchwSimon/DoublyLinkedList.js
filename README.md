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
                  // {1,2,5,2,4}
list.pop();       // {1,2,5,2}
list.shift();     // {2,5,2}
list.remove( 2 ); // {5} 
// list.remove( 2, 1 ); // {5,2}
// by passing a second {Number} argument you can set the maximum of remove operations allowed
```



```js

list.concat( anotherList ); // merge the list with another list (from LList)

var node = list.search( 1 );  // search and return the first node which data value matches

list.reverse(); // reverses the list

list.sort();  // sorts the list (a < b)

var lastNode = list.getLastNode();  // returns the last node of the list

list.forEach( function( node, index ) { // iterate over the list
 // node the current node
 // the current node index
 /// A return statement which does NOT return undefined
 /// stops the loop and forEach will return the given value!
});

```
