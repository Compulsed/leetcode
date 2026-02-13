class ListNode {
    val: number
    next: ListNode | null
    
    constructor(val: number, next: ListNode | null = null) {
        this.val = val
        this.next = next
    }
}

// Examples
// Input: 1 -> 2 -> 3 -> 4 -> 2 (node 4 points back to node 2)
// Output: true
// Input: 1 -> 2 -> 3 -> null
// Output: false
// Input: 1 -> 1 (node points back to itself)
// Output: true


type SeenNodes = { [val: number]: boolean }

const seenNodes: SeenNodes = {}

const hasSeenNode = (seenNodes: SeenNodes, val: number) => {
    return seenNodes[val]
}

const markSeen = (seenNodes: SeenNodes, val: number) => {
    seenNodes[val] = true
}

const isCycle = (node: ListNode | null, seenNodes: SeenNodes): boolean => {
    if (!node) {
        return false
    }

    if (hasSeenNode(seenNodes, node.val)) {
        return true
    }

    markSeen(seenNodes, node.val)

    return isCycle(node.next, seenNodes);
}

const nonCycle = new ListNode(1, new ListNode(2, new ListNode(3)))

// Self loop
const nodeOne = new ListNode(1, null)
nodeOne.next = nodeOne

// More compelx loop
const last = new ListNode(3)
const complexCycle = new ListNode(1, new ListNode(2, last))
last.next = complexCycle

console.log(isCycle(complexCycle, {}))

// NOTES:
// can use Floyd's algorithm to do O(1) space