

const inputGrid = [
    [0, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 1, 0]
]


class Land {
    isLand: boolean
    isSeen: boolean

    constructor(isLand: boolean) {
        this.isLand = isLand
        this.isSeen = false
    }
}

const landGrid: Land[][] = inputGrid.map(
    r => r.map(l => new Land(l == 1))
)


class Point {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

const calculateSize = (point: Point): number => {
    // Bounds check Y axis
    if (point.y < 0 || point.y >= landGrid.length)
        return 0

    // Bounds check X axis
    if (point.x < 0 || point.x >= landGrid[point.y].length) {
        return 0
    }

    const land = landGrid[point.y][point.x]

    // Determine if we are land / have we seen this land before
    if (!land.isLand || land.isSeen) {
        return 0
    }

    // Mark ourselves as seen, this prevents the land from being counted again
    land.isSeen = true;

    // Count starts at 1 because we count ourselves
    let count = 1

    // Up
    count += calculateSize(new Point(point.x, point.y - 1))

    // Down
    count += calculateSize(new Point(point.x, point.y + 1))

    // Left
    count += calculateSize(new Point(point.x - 1, point.y))

    // Right
    count += calculateSize(new Point(point.x + 1, point.y))
    
    return count;
}

const main = () => {
    let largest = 0;

    landGrid.forEach((r, y) => r.forEach((_, x) => {
        let point = new Point(x, y);

        let size = calculateSize(point)

        if (size > 0) {
            console.log(`Found new island of size: ${size} at point ${JSON.stringify(point)}`)
        }

        if (size > largest) {
            largest = size 
        }
    }))

    console.log("Largest size: ", largest)
}

main()
