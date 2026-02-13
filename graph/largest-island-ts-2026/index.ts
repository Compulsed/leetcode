// Largest island


const islandArray = [
    [1, 0, 0, 1, 1],
    [0, 0, 0, 1, 1],
    [0, 0, 0, 1, 1],
    [0, 0, 0, 1, 0],
]

const calculateLargestIsland = (islandArray: number[][]) => {
    let largestTotal = 0;

    islandArray.forEach((row, y) => {
        row.forEach((_point, x) => {
            const total = calculateAtPoint(islandArray, x, y)

            if (total > largestTotal) {
                largestTotal = total
            }
        })
    })

    return largestTotal
}

const calculateAtPoint = (islandArray: number[][], x: number, y: number): number => {
    // Considerations:
    // 1. Bounds checking, we should not go outside of the array
    // 2. Who should manage constraints checks (bounds, if we are land or not)
    //  1. Caller
    //  2. Callee <- Should be simple because it saves us having to on each up / down, etc.
    // 3. How to prevent double counting

    if (y < 0 || y > islandArray.length - 1) {
        return 0
    }

    const row = islandArray[y]

    if (x < 0 || x > row.length - 1) {
        return 0
    }

    const point = row[x]

    // We have seen the point _OR_ the point is not a land
    if (point === 0) {
        return 0
    }

    console.log("Calculating point", x, y)

    // Set the point as 'seen'
    row[x] = 0

    let total = 1;

    // Up
    total += calculateAtPoint(islandArray, x, y - 1);

    // Down
    total += calculateAtPoint(islandArray, x, y + 1);

    // Left
    total += calculateAtPoint(islandArray, x - 1, y);

    // Right
    total += calculateAtPoint(islandArray, x + 1, y);

    return total
}

let result = calculateLargestIsland(islandArray)

console.log(result)