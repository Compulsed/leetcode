

// Rotate K places.
//
// Limitations / issues:
// 1. We do not know list size at start of this exercise
//  meaning, we do not know when we need to start rotating
//
// Option 1: Build a stack / alt list
// Space complexity: O(n) size
// 1. Iterate through the list, add items to
//  a list. 
// 2. Once we get to the end:
//  1. pop K elements off of the stack
//  2. pop the last element and set it's head to null
//
// Option 2: Full circle
// 1. Iterate to the end, finding the length of the list / attaching the head to the tail
// 2. Iterate again where [tail: length - k, head: length - k + 1]
// 3. We can make k simpler because we know the size
//
//
// Operations:
//  1. Iterate to the end, attach head: return length
//  2. Iterate a certain number of length: return new head

class ListNode {
    val: number
    next: ListNode | null

    constructor(val: number, next: ListNode | null = null) {
        this.val = val
        this.next = next
    }
}

const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))))

const cycleList = (currentNode: ListNode, headNode: ListNode, size: number) => {
    // We are on the last node
    if (!currentNode.next) {
        currentNode.next = headNode;
        return size + 1
    }

    return cycleList(currentNode.next, headNode, size + 1)
}

const splitLinkedList = (currentNode: ListNode, count: number): ListNode => {
    // We are on the new tail
    if (count === 1) {
        const head = currentNode.next!
        currentNode.next = null
        return head
    }

    return splitLinkedList(currentNode.next!, count - 1)
}

function rotateRight(head: ListNode | null, k: number): ListNode | null {
    if (!head) {
        return head
    }

    const size = cycleList(head, head, 0) 
    
    const effectiveK = k % size

    return splitLinkedList(head, size - effectiveK)
}


console.log(rotateRight(head, 0))

