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
		
	}
	
	// LList constructor
	var LList = function() {
		this.head = null;
		this.count = 0;
	};
	
	/*
	 * Iterates over the complete list
	 * @param {Function} callFunc The function to be called for each node in the list
	 * * INFO: if callFunc returns non undefined the loop will break and the return value will be returned!
	 * * @this Will be the same list context reference
	 * * @args {Object} The current node
	 * * @args {Number} The current node's list index
	 */
	LList.prototype.forEach = function( callFunc ) {
		if ( !this.head ) return;
		var node = this.head;
		var index = 0;
		while( node ) {
			var returnValue = callFunc.call( this, node, index++ );
			if ( typeof returnValue !== "undefined" ) return returnValue;	// return 
			node = node.next;
		}
	};
	
	/*
	 * Get the last node in the list
	 * @return {Object|Null} The last node in the list or null
	 */
	LList.prototype.getLastNode = function() {
		if ( !this.head ) return null;
		if ( !this.head.next ) return this.head;
		var node = this.head.next;
		while( node.next ) {
			node = node.next;
		}
		return node;
	};
	
	/*
	 * Adds a node at the end of the list
	 * @param {*} data The node data
	 */
	LList.prototype.push = function( data ) {
		var node = createNode( data );
		if ( !this.head ) {
			this.head = node;
		} else {
			var lastNode = this.getLastNode();
			lastNode.next = node;
			lastNode.next.prev = lastNode;
		}
		this.count++;
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
			var headNodeCache = this.head;
			this.head = node;
			this.head.next = headNodeCache;
			this.head.next.prev = this.head;
		}
		this.count++;
	};
	

	/*
	 * Remove all nodes with a given value
	 * @param {*} search The value to match against the list
	 * @param {Number} max
	 */
	LList.prototype.remove = function( search, max ) {
		max = ( typeof max !== "undefined" && max > 0 ) ? max : Number.MAX_VALUE;
		this.forEach( function( node, index ) {
			if ( node.data == search ) {
				if ( !node.prev ) {
					this.head = node.next;
					this.head.prev = null;
				} else {
					node.prev.next = node.next;
					if ( node.next ) {
						node.next.prev = node.prev;
					}
				}
				this.count--;
				if ( --max <= 0 ) return true; // break the loop
			}
		});
	};
	
	/*
	 * Remove the last node of the list and returns it
	 * @return {Object|Null} The removed node or null
	 */
	LList.prototype.pop = function() {
		var lastNode = this.getLastNode();
		if ( lastNode ) {
			lastNode.prev.next = null;
			this.count--;
		}
		return lastNode;
	};
	
	/*
	 * Remove the first node of the list and returns it
	 * @return {Object|Null} The removed node or null
	 */
	LList.prototype.shift = function() {
		if ( !this.head ) return null;
		var headNodeCache = this.head;
		this.head = this.head.next;
		if ( this.head ) {
			this.head.prev = null;
		}
		this.count--;
		return headNodeCache;
	};
	
	/*
	 * Merge the list with another list
	 * @param {Object: List} list A LList object reference
	 */
	LList.prototype.concat = function( list ) {
		if ( !this.isList( list ) ) {
			throw "LList::concat: invalid LList:list argument";
		}
		if ( !list.head ) return;
		var lastNode = this.getLastNode();
		if ( lastNode ) {
			lastNode.next = list.head;
			lastNode.next.prev = lastNode;
			this.count += list.count;
		} else {
			this.head = list.head;
			this.count = list.count;
		}
	};
	
	/*
	 * Returns the first node whose data matches
	 * @param {*} data The search value to match a node's data
	 * @return {Object|Null} A LList node or null
	 */
	LList.prototype.filter = function( callback, thisArg ) {
		thisArg = ( thisArg && typeof thisArg === "object" ) ? thisArg : null;
		var nList = new LList;
		this.forEach(function( node, index ) {
			if ( callback.call( thisArg, node, index ) ) {
				nList.push( node.data );
			}
		});
		return nList;
	};
	
	/*
	 * Returns the first node whose data matches
	 * @param {*} data The search value to match a node's data
	 * @return {Object|Null} A LList node or null
	 */
	LList.prototype.search = function( data ) {
		return this.forEach( function( node ) {
			if ( node.data == data ) return node;
		}) || null;
	};
	
	/*
	 * Returns the node at the given list index
	 * @param {Number} _index The node list index
	 * @return {Object|Null} A LList node or null
	 */
	LList.prototype.searchIndex = function( _index ) {
		return this.forEach( function( node, index ) {
			if ( index == _index ) return node;
		}) || null;
	};
	
	/*
	 * Reverse the list
	 */
	LList.prototype.reverse = function() {
		var rList = new LList; 
		this.forEach(function( node ) {
			rList.unshift( node.data );
			if ( node.prev ) {
				node.prev.prev = null;
				node.prev.next = null;
			}
		});
		this.head = rList.head;
	};
	
	/*
	 * Sort the list ( a < b )
	 */
	LList.prototype.sort = function() {
		this.forEach(function( node ) {
			var prevNode = node.prev;
			while( prevNode && node.data < prevNode.data ) {
				var prevDataCache = prevNode.data;
				prevNode.data = node.data;
				node.data = prevDataCache;
				node = prevNode;
				prevNode = prevNode.prev;
			}
		});
	};
	
	LList.prototype.isList = function( list ) {
		return ( Object.getPrototypeOf( list ) === LList.prototype ) ? true : false;
	};
	
	if ( noGlobal ) {
		// return LList for export
		return LList;
	}
	
	// global define LList
	global.LList = LList;
	
});


