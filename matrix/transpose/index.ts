
// Transpose matrix





const transpose = (matrix: number[][]) => {
    for (let r = 0; r < matrix.length; ++r) {
        for (let c = 0; c < r; ++c) {
            const t = matrix[r][c];
            matrix[r][c] = matrix[c][r];
            matrix[c][r] = t
        }
    }
}

const flip = (matrix: number[][]) => {
    const halfSize = Math.floor(matrix.length)

    for (let r = 0; r < matrix.length; ++r) {
        for (let c = 0; c < halfSize; ++c) {
            const t = matrix[r][c]
            matrix[r][c] = matrix[r][matrix.length - c]
            matrix[r][matrix.length - c] = t
        }
    }

}

const logMatrix = (matrix: number[][]) => {
    matrix.forEach(r => {
        console.log(r)
    })
}

const transform = (matrix: number[][]) => {
    // flip(matrix);
    transpose(matrix);
    logMatrix(matrix);
}

const run = () => {
    const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    const example = [
        [2, 4, -1],
        [-10, 5, 11],
        [18, -7, 6]
    ];

    transform(example)
}

run();