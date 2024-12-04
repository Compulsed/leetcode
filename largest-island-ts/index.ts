import assert from 'node:assert'
import { describe, it } from 'node:test'

// Optimization: isLand / isSeen could be the same value. Once we visit the
//  land we can say it's no longer land.
class Land {
    isLand: boolean
    isSeen: boolean

    constructor(isLand: boolean) {
        this.isLand = isLand
        this.isSeen = false
    }
}

class Point {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

const calculateSize = (landGrid: Land[][], point: Point): number => {
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
    count += calculateSize(landGrid, new Point(point.x, point.y - 1))

    // Down
    count += calculateSize(landGrid, new Point(point.x, point.y + 1))

    // Left
    count += calculateSize(landGrid, new Point(point.x - 1, point.y))

    // Right
    count += calculateSize(landGrid, new Point(point.x + 1, point.y))
    
    return count;
}

const calculateLargest = (inputGrid: number[][]): number => {
    const landGrid: Land[][] = inputGrid.map(
        r => r.map(l => new Land(l == 1))
    )    

    let largest = 0;

    landGrid.forEach((r, y) => r.forEach((_, x) => {
        let point = new Point(x, y);

        let size = calculateSize(landGrid, point)

        if (size > 0) {
            console.log(`Found new island of size: ${size} at point ${JSON.stringify(point)}`)
        }

        if (size > largest) {
            largest = size 
        }
    }))

    console.log("Largest size: ", largest)
    
    return largest
}



describe('calculateLargest', () => {
    it('happy case should work', () => {
        const inputGrid = [
            [0, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [1, 0, 0, 1, 0],
            [1, 0, 0, 1, 0],
            [1, 0, 0, 1, 0]
        ]
    
        assert.strictEqual(calculateLargest(inputGrid), 6)
    })

    it('grid off different sizes should not raise an error', () => {
        const inputGrid = [
            [0, 1, 0, 0, 0],
            [1, 1],
        ]
    
        // Assertion: Should not throw any kind of exception or error
        assert.strictEqual(calculateLargest(inputGrid), 3)
    })

    it('if there are no islands should return a size of 0', () => {
        const inputGrid = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]
    
        // Assertion: Should not throw any kind of exception or error
        assert.strictEqual(calculateLargest(inputGrid), 0)
    })


    it('if there is no land we should return 0', () => {
        const inputGrid = []
    
        // Assertion: Should not throw any kind of exception or error
        assert.strictEqual(calculateLargest(inputGrid), 0)
    })    

    it('if there is multiple islands the largest island should be returned', () => {
        const inputGrid = [
            [1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1],
            [0, 0, 0, 1, 1]
        ]
    
        assert.strictEqual(calculateLargest(inputGrid), 3)
    })       
})

