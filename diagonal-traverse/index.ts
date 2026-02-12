
// Note: So long as you collected all the rows into a list, the ordering was less important.
// the intuition was to follow the arrow
// https://leetcode.com/problems/diagonal-traverse/description/

interface Point {
    r: number
    c: number
}

const isPointInBound = (matrix: number[][], p: Point) => {
    const { r, c } = p

    if (r < 0 || r >= matrix.length) {
        return false
    }

    const row = matrix[r]

    if (c < 0 || c >= row.length) {
        return false
    }

    return true
}

const taverseDiagonal = (matrix: number[][], p: Point) => {
    let nums: number[] = []
    let currentPoint = p

    while (true) {
        nums.push(matrix[currentPoint.r][currentPoint.c])

        const nextPoint = { r: currentPoint.r + 1, c: currentPoint.c - 1}

        if (!isPointInBound(matrix, nextPoint)) {
            return nums
        }

        currentPoint = nextPoint
    }
}

const traverseDiagonals = (matrix: number[][]) => {
    const diagonals = []
    
    for (let c = 0; c < matrix[0].length; ++c) {
        diagonals.push(taverseDiagonal(matrix, { r: 0, c: c }))
    }

    for (let r = 1; r < matrix.length; ++r) {
        diagonals.push(taverseDiagonal(matrix, { r: r, c: matrix[r].length - 1 }))
    }

    for (let i = 0; i < diagonals.length; ++i) {
        if (i % 2 === 0) {
            diagonals[i].reverse();
        }
    }

    return diagonals.flatMap(x => x)
}

const run = () => {
    const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]

    console.log(traverseDiagonals(matrix))
}

run()