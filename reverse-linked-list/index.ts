class ListNode {
    val: number
    next: ListNode | null
    
    constructor(val: number, next: ListNode | null = null) {
        this.val = val
        this.next = next
    }
}

const head = new ListNode(1, new ListNode(2, new ListNode(3, null)))

const traverseList = (head: ListNode | null, acc: ListNode[]) => {
    // Base case: We are at the end
    if (head === null) {
        return
    }

    traverseList(head.next, acc)
    
    acc.push(head)
}

const acc: ListNode[] = []

traverseList(head, acc)

acc.forEach((n, index) => {
    if (acc[index + 1]) {
        n.next = acc[index + 1]
    } else {
        n.next = null
    }
})

// Note this can be solved iteratively in place

console.log(acc)