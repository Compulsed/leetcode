class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null

    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val
        this.left = left
        this.right = right
    }
}

const head = new TreeNode(3)
const levelOne = [new TreeNode(9), new TreeNode(20)]
const levelTwo = [new TreeNode(15), new TreeNode(7)]

head.left = levelOne[0]
head.right = levelOne[1]
levelOne[1].left = levelTwo[0]
levelOne[1].right = levelTwo[1]


function levelOrder(root: TreeNode | null): number[][] {
    if (root === null) {
        return []
    }

    const queue: { node: TreeNode, level: number }[] = [{ node: root, level: 0 }]

    const results: number[][] = []

    while(queue.length) {
        const { level, node } = queue.shift()!

        // left, right
        if (node.left) {
            queue.push({ node: node.left, level: level + 1 })
        }

        if (node.right) {
            queue.push({ node: node.right, level: level + 1 })
        }

        if (!results[level]) {
            results[level] = []
        }

        results[level].push(node.val)
    }

    return results
}

console.log(levelOrder(head))