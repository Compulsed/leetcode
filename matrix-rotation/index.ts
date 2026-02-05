const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

function rotatePoint(matrix: number[][], x: number, w: number) {

    console.log([
        [0, x],
        [x, w],
        [w, x],
        [x, 0]
    ])

    const temp = matrix[0][x] // 1
    matrix[0][x] = matrix[x][w] // 3
    matrix[x][w] = matrix[w][x] // 7
    matrix[w][x] = matrix[x][0] // 3
    matrix[x][0] = temp    
}

rotatePoint(matrix, 0, 2)

console.log(matrix)