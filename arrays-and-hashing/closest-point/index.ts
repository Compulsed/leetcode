/**
 * ============================================================================
 * LeetCode 973: K Closest Points to Origin
 * ============================================================================
 *
 * PROBLEM:
 * Given an array of points where points[i] = [xi, yi] represents a point on
 * the X-Y plane and an integer k, return the k closest points to the
 * origin (0, 0).
 *
 * The distance between two points on the X-Y plane is the Euclidean distance:
 *   √(x1² + y1²)
 *
 * You may return the answer in any order. The answer is guaranteed to be
 * unique (except for the order that it is in).
 *
 * CONSTRAINTS:
 * - 1 <= k <= points.length <= 10^4
 * - -10^4 <= xi, yi <= 10^4
 *
 * ============================================================================
 * EXAMPLES:
 *
 * Example 1:
 *   Input:  points = [[1,3],[-2,2]], k = 1
 *   Output: [[-2,2]]
 *   Explanation:
 *     Distance of (1,3)  from origin = √(1² + 3²) = √10
 *     Distance of (-2,2) from origin = √(4 + 4)   = √8
 *     √8 < √10, so (-2,2) is closer. We want k=1 closest, so return [[-2,2]].
 *
 * Example 2:
 *   Input:  points = [[3,3],[5,-1],[-2,4]], k = 2
 *   Output: [[3,3],[-2,4]]  (any order is fine)
 *   Explanation:
 *     Distance of (3,3)   = √(9+9)   = √18
 *     Distance of (5,-1)  = √(25+1)  = √26
 *     Distance of (-2,4)  = √(4+16)  = √20
 *     The two closest are (3,3) and (-2,4).
**/


import { MinHeap, Heap }  from '@datastructures-js/heap'

const calculateDistance = (x: number, y: number): number => {
    return Math.sqrt(x ** 2 + y ** 2)
}

interface DistancePoints {
    distance: number
    points: [number, number]
}

/*
    NOTE:
    - Would think we would want a min heap (storing the smallest value first, and then removing it),
        though, what we want is a max heap. Basically, storing the set of the minimum values AND THEN
        checking the head each time to know if we need to evict                                                                                                                                                            
*/

const main = (k: number ) => {
    const maxHeap = new Heap<DistancePoints>(
        (a, b) => {
            return b.distance - a.distance
        }
    )

    const points = [
        [1, 3],
        [-2, 2], 
        [-10, 2],
        [-20, 30]
    ]

    points.forEach(([x, y]) => {
        const distance = calculateDistance(x, y);

        if (maxHeap.size() < k) {                                                                                                                                             
            maxHeap.push({ distance, points: [x, y] })                                                                                                                  
        } else if (distance < maxHeap.top()!.distance) {                                                                                                                          
            maxHeap.pop()                                                                                                                                                     
            maxHeap.push({ distance, points: [x, y] })                                                                                                                  
        }
    })

    const results = []

    for (let i = 0; i < k; ++i) {
        results.push(maxHeap.extractRoot()?.points)
    }

    return results

}

console.log(main(2))