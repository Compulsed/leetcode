// const matrix = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9]
// ]

// function rotatePoint(matrix: number[][], x: number, w: number) {
//     console.log([
//         [0, x],
//         [x, w],
//         [w, x],
//         [x, 0]
//     ])

//     const temp = matrix[0][x]
//     matrix[0][x] = matrix[w - x][0]
//     matrix[w - x][0] = matrix[w][w - x]
//     matrix[w][w - x] = matrix[x][w]
//     matrix[x][w] = temp    
// }

// function rotateRow(matrix: number[][], y: number) {

// }


// rotatePoint(matrix, 0, 2)

// console.log(matrix)


const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]


const copy = (matrix: number[][], startPoint: number[], endPoint: number[]): number[] => {
    const copyData: number[] = []

    const [startRow, startCol] = startPoint
    const [endRow, endCol] = endPoint
    
    for (let r = startRow; r <= endRow; ++r) {
        for (let c = startCol; c <= endCol; ++c) {
            copyData.push(matrix[r][c])
        }
    }

    return copyData
}

const placeRow = (matrix: number[][], row: number[], startPoint: number[], endPoint: number[]) => {
    const [startRow, startCol] = startPoint
    const [endRow, endCol] = endPoint
    
    for (let r = startRow; r <= endRow; ++r) {
        for (let c = startCol; c <= endCol; ++c) {
            matrix[r][c] = row.pop()
        }
    }
}

const printMatrix = (matrix: number[][]) => {
    console.log("-----")
    matrix.forEach(r => console.log(r))
    console.log("-----")
}

const run = () => {
    const topLeft = [0, 0]
    const topRight = [0, 2]
    const bottomRight = [2, 2]
    const bottomLeft = [2, 0]

    const topRow = copy(matrix, topLeft, topRight);
    const rightRow = copy(matrix, topRight, bottomRight)
    const bottomRow = copy(matrix, bottomLeft, bottomRight)
    const leftRow = copy(matrix, topLeft, bottomLeft)

    // Reverse these for some reason
    topRow.reverse()
    bottomRow.reverse()

    placeRow(matrix, topRow, topRight, bottomRight)
    placeRow(matrix, rightRow, bottomLeft, bottomRight)
    placeRow(matrix, bottomRow, topLeft, bottomLeft)
    placeRow(matrix, leftRow, topLeft, topRight)


    
    printMatrix(matrix)
};

run()

