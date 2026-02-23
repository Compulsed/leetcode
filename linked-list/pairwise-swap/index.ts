class ListNode {
    val: number
    next: ListNode | null

    constructor(val: number, next: ListNode | null = null) {
        this.val = val
        this.next = next
    }
}

/*
    Iterative vs. Recursive

    1->2 ->3->4
    2->1 ->3->4

    Variables:
    - Current
    - Foward

    Current goes forward
    -> [1] current.next = [3] forward.next
    Forward goes to current
    -> [2] forward.next = [2] current 

    Next 'current' = current.next

    Return cases:
    1. Current = null
    2. Current.next = null
*/

const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));


// Desired State |1,2| -> |2, 1| -> ...
const swapSwapPairs = (nodeOne: ListNode | null) => {
    if (nodeOne === null || nodeOne.next === null) {
        return nodeOne
    }

    const nodeTwo = nodeOne.next;
    const nodeThree = nodeTwo.next;

    nodeOne.next = swapSwapPairs(nodeThree);
    nodeTwo.next = nodeOne;

    // Our new head
    return nodeTwo;
}


const printNode = (head: ListNode | null) => {
    if (head === null) {
        return
    }

    console.log(head.val)

    printNode(head.next)
}

const newHead = swapSwapPairs(head);
printNode(newHead);