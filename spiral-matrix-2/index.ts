const matrix: number[][] = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
]


const getNextDirection = (direction: string): string => {
    const directions: {[ key: string]: string} = {
        RIGHT: "DOWN",
        DOWN: "LEFT",
        LEFT: "UP",
        UP: "RIGHT"
    };

    const nextDirection = directions[direction]

    if (!nextDirection) {
        throw new Error("Invalid Direction")
    }

    return nextDirection
}

interface Point {
    r: number
    c: number
}

const getNextPoint = (direction: string, point: Point): Point => {
    const { r, c } = point

    const directions: {[ key: string]: any} = {
        RIGHT: () => ({ r: r, c: c + 1}),
        DOWN: () =>  ({ r: r + 1, c: c }),
        LEFT: () =>  ({ r: r, c: c - 1}),
        UP: () =>    ({ r: r - 1, c: c }),
    };

    return directions[direction]()
}

const isPointInBounds = (matrix: number[][], p: Point): boolean => {
    const { r, c } = p;

    if (r < 0 || r >= matrix.length) {
        return false
    }

    if (c < 0 || c >= matrix[0].length) {
        return false
    }

    return true;
}

const pointToString = (p: Point) => {
    return `${p.r}:${p.c}`
}

const hasSeenPoint = (seenPoints: any, p: Point): boolean => {
    return !!seenPoints[pointToString(p)]
}

const markPointSeen = (seenPoints: any, p: Point) => {
    seenPoints[pointToString(p)] = true
}


const canStepToPoint = (matrix: number[][], seenPoints: any, p: Point) => {
    return isPointInBounds(matrix, p) && !hasSeenPoint(seenPoints, p)
}

const step = (matrix: number[][], currentPoint: Point, currentDirection: string, seenPoints: any) => {
    markPointSeen(seenPoints, currentPoint);

    const pointVal = matrix[currentPoint.r][currentPoint.c]

    console.log(pointVal)

    const sameDirectionPoint = getNextPoint(currentDirection, currentPoint);

    if (canStepToPoint(matrix, seenPoints, sameDirectionPoint)) {
        return step(matrix, sameDirectionPoint, currentDirection, seenPoints)
    }

    const nextDirection = getNextDirection(currentDirection)

    const differentDirectionPoint = getNextPoint(nextDirection, currentPoint)

    if (canStepToPoint(matrix, seenPoints, differentDirectionPoint)) {
        return step(matrix, differentDirectionPoint, nextDirection, seenPoints)
    }

    // We can conclude that we are at the end because this should all be valid
    console.log("We are at the end")
}

step(matrix, { r: 0, c: 0 }, "RIGHT", {})