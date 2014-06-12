// updateable priority queue,
// via a min-heap and reverse map from values to item indices

function UpdateablePriorityQueue() {
	this.items = []
	this.itemIndices = {}
	this.size = 0
}

UpdateablePriorityQueue.prototype = {

	// unique hash for objects & values from:
	// http://stackoverflow.com/questions/368280/javascript-hashmap-equivalent
	uniqueHash: function(value) {
	    return (typeof value) + ' ' + (value instanceof Object ?
	        (value.__hash || (value.__hash = ++arguments.callee.current)) :
	        value.toString())
	},

	add: function(item, priority) {
		this.setHeapItem([item, priority], this.size)
		this.bubbleUp(this.size)
		this.size++
	},

	pop: function() {
		var result = this.items[0][0]
		this.deleteIndex(0)
		return result
	},

	delete: function(item) {
		var index = this.itemIndices[this.uniqueHash(item)]
		this.deleteIndex(index)
	},

	deleteIndex: function(index) {
		this.clearHeapItem(index)
		var hole = this.bubbleDown(index)
		this.swap(hole, --this.size)
		if (hole < this.size)
			this.bubbleUp(hole)
	},

	clearHeapItem: function(index) {
		var item = this.items[index][0]
		this.items[index] = null
		delete this.itemIndices[this.uniqueHash(item)]
	},

	changePriority: function(item, priority) {
		delete(item)
		add(item, priority)
	},

	// push gap (null) down to bottom, returning index there
	bubbleDown: function(index) {
		var child1 = this.leftChildIndex(index)
		var child2 = this.rightChildIndex(index)
		var size = this.items.length
		var leastChild
		if (child1 >= this.size)
			return index
		if (child2 >= this.size || this.lessThan(child1, child2))
			leastChild = child1
		else
			leastChild = child2
		this.swap(index, leastChild)
		return this.bubbleDown(leastChild)
	},

	bubbleUp: function(index) {
		if (index == 0) return
		var parent = this.parentIndex(index)
		if (this.lessThan(index, parent)) {
			this.swap(index, parent)
			this.bubbleUp(parent)
		}
	},

	swap: function(i, j) {
		var temp = this.items[i]
		this.setHeapItem(this.items[j], i)
		this.setHeapItem(temp, j)
	},

	// itemPriority = [item, priority]
	setHeapItem: function(itemPriority, index) {
		this.items[index] = itemPriority
		if (itemPriority != null)
			this.itemIndices[this.uniqueHash(itemPriority[0])] = index
	},

	// is the item at index i < item at index j?
	lessThan: function(i, j) {
		return this.items[i][1] < this.items[j][1]
	},

	parentIndex: function(index) {
		return Math.floor((index + 1) / 2) - 1
	},

	leftChildIndex: function(index) {
		return 2 * index + 1
	},

	rightChildIndex: function(index) {
		return 2 * index + 2
	}


}

UpdateablePriorityQueue.prototype.uniqueHash.current = 0

module.exports = UpdateablePriorityQueue