

const island = [
    [1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0]
]

interface Point {
    row: number
    col: number
}

const countIslands = (matrix: number[][], point: Point): number => {
    let sum = 0;

    const { row, col } = point;

    if (row < 0 || row >= matrix.length) {
        return 0
    }

    if (col < 0 || col >= matrix[row].length) {
        return 0
    }

    if (matrix[row][col] === 0) {
        return 0
    }

    ++sum
    matrix[row][col] = 0

    // Up
    sum += countIslands(matrix, { row: row - 1, col })

    // Down
    sum += countIslands(matrix, { row: row + 1, col })

    // Left
    sum += countIslands(matrix, { row: row, col: col - 1 })

    // Right
    sum += countIslands(matrix, { row: row, col: col + 1 })

    return sum
}

let largest = 0


for (let r = 0; r < island.length; ++r) {
    for (let c = 0; c < island[r].length; ++c) {
        const islandCount = countIslands(island, { row: r, col: c })

        if (islandCount > largest) {
            largest = islandCount
        }
    }
}

console.log(largest)