const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
	constructor() {
		this.tree = null;
	}

	root() {
		return this.tree;
	}

	add(data) {
		let node = new Node(data);
		if (!this.tree) {
			this.tree = node;
			return;
		}
		let currentNode = this.tree;
		while (currentNode) {
			if (currentNode.data === node.data) {
				return currentNode;
			}
			if (node.data < currentNode.data) {
				if (!currentNode.left) {
					currentNode.left = node;
					return;
				}
				currentNode = currentNode.left;
			} else {
				if (!currentNode.right) {
					currentNode.right = node;
					return;
				}
				currentNode = currentNode.right;
			}
		}
	}

	has(data) {
		let current = this.tree;
		while (current) {
			if (data === current.data) {
				return true;
			}
			data < current.data
				? (current = current.left)
				: (current = current.right);
		}
		return false;
	}

	find(data) {
		let current = this.tree;
		while (current) {
			if (data < current.data) {
				current = current.left;
			} else if (data > current.data) {
				current = current.right;
			} else {
				return current;
			}
		}
		return null;
	}

	remove(data) {
		const removeNode = (node, data) => {
			if (node === null) {
				return null;
			} else if (data < node.data) {
				node.left = removeNode(node.right, data);
				return node;
			} else if (data > node.data) {
				node.right = removeNode(node.right, data);
			} else {
				if (node.left === null && node.right === null) return null;
				if (node.left === null) return node.right;
				if (node.right === null) return node.left;
				let tempNode = node.right;
				while (tempNode.left !== null) {
					tempNode = tempNode.left;
				}
				node.data = tempNode.data;
				node.right = removeNode(node.right, tempNode.data);
				return node;
			}
		};
		this.tree = removeNode(this.tree, data);
	}

	min() {
		if (!this.tree) {
			return null;
		}
		let current = this.tree;
		while (current.left) {
			current = current.left;
		}
		return current.data;
	}

	max() {
		if (!this.tree) {
			return null;
		}
		let current = this.tree;
		while (current.right) {
			current = current.right;
		}
		return current.data;
	}
}

module.exports = {
	BinarySearchTree,
};
