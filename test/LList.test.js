'use strict';

const test = require('unit.js');
const _LLIST_ = require( "../LList.js" );

describe('Class LList (Linked list)', function() {
	it('must create a new instance of the class', function() {
		test.object(new _LLIST_).isInstanceOf(_LLIST_);
	});

	describe('Default properties', function() {
		let newLList = new _LLIST_;
		it('must have head:null', function() {
			test.object(newLList).hasProperty('head', null)
		});
		it('must have count:0', function() {
			test.object(newLList).hasProperty('count', 0)
		});
	});

	describe('function createNode()', function() {
		it('must return a correct node object', function() {
			let newLList = new _LLIST_;
			test.object(newLList.createNode(0)).is({
				data: 0,
				next: null,
				prev: null
			})
		});
	});

	describe('function push()', function() {
		let newLList = new _LLIST_;
		newLList.push(1);
		it('must set the list head', function() {
			test.object(newLList.head).is({
				data: 1,
				next: null,
				prev: null
			})
		});
		it('must set the list count to 1', function() {
			test.value(newLList.count).is(1)
		});
		it('must set the head\'s next node correct', function() {
			let newLList = new _LLIST_;
			newLList.push(1,2);
			test.object(newLList.head.next).is({
				data: 2,
				next: null,
				prev: newLList.head
			})
		});
	});

	describe('function unshift()', function() {
		let newLList = new _LLIST_;
		newLList.unshift(1);
		it('must set the list head', function() {
			test.object(newLList.head).is({
				data: 1,
				next: null,
				prev: null
			})
		});
		it('must set the list count to 1', function() {
			test.value(newLList.count).is(1)
		});
		it('must set the correct head node', function() {
			let newLList = new _LLIST_;
			newLList.unshift(1,2,3,4,5);
			test.object(newLList.head).is({
				data: 5,
				next: newLList.head.next,
				prev: null
			})
		});
	});

	describe('function concat()', function() {
		it('must throw an error if argument is not an instance of the class', function() {
			let newLList = new _LLIST_;
			test.exception(() => {
				LList.concat();
			});
		});
		it('must concat the list correct', function() {
			let newLList = new _LLIST_;
			newLList.push(1,2,3);
			let concatLList = new _LLIST_;
			concatLList.concat(newLList)
			test.value(concatLList.count).is(3);
			test.value(concatLList.head.data).is(1);
			test.value(concatLList.getLastNode().data).is(3);
		});
		it('must concat the list correct', function() {
			let newLList = new _LLIST_;
			newLList.push(3,4);
			let concatLList = new _LLIST_;
			concatLList.push(1,2);
			concatLList.concat(newLList)
			test.value(concatLList.count).is(4);
			test.value(concatLList.head.data).is(1);
			test.value(concatLList.getLastNode().data).is(4);
		});
	});

	describe('function getLastNode()', function() {
		it('must return null on 0 nodes', function() {
			let newLList = new _LLIST_;
			test.value(newLList.getLastNode()).isNull();
		});
		it('must return the correct node', function() {
			let newLList = new _LLIST_;
			newLList.push(1,2,3,4,5);
			test.object(newLList.getLastNode()).is({
				data: 5,
				next: null,
				prev: newLList.getLastNode().prev
			})
		});
	});

	describe('function forEach()', function() {
		let newLList = new _LLIST_;
		newLList.push(1,2,3,4,5);
		it('must throw error if callback is not a function', function() {
			test.exception(() => {
				newLList.forEach();
			})
		});
		it('sum must equal 15 (sum of all node values)', function() {
			let sum = 0;
			newLList.forEach((node) => {
				sum += node.data;
			});
			test.value(sum).is(15)
		});
		it('last index must be 4', function() {
			let lastIndex;
			newLList.forEach((node, index) => {
				lastIndex = index;
			});
			test.value(lastIndex).is(4)
		});
	});

	describe('function filter()', function() {
		let newLList = new _LLIST_;
		newLList.push(1,2,3,4,5);
		it('must throw error if callback is not a function', function() {
			test.exception(() => {
				newLList.filter();
			})
		});
		it('must return a new instance of the class', function() {
			let filteredLList = newLList.filter(() => {});
			test.object(filteredLList)
				.isNot(newLList)
				.isInstanceOf(_LLIST_)
		});
		it('must contain 2 nodes with the value 4(head) and 5(second node)', function() {
			let filteredLList = newLList.filter((node) => {
				return node.data >= 4;
			});
			test.value(filteredLList.count).is(2);
			test.value(filteredLList.head.data).is(4);
			test.value(filteredLList.head.next.data).is(5);
		});
	});

	describe('function remove()', function() {
		let newLList = new _LLIST_;
		newLList.push(1,1,1,2,2,2,3,3,3);
		it('must return 0 on undefined search', function() {
			test.value(newLList.remove()).is(0);
		});
		it('must return 3 as remove count', function() {
			test.value(newLList.remove(2)).is(3);
		});
		it('must return 6 as remaining node count', function() {
			test.value(newLList.count).is(6);
		});
		it('must return 2 as remove count', function() {
			test.value(newLList.remove(1, 2)).is(2);
		});
		it('must match the remaining data', function() {
			let remainingData = [];
			newLList.forEach((node) => remainingData.push(node.data))
			test.value(remainingData).is([1,3,3,3]);
		});
	});

	describe('function pop()', function() {
		let newLList = new _LLIST_;
		newLList.push(1,2,3,4,5);
		it('must return the node with the value 5', function() {
			test.object(newLList.pop()).is({
				data: 5,
				next: null,
				prev: null
			});
		});
		it('must decremented the list count by 1', function() {
			test.value(newLList.count).is(4);
		});
		it('must return the correct new last node', function() {
			test.value(newLList.getLastNode().data).is(4);
		});
	});

	describe('function shift()', function() {
		let newLList = new _LLIST_;
		newLList.push(1,2,3,4,5);
		it('must return the node with the value 1', function() {
			test.object(newLList.shift()).is({
				data: 1,
				next: null,
				prev: null
			});
		});
		it('must decremented the list count by 1', function() {
			test.value(newLList.count).is(4);
		});
		it('must return the correct new head node', function() {
			test.value(newLList.head.data).is(2);
		});
	});

	describe('function find()', function() {
		let newLList = new _LLIST_;
		newLList.push(1,2,3,4,5);
		it('must return null on undefined search argument', function() {
			test.value(newLList.find()).isNull();
		});
		it('must return the node with the value 3', function() {
			test.object(newLList.find(3)).hasProperty('data', 3)
		});
		it('must return null with offset over the target node', function() {
			test.value(newLList.find(3, 3)).isNull();
		});
		it('must return null with passing the targets next node', function() {
			test.value(newLList.find(1, 0, newLList.head.next)).isNull();
		});
	});

	describe('function findIndex()', function() {
		let newLList = new _LLIST_;
		newLList.push(1,2,3,4,5);
		it('must return null on undefined index argument', function() {
			test.value(newLList.findIndex()).isNull();
		});
		it('must return the node with the value 3', function() {
			test.object(newLList.findIndex(2)).hasProperty('data', 3)
		});
		it('must return the node with the value 3', function() {
			test.object(newLList.findIndex(0, 2)).hasProperty('data', 3)
		});
	});

	describe('function reverse()', function() {
		let newLList = new _LLIST_;
		newLList.push(1,2,3,4);
		it('must reverse the list correctly', function() {
			newLList.reverse();
			test.value(newLList.head.data).is(4)
			test.value(newLList.head.next.data).is(3)
			test.value(newLList.getLastNode().data).is(1)
			test.value(newLList.getLastNode().prev.data).is(2)
		});
	});

	describe('function sort()', function() {
		it('must sort the list (a > b) by default', function() {
			let newLList = new _LLIST_;
			newLList.push(4,3,2,1);
			newLList.sort();
			test.value(newLList.head.data).is(1)
			test.value(newLList.head.next.data).is(2)
			test.value(newLList.getLastNode().data).is(4)
			test.value(newLList.getLastNode().prev.data).is(3)
		});
		it('must sort the list (a < b) by the compare function', function() {
			let newLList = new _LLIST_;
			newLList.push(1,2,3,4);
			newLList.sort((a, b) => a.data < b.data);
			test.value(newLList.head.data).is(4)
			test.value(newLList.getLastNode().data).is(1)
		});
	});
});
