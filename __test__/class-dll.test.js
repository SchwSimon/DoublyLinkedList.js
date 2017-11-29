'use strict';

const test = require('unit.js');
const _DLL_ = require( "../src/class-dll.js" );

describe('Class LList (Linked list)', function() {
	const dll = new _DLL_;

	it('must create a new instance of the class', function() {
		test.object(dll).isInstanceOf(_DLL_);
	});

	describe('Default properties', function() {
		it('must have head:null', function() {
			test.object(dll).hasProperty('head', null)
		});
		it('must have count:0', function() {
			test.object(dll).hasProperty('count', 0)
		});
	});

	describe('function createNode()', function() {
		it('must return a correct node object', function() {
			test.object(dll.createNode(3)).is({
				data: 3,
				next: null,
				prev: null
			});
		});
	});

	describe('function push()', function() {
		const dll = new _DLL_;
		dll.push(1.12);
		dll.push(4);
		dll.push(13);

		it('must have set the correct list head', function() {
			test.value(dll.head.data).is(1.12);
		});

		it('must have set the correct list count', function() {
			test.value(dll.count).is(3);
		});

		it('must have set the correct last node', function() {
			test.value(dll.head.next.next.data).is(13);
		});

		it('must set multiple (x5) nodes at once', function() {
			const dll = new _DLL_;
			dll.push(1,2,4,6,7,8);
			test.value(dll.count).is(6);
		});
	});

	describe('function unshift()', function() {
		const dll = new _DLL_;
		dll.unshift(1.12);
		dll.unshift(4);
		dll.unshift(13);

		it('must have set the correct list head', function() {
			test.value(dll.head.data).is(13);
		});

		it('must have set the correct list count', function() {
			test.value(dll.count).is(3);
		});

		it('must have set the correct last node', function() {
			test.value(dll.head.next.next.data).is(1.12);
		});

		it('must set multiple (x5) nodes at once', function() {
			const dll = new _DLL_;
			dll.unshift(1,2,4,6,7,8);
			test.value(dll.count).is(6);
		});
	});

	describe('function getLastNode()', function() {
		const dll = new _DLL_;

		it('must return null on 0 nodes', function() {
			test.value(dll.getLastNode()).isNull();
		});

		it('must return the correct node', function() {
			dll.push(1,2,3,4,5);
			test.value(dll.getLastNode().data).is(5);
		});
	});

	describe('function concat()', function() {
		const dll_a = new _DLL_;
		dll_a.push(1,2,3);
		const dll_b = new _DLL_;
		dll_a.push(4,5,6);
		dll_a.concat(dll_b);

		it('must throw an error if argument is not an instance of the class', function() {
			test.exception(() => {
				dll_a.concat();
			});
		});

		it('must set the correct count', function() {
			test.value(dll_a.count).is(6);
		});

		it('must set the correct head node', function() {
			test.value(dll_a.head.data).is(1);
		});

		it('must set the correct last node', function() {
			test.value(dll_a.getLastNode().data).is(6);
		});
	});

	describe('function forEach()', function() {
		const dll = new _DLL_;
		dll.push(1,2,3,4,5);

		it('must throw error if callback is not a function', function() {
			test.exception(() => {
				dll.forEach();
			})
		});

		it('sum must equal 15 (sum of all node values)', function() {
			let sum = 0;
			dll.forEach(node => {
				sum += node.data;
			});
			test.value(sum).is(15)
		});

		it('last index must be 4', function() {
			let lastIndex;
			dll.forEach((node, index) => {
				lastIndex = index;
			});
			test.value(lastIndex).is(4)
		});
	});

	describe('function filter()', function() {
		const dll = new _DLL_;
		dll.push(1,2,3,4,5);

		it('must throw error if callback is not a function', function() {
			test.exception(() => {
				dll.filter();
			})
		});

		it('must return a new instance of the class', function() {
			const filteredDll = dll.filter(() => {});
			test.object(filteredDll)
				.isNot(dll)
				.isInstanceOf(_DLL_)
		});

		it('must contain 2 nodes with the value 4(head) and 5(second node)', function() {
			const filteredDll = dll.filter(node => node.data >= 4);
			test.value(filteredDll.count).is(2);
			test.value(filteredDll.head.data).is(4);
			test.value(filteredDll.head.next.data).is(5);
		});
	});

	describe('function remove()', function() {
		const dll = new _DLL_;
		dll.push(1,1,1,2,2,2,3,3,3);

		it('must return 0 on undefined search', function() {
			test.value(dll.remove()).is(0);
		});

		it('must return 3 as remove count', function() {
			test.value(dll.remove(2)).is(3);
		});

		it('must return 6 as remaining node count', function() {
			test.value(dll.count).is(6);
		});

		it('must return 2 as remove count', function() {
			test.value(dll.remove(1, 2)).is(2);
		});

		it('must match the remaining data', function() {
			const remainingData = [];
			dll.forEach(node => remainingData.push(node.data));
			test.value(remainingData).is([1,3,3,3]);
		});
	});

	describe('function pop()', function() {
		const dll = new _DLL_;
		dll.push(1,2,3,4,5);

		it('must return the node with the value 5', function() {
			test.value(dll.pop().data).is(5);
		});

		it('must decremented the list count by 1', function() {
			test.value(dll.count).is(4);
		});

		it('must return the correct new last node', function() {
			test.value(dll.getLastNode().data).is(4);
		});
	});

	describe('function shift()', function() {
		const dll = new _DLL_;
		dll.push(1,2,3,4,5);

		it('must return the node with the value 1', function() {
			test.value(dll.shift().data).is(1);
		});

		it('must decremented the list count by 1', function() {
			test.value(dll.count).is(4);
		});

		it('must return the correct new head node', function() {
			test.value(dll.head.data).is(2);
		});
	});

	describe('function find()', function() {
		const dll = new _DLL_;
		dll.push(1,2,3,4,5);

		it('must return null on undefined search argument', function() {
			test.value(dll.find()).isNull();
		});

		it('must return the node with the value 3', function() {
			test.object(dll.find(3)).hasProperty('data', 3)
		});

		it('must return null with offset over the target node', function() {
			test.value(dll.find(3, 3)).isNull();
		});

		it('must return null when passing the targets next node', function() {
			test.value(dll.find(1, 0, dll.head.next)).isNull();
		});
	});

	describe('function findIndex()', function() {
		const dll = new _DLL_;
		dll.push(1,2,3,4,5);

		it('must return null on undefined index argument', function() {
			test.value(dll.findIndex()).isNull();
		});

		it('must return the node with the value 3', function() {
			test.object(dll.findIndex(2)).hasProperty('data', 3)
		});

		it('must return the node with the value 3', function() {
			test.object(dll.findIndex(0, 2)).hasProperty('data', 3)
		});
	});

	describe('function reverse()', function() {
		it('must reverse the list correctly', function() {
			const dll = new _DLL_;
			dll.push(1,2,3,4);
			dll.reverse();

			test.value(dll.head.data).is(4);
			test.value(dll.head.next.data).is(3);
			test.value(dll.getLastNode().data).is(1);
			test.value(dll.getLastNode().prev.data).is(2);
		});
	});

	describe('function sort()', function() {
		it('must sort the list (a > b) by default', function() {
			const dll = new _DLL_;
			dll.push(4,3,2,1);
			dll.sort();

			test.value(dll.head.data).is(1)
			test.value(dll.head.next.data).is(2)
			test.value(dll.getLastNode().data).is(4)
			test.value(dll.getLastNode().prev.data).is(3)
		});

		it('must sort the list (a < b) by the compare function', function() {
			const dll = new _DLL_;
			dll.push(1,2,3,4);
			dll.sort((a, b) => a.data < b.data);

			test.value(dll.head.data).is(4)
			test.value(dll.getLastNode().data).is(1)
		});
	});
});
