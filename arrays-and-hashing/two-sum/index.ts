// Two Sum
// Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.
// You may assume each input has exactly one solution, and you may not use the same element twice.

// Examples
// Input: nums = [2, 7, 11, 15], target = 9
// Output: [0, 1]

// Explanation: nums[0] + nums[1] = 2 + 7 = 9
// Input: nums = [3, 2, 4], target = 6
// Output: [1, 2]

// Explanation: nums[1] + nums[2] = 2 + 4 = 6
// Input: nums = [3, 3], target = 6
// Output: [0, 1]

// Important, you cannot use the same element twice. You can assume there is exactly one solution
//  - May need to remove own element before querying
//
//
// DS -> <targetNum, index[]>
//
// For each num:
//  target - num
//  does solution exist, if my index is included in the array, does the array have length?


// My solution -- there is a 1 pass solution
function twoSum(nums: number[], target: number): number[] {

    const numToIndex: { [num: number]: number[] } = {}

    nums.forEach((n, index) => {
        if (!numToIndex[n]) {
            numToIndex[n] = []
        }

        numToIndex[n].push(index)
    })


    for (let i = 0; i < nums.length; ++i) {
        let n = nums[i]

        const needle = target - n;

        const result =  numToIndex[needle]

        if (!result) {
            continue
        }

        if (result.length === 1) {
            return [i, result[0]]
        }

        if (result.length === 2) {
            return result
        }

        throw new Error("Logical error, there should only be one matching solution")
    }

    throw new Error("Logical error, there should always be a solution")
}

// There was a single pass solution that I had missed
const twoSumsOnePass = (nums: number[], target: number): number[] => {

    const numToIndex: { [num: number]: number } = {}

    for (let i = 0; i < nums.length; ++i) {
        const n = nums[i]

        const complement = target - n;

        if (numToIndex[complement]) {
            return [i, numToIndex[complement]]
        }

        numToIndex[n] = i
    }

    throw new Error("No solution")
}

console.log(twoSum([2, 7, 11, 15], 26))
console.log(twoSumsOnePass([2, 7, 11, 15], 26))
