(function( global, factory ) {
	
	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// export as module for environments like NodeJS
		module.exports = factory( null, true );
	} else {
		factory( global, false );
	}
	
})( ( typeof window !== "undefined" ) ? window : this, function( global, noGlobal ) {
	
	"use strict";
	
	/*
	 * Create a new node structure
	 * @param {*} data The node data
	 * @return {Object}
	 */
	function createNode( data ) {
		return {
			data: data || null,
			next: null,
			prev: null
		};
	}
	
	/*
	 * checks if the the input arg is a valid LList reference
	 * @param {Object: LList} list
	 * @return {Boolean}
	 */
	function isList( list ) {
		return ( Object.getPrototypeOf( list ) === LList.prototype ) ? true : false;
	}
	
	// LList constructor
	var LList = function() {
		this.head = null;
	};
	
	/*
	 * Adds a node at the end of the list
	 * @param {*} data The node data
	 */
	LList.prototype.push = LList.prototype.add = function( data ) {
		var node = createNode( data );
		if ( !this.head ) {
			this.head = node;
		} else {
			var lastNode = this.head;
			while( lastNode.next ) {
				lastNode = lastNode.next;
			}
			lastNode.next = node;
			lastNode.next.prev = lastNode;
		}
	};
	
	/*
	 * Adds a node at the beginning of the list (becomes head)
	 * @param {*} data The node data
	 */
	LList.prototype.unshift = function( data ) {
		var node = createNode( data );
		if ( !this.head ) {
			this.head = node;
		} else {
			var headCache = this.head;
			this.head = node;
			this.head.next = headCache;
			this.head.next.prev = this.head;
		}
	};
	

	/*
	 * Remove all nodes with a given value
	 * @param {*} data The value to match against the list
	 * @param {Number} max
	 */
	LList.prototype.remove = function( data, max ) {
		max = ( typeof max !== "undefined" && max > 0 ) ? max : Number.MAX_VALUE;
		var node = this.head;
		while( node ) {
			if ( node.data == data ) {
				if ( !node.prev ) {
					this.head = node.next;
					this.head.prev = null;
				} else {
					node.prev.next = node.next;
					if ( node.next ) {
						node.next.prev = node.prev;
					}
				}
			}
			if ( --max <= 0 ) break;
			node = node.next;
		}
	};
	
	/*
	 * Remove the last node of the list
	 * @return {Object|Null} LList node object or null
	 */
	LList.prototype.pop = function() {
		if ( !this.head ) return null;
		var lastNode = this.head;
		while( lastNode.next ) {
			lastNode = lastNode.next;
		}
		lastNode.prev = null;
		return lastNode;
	};
	
	/*
	 * Remove the first node of the list
	 * @return {Object|Null} LList node object or null
	 */
	LList.prototype.shift = function() {
		if ( !this.head ) return null;
		var nodeCache = this.head;
		this.head = this.head.next;
		this.head.prev = null;
		return nodeCache;
	};
	
	/*
	 * Merge the list with another list
	 * @param {Object: List} list A LList object reference
	 */
	LList.prototype.concat = function( list ) {
		if ( !isList( list ) ) {
			throw "LList.concat: input list is not a valid LList";
		}
		if ( !list.head ) return;
		var lastNode = this.head;
		if ( lastNode ) {
			while( lastNode.next ) {
				lastNode = lastNode.next;
			}
		}
		lastNode.next = list.head;
		lastNode.next.prev = lastNode;
	}
	
	/*
	 * Returns the first node whose data matches
	 * @param {*} data The 
	 * @return {Object|Null} A LList node or null
	 */
	LList.prototype.search = function( data ) {
		var node = this.head;
		while( node ) {
			if ( node.data == data ) {
				return node;
			}
			node = node.next;
		}
		return null;
	};
	
	/*
	 * Reverse the list
	 */
	LList.prototype.reverse = function() {
		if ( !this.head || !this.head.next ) return;
		var reverseList = new LList;
		var node = this.head;
		while( node ) {
			reverseList.unshift( node.data );
			if ( node.prev ) {
				node.prev.prev = null;
				node.prev.next = null;
			}
			node = node.next;
		}
		this.head = reverseList.head;
	};
	
	/*
	 * Sort the list ( a < b )
	 */
	LList.prototype.sort = function() {
		if ( !this.head || !this.head.next ) return;
		var lastNode = this.head.next;
		while( lastNode ) {
			var prevNode = lastNode.prev;
			var sortNode = lastNode;
			while( prevNode && sortNode.data < prevNode.data ) {
				var prevDataCache = prevNode.data;
				prevNode.data = sortNode.data;
				sortNode.data = prevDataCache;
				sortNode = prevNode;
				prevNode = prevNode.prev;
			}
			lastNode = lastNode.next;
		}
	};
	
	if ( noGlobal ) {
		// return LList for export
		return LList;
	}
	
	// global define LList
	global.LList = LList;
	
});