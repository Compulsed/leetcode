// https://leetcode.com/problems/spiral-matrix/description/

interface Point {
    r: number
    c: number
}

const pointToKey = (p: Point) => {
    return `${p.r}:${p.c}`
}

class SeenPoints {
    points: any
    pointsList: number[]

    constructor() {
        this.points = {}
        this.pointsList = []
    }

    hasSeenPoint(p: Point) {
        return this.points[pointToKey(p)] === true
    }

    isOutOfBounds(p: Point, matrix: number[][]) {
        if (p.r > matrix.length - 1 || p.r < 0) {
            return true
        }

        if (p.c > matrix[p.r].length - 1 || p.c < 0) {
            return true
        }

        return
    }

    visitPoint(p: Point, matrix: number[][]) {
        console.log('Visit: ', p)

        const key = pointToKey(p)

        if (this.points[key] !== true) {
            this.points[key] = true
            this.pointsList.push(matrix[p.r][p.c])
        }
    }
}


const DIRECTION_MAP = {
    RIGHT: (p: Point) => {
        return { r: p.r, c: p.c + 1 }
    },
    DOWN: (p: Point) => {
        return { r: p.r + 1, c: p.c }
    },
    LEFT: (p: Point) => {
        return { r: p.r, c: p.c - 1 }
    },
    UP: (p: Point) => {
        return { r: p.r - 1, c: p.c }
    },        
}

const move = (matrix: number[][], seenPoints: SeenPoints, startPoint: Point, nextPointFunction: any): Point => {
    if (!seenPoints.hasSeenPoint(startPoint)) {
        seenPoints.visitPoint(startPoint, matrix);
    }

    let currentPoint = { r: startPoint.r, c: startPoint.c }

    while (true) {
        const nextPoint = nextPointFunction(currentPoint)

        if (seenPoints.hasSeenPoint(nextPoint) || seenPoints.isOutOfBounds(nextPoint, matrix)) {
            return currentPoint
        }

        seenPoints.visitPoint(nextPoint, matrix);

        currentPoint = nextPoint
    }
}

const traverse = (matrix: number[][]) => {

    let currentPoint = { r: 0, c: 0}
    let seenPoints = new SeenPoints()

    while(true) {
        const startPoint = { r: currentPoint.r, c: currentPoint.c }
        
        currentPoint = move(matrix, seenPoints, currentPoint, DIRECTION_MAP.RIGHT)
        currentPoint = move(matrix, seenPoints, currentPoint, DIRECTION_MAP.DOWN)
        currentPoint = move(matrix, seenPoints, currentPoint, DIRECTION_MAP.LEFT)
        currentPoint = move(matrix, seenPoints, currentPoint, DIRECTION_MAP.UP)

        // We have not moved, therefore we have gotten to the end
        if (startPoint.r === currentPoint.r && startPoint.c === currentPoint.c) {
            break
        }
    }

    console.log(seenPoints.pointsList)
}

const run = () => {
    // const spiralMatrix = [
    //     [1, 2, 3],
    //     [4, 5, 6],
    //     [7, 8, 9]
    // ]

    const spiralMatrix = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12]
    ]    

    traverse(spiralMatrix)
}

run()