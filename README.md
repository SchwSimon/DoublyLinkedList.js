# LList.js

Javascript doubly linked list class

## Usage

```js
var list = new LList;

list.count; // the node count
list.head; // the first node in the list

list.push( 1 );     // add a node at the end of the list
list.unshift( 2 );  // add a node at the beginning of the list

var poped = list.pop();     // remove the last node
var shifted = list.shift(); // remove the first node

list.remvoe( 1 );     // remove all nodes with the given data value
list.remove( 1, 2 );  // remove a maximum of 2 nodes with the given data value

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
