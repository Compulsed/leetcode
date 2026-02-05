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



const rotateLayer = (matrix: number[][], layerNumber: number) => {
    const matrixSize = matrix.length - 1
    const start = layerNumber
    const end = matrixSize - layerNumber

    const topLeft = [start, start]
    const topRight = [start, end]
    const bottomRight = [end, end]
    const bottomLeft = [end, start]

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
    
}

const printMatrix = (matrix: number[][]) => {
    console.log("-----")
    matrix.forEach(r => console.log(r))
    console.log("-----")
}

const run = (matrix: number[][]) => {
    const layerCount = Math.ceil(matrix.length / 2)

    for (let l = 0; l < layerCount; ++l) {
        rotateLayer(matrix, l)
    }

    printMatrix(matrix)
};

const bigMatrix = [
    ["00", "01", "02", "03", "04"],
    ["10", "11", "12", "13", "14"],
    ["20", "21", "22", "23", "24"],
    ["30", "31", "32", "33", "34"],
    ["40", "41", "42", "43", "44"],
]

const example2 = [
    [5, 1, 9, 11],
    [2, 4, 8, 10],
    [13, 3, 6, 7],
    [15, 14, 12, 16],
]

run(example2)

