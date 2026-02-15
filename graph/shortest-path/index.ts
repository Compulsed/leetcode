// Given an m x n grid where 0 represents an open cell and 1 represents a wall, 
// find the shortest path from the top-left corner (0, 0) 
// to the bottom-right corner (m-1, n-1). 
// You can move up, down, left, or right. Return the number of steps in the 
// shortest path, or -1 if no path exists.


const matrix = [
    [0, 0, 0],
    [1, 1, 0],
    [0, 0, 0],
    [0, 1, 1],
    [0, 0, 0]
]

interface Point {
    r: number
    c: number
}

type VisitedNodes = { [key: string]: boolean }

const visitedNodes: VisitedNodes = {}

const pointToKey = (point: Point) => {
    return `${point.r}:${point.c}`
}

const visitNode = (point: Point, visitedNodes: VisitedNodes) => {
    visitedNodes[pointToKey(point)] = true
}

const hasVisitedNode = (point: Point, visitedNodes: VisitedNodes): boolean => {
    return visitedNodes[pointToKey(point)] === true
}

const outOfBounds = (matrix: number[][], point: Point): boolean => {
    const { r, c } = point;

    if (r < 0 || r >= matrix.length) {
        return true
    }

    if (c < 0 || c >= matrix[0].length) {
        return true
    }

    return false
}

const pathLength = (matrix: number[][], point: Point, visitedNodes: VisitedNodes): number => {
    
    // Base case -- already visited OR out of bounds
    if (hasVisitedNode(point, visitedNodes) || outOfBounds(matrix, point) || matrix[point.r][point.c] === 1) {
        return -1 
    }

    // We are at the end
    if (pointToKey(point) === pointToKey({ r: matrix.length - 1, c: matrix[0].length - 1})) {
        return 1
    }

    // Mark seen
    visitNode(point, visitedNodes)

    // Loop over values -- DFS
    const rightLength = pathLength(matrix, { r: point.r, c: point.c + 1}, visitedNodes)

    const leftLength = pathLength(matrix, { r: point.r, c: point.c - 1}, visitedNodes)

    const upLength = pathLength(matrix, { r: point.r - 1, c: point.c}, visitedNodes)

    const downLength = pathLength(matrix, { r: point.r + 1, c: point.c}, visitedNodes)

    const lengths = [rightLength, leftLength, upLength, downLength]
        .sort()
        .find(l => l !== -1)

    const shortestLength = lengths || -1

    // IMPORTANT!!!
    // In the return we must have 1 (for our STEP) PLUS whatever the other recursive calls gave us...
    return shortestLength === -1 ? -1 : shortestLength + 1
}

const shortestPathBFS = (matrix: number[][]) => {
    const queue: { point: Point, steps: number }[] = []

    const target = pointToKey({ r: matrix.length - 1, c: matrix[0].length - 1})
    const start: Point = { r: 0, c: 0 }

    queue.push({ point: start, steps: 1 })
    visitNode(start, visitedNodes)

    while (queue.length) {

        const { point, steps } = queue.shift()!

        const neighbors = [
            { r: point.r, c: point.c + 1 },     // right
            { r: point.r, c: point.c - 1 },     // left
            { r: point.r - 1, c: point.c },     // up
            { r: point.r + 1, c: point.c },     // down            
        ]

        for (const neighbor of neighbors) {
            if (outOfBounds(matrix, neighbor)) continue
            if (hasVisitedNode(neighbor, visitedNodes)) continue
            if (matrix[neighbor.r][neighbor.c] === 1) continue

            if (pointToKey(neighbor) === target) return steps + 1

            visitNode(neighbor, visitedNodes)
            
            // Make another step
            queue.push({ point: neighbor, steps: steps + 1 })
        }
    }

    return -1 
}

console.log(pathLength(matrix, { r: 0, c: 0 }, {}))
console.log(shortestPathBFS(matrix))


