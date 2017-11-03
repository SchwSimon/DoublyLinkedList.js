(function(global, factory) {

	"use strict";

	if (typeof module === "object" && typeof module.exports === "object") {
		// export as module for environments like NodeJS
		module.exports = factory(null, true);
	} else {
		factory(global, false);
	}

})((typeof window !== "undefined") ? window : this, function(global, noGlobal) {

	"use strict";

	/**
	 * Linked list class
	 */
	class LList {

		/**
		 * constructor
		 */
		constructor() {
			this.head = null;
			this.count = 0;
		}

		/**
		 * Create a new node object
		 * @param {*|Null} value The node data
		 * @return {Object} node
		 */
		createNode(data = null) {
			return {
				data: data === undefined ? null : data,
				next: null,
				prev: null
			}
		}

		/**
		 * Add nodes at the end of the list & increment the count
		 * @param {*} data The node data
		 */
		push(...args) {
			args.forEach(data => {
				let _node = this.createNode(data);
				this.count++;
				if (!this.head) {
					this.head = _node;
				} else {
					let lastNode = this.getLastNode();
					lastNode.next = _node;
					lastNode.next.prev = lastNode;
				}
			});
		}

		/**
		 * Add nodes at the head of the list & increment the count
		 * @param {*} data The node data
		 */
		unshift(...args) {
			args.forEach(data => {
				let _node = this.createNode(data);
				this.count++;
				if (!this.head) {
					this.head = _node;
				} else {
					let oldHead = Object.assign({}, this.head);
					this.head = _node;
					this.head.next = oldHead;
					this.head.next.prev = this.head;
				}
			});
		}

		/**
		 * Merge LLists
		 * @param {Object} list A LList instance
		 */
		concat(llist) {
			if (!llist instanceof LList) throw 'concat value is not an instance of LList';
			if (!llist.head) return;
			if (!this.head) {
				this.head = llist.head;
				this.count = llist.count;
			} else {
				let lastNode = this.getLastNode();
				lastNode.next = llist.head;
				lastNode.next.prev = lastNode;
				this.count += llist.count;
			}
		};

		/**
		 * Get the last node in the list
		 * @return {Object|Null} The last node in the list or null
		 */
		getLastNode(node = this.head) {
			if (!node) return null;
			while(node.next) {
				node = node.next;
			}
			return node;
		}

		/**
		 * Iterate over the list
		 * and invoke the callback function for each node
		 * @param {Function} callback function which gets called for each node
		 * * providing the current node and index as arguments
		 * * @args {Object} The current node
		 * * @args {Number} The current node's list index
		 * @param {Object} thisArg Optional argument to be accessible in
		 * * the callback funcion as this else it will be the class instance
		 * @throws Error if callback is not a function
		 */
		forEach(callback, thisArg = this, node = this.head) {
			if (typeof callback !== 'function') throw 'callback must be a function';
			if (!node) return;
			let index = 0;
			while(node) {
				callback.call(thisArg, node, index++);
				node = node.next;
			}
		}

		/**
		 * Returns a new filtered instance of the class
		 * @param {Function} callback filter function which gets called for each node
		 * * providing the current node and index as arguments
		 * * if it returns true the node will be kept else not
		 * * @args {Object} The current node
		 * * @args {Number} The current node's list index
		 * @param {Object} thisArg Optional argument to be accessible in
		 * * the callback funcion as this else it will be the class instance
		 * @return new LList instance
		 * @throws Error if callback is not a function
		 */
		filter(callback, thisArg = this) {
			if (typeof callback !== 'function') throw 'callback must be a function';
			let filteredData = [];
			this.forEach((node, index) => {
				if (callback.call(this, node, index))
					filteredData.push(node.data);
			}, thisArg);
			let newList = new LList;
			newList.push(...filteredData);
			return newList;
		}

		/**
		 * Remove all nodes which data matches the search value
		 * @param {*} search The search value
		 * @param {Number} max maximum node deletions
		 * @return {Number} removeCount the count of removed nodes
		 */
		remove(search, max = null, node = this.head) {
			let removeCount = 0;
			while(node) {
				if (node.data === search) {
					this.count--;
					removeCount++;
					if (!node.prev) {
						this.head = node.next;
						this.head.prev = null;
					} else {
						node.prev.next = node.next;
						if (node.next)
							node.next.prev = node.prev;
					}
					if (max && removeCount === max) break;
				}
				node = node.next;
			}
			return removeCount;
		}

		/**
		 * Remove and return the last node of the list and decrement the node count
		 * @return {Object|Null} The removed node or null
		 */
		pop() {
			let lastNode = this.getLastNode();
			if (lastNode) {
				lastNode.prev.next = null;
				this.count--;
			}
			lastNode.prev = null;
			return lastNode;
		}

		/**
		 * Remove and return the head node of the list and decrement the node count
		 * @return {Object|Null} The removed node or null
		 */
		shift() {
			if (!this.head) return null;
			let headNode = this.head;
			if (!this.head.next) {
				this.head = null;
			} else {
				this.head = headNode.next;
				this.head.prev = null;
				headNode.next = null;
			}
			this.count--;
			return headNode;
		}

		/**
		 * Returns the first node whose data matches the search
		 * @param {*} search search value
		 * @param {Number} fromIndex the starting index
		 * @param {Object} node the node to begin with
		 * @return {Object|Null} node or null
		 */
		find(search, fromIndex = 0, node = this.head) {
			let index = 0;
			while(node) {
				if (index >= fromIndex)
					if (node.data === search)
						return node;
				node = node.next;
				index++;
			}
			return null;
		}

		/**
		 * Return the node with the given index
		 * @param {Number} index the search index
		 * @param {Number} fromIndex the starting index
		 * @return {Object|Null} node or null
		 */
		findIndex(index, fromIndex = 0, node = this.head) {
			let _index = 0;
			while(node) {
				if (_index >= fromIndex)
					if ((_index - fromIndex) === index)
						return node;
				node = node.next;
				_index++;
			}
			return null;
		}

		/**
		 * Reverse the list
		 */
		reverse() {
			var revList = new LList;
			this.forEach((node) => {
				revList.unshift(node.data);
			});
			this.head = revList.head;
		}

		/**
		 * Sort the list
		 * @param {Function} compFunc The compare function that defines the sort order
		 */
		sort(compFunc = (a,b) => a.data > b.data) {
			this.forEach((node) => {
				let prevNode = node.prev;
				while(prevNode && compFunc(prevNode, node)) {
					let prevNodeData = prevNode.data;
					prevNode.data = node.data;
					node.data = prevNodeData;
					node = prevNode;
					prevNode = prevNode.prev;
				}
			});
		}

	}

	if (noGlobal) return LList;

	global.LList = LList;

});
