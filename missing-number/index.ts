const numbers = [9, 6, 4, 2, 3, 5, 7, 0, 1];

let min = numbers[0]
let max = numbers[0]

let numberSet = new Set()

// Get the min / max for set creation
numbers.forEach(n => {
    if (n < min) {
        min = n
    }

    if (n > max) {
        max = n
    }

    numberSet.add(n)
})

for (let i = min; i <= max; ++i) {
    if (!numberSet.has(i)) {
        console.log('Missing', i)
    }
}

