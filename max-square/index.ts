
interface Point {
    r: number
    c: number
}

const isSpotValid = (matrix: number[][], point: Point) => {
    const { r, c } = point

    // Are we within the matrix bounds
    if (r < 0 || r >= matrix.length) {
        return false
    }

    const row = matrix[r]

    if (c < 0 || c >= row.length) {
        return false
    }

    // Does that spot contain a 1
    return row[c] === 1
}

const isSquareOfSizeAtPoint = (matrix: number[][], point: Point, squareSize: number) => {
    for (let r = point.r; r < squareSize + point.r; ++r) {
        for (let c = point.c; c < squareSize + point.c; ++c) {
            if (!isSpotValid(matrix, { r, c })) {
                return false
            }
        }
    }

    return true
}

const countOfSquares = () => {

    const squareCount = 0;

    for (let l = 0; l < 5; ++l) {
        const matrix = [
            [1, 0, 1, 0, 0],
            [1, 0, 1, 1, 1],
            [1, 1, 1, 1, 1],
            [1, 0, 0, 1, 0]
        ]


        for (let r = 0; r < matrix.length; ++r) {
            for (let c = 0; c < matrix[r].length; ++c) {
                isSquareOfSizeAtPoint(matrix, { r: 1, c: 2 }, 3)
            }
        }
    }

    console.log(squareCount)
}



