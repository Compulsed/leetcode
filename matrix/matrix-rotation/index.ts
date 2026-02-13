// Note: Normally this requires this to be done 'in place', which is why it is much harder. i.e.
//  you cannot create another matrix to copy data to

// def rotate_90_clockwise(matrix):
//     n = len(matrix)
    
//     # Step 1: Transpose (swap matrix[i][j] with matrix[j][i])
//     for i in range(n):
//         for j in range(i + 1, n):  # Only upper triangle
//             matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    4
//     # Step 2: Reverse each row
//     for i in range(n):
//         matrix[i].reverse()  # Or manually: left, right = 0, n-1; swap
// ```

// **Time:** O(n²)  
// **Space:** O(1)

// ## Why This Works

// Consider a 3×3 matrix:
// ```
// Original:        Transpose:       Reverse rows:
// 1 2 3            1 4 7            7 4 1
// 4 5 6    →       2 5 8     →      8 5 2
// 7 8 9            3 6 9            9 6 3
// Transpose flips along the main diagonal
// Reversing rows completes the 90° clockwise rotation

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

