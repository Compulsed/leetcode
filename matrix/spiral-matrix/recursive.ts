
interface Point {
    r: number
    c: number
}

class PointsCollector {
    seenPoints: any
    listPoints: number[]

    constructor() {
        this.seenPoints = {}
        this.listPoints = []
    }

    hasSeen(p: Point) {
        return this.seenPoints[this.key(p)] === true
    }

    markSeen(matrix: number[][], p: Point) {
        this.seenPoints[this.key(p)] = true

        const value = matrix[p.r][p.c]


        this.listPoints.push(value)
    }

    key(p: Point): string {
        return `${p.r}:${p.c}`
    }
}

class Direction {
    order: string[]
    orderIndex: number

    constructor() {
        this.order = ["RIGHT", "DOWN", "LEFT", "UP"]
        this.orderIndex = 0
    }

    changeDirection() {
        ++this.orderIndex
    }

    getNextPoint (currentPoint: Point): Point {
        const direction = this.order[this.orderIndex % this.order.length]

        switch (direction) {
            case "RIGHT": 
                return { r: currentPoint.r, c: currentPoint.c + 1}
            case "DOWN":
                return { r: currentPoint.r - 1, c: currentPoint.c}
            case "LEFT":
                return { r: currentPoint.r, c: currentPoint.c - 1}
            case "UP": 
                return { r: currentPoint.r + 1, c: currentPoint.c}
        }

        throw Error("Invalid direction")
    }
}



const pointIsInBounds = (matrix: number[][], point: Point) => {
    if (point.r < 0 || point.r >= matrix.length) {
        return false
    }

    const row = matrix[point.r]

    if (point.c < 0 || point.c >= row.length) {
        return false
    }

    return true
}

const goIntoMatrix = (matrix: number[][], point: Point, direction: Direction, collector: PointsCollector): boolean => {
    if (!pointIsInBounds(matrix, point) || collector.hasSeen(point)) {
        return false
    }

    // Mark the point we are traveling to as seen
    collector.markSeen(matrix, point)

    // Algorithm: Keep going the same way, if that does not work, change directions
    for (let i = 0; i < 4; ++i) {
        const nextPoint = direction.getNextPoint(point)

        // We found the right path, we no long need to keep
        if (goIntoMatrix(matrix, nextPoint, direction, collector)) {
            return true
        }

        direction.changeDirection();
    }

    return false
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

    const collector = new PointsCollector();

    goIntoMatrix(spiralMatrix, { r: 0, c: 0 }, new Direction(), collector)

    console.log(collector.listPoints)
}

run()