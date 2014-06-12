var UpdateablePriorityQueue = require("./UpdateablePriorityQueue.js")

console.log("Hello, World!")

function sizedExample(n) {

	var q = new UpdateablePriorityQueue()

	for (var i = 0; i < n; ++i) {
		var p = Math.floor((Math.random() * 10) + 1)
		q.add("item (" + i + ", " + p + ")", p)
	}

	// console.log(q.items)
	// console.log(q.itemIndices)

	while (q.size > 0)
		console.log(q.pop())
	console.log()

}

function reAddExample(n, m) {

	var q = new UpdateablePriorityQueue()
	var i = 0

	function addOne() {
		i++
		var p = Math.floor((Math.random() * 10) + 1)
		q.add("item (" + i + ", " + p + ")", p)
	}

	while (q.size < n)
		addOne()

	// console.log(q.items)
	// console.log(q.itemIndices)

	while (q.size > m)
		console.log(q.pop())
	console.log(" -- ")

	while (q.size < n)
		addOne()

	while (q.size > 0)
		console.log(q.pop())
	console.log()

}

sizedExample(0)
sizedExample(1)
sizedExample(2)
sizedExample(3)
sizedExample(4)
sizedExample(5)
sizedExample(20)

reAddExample(2, 1)
reAddExample(10, 5)