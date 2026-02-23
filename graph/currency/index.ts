/*
    Improvements:
    - Use Record for defining dicts
    - ??= for assigning an empty dict if not defined
    - Use Set rather than another dict (.has(), add())
    - Use Object.entries in a for of loop for early returns
    - Object.entries can be used in array AND dict (index value, dict value)
    - ! is force skip null check

    Mental model:
    1. Draw our example data structure as a comment in psudocode
    2. Consider input edge cases
*/

// Input: 
// ['AUD', 'USD', 1.33]
// ['USD', 'GBP', 2]

const currencyConversion: [string, string, number][] = [
    ['AUD', 'USD', 0.71],
    ['AUD', 'IDR', 11873],
    ['USD', 'GBP', 0.74],
    ['EUR', 'GBP', 0.87],
]

const currencyConversionDict: Record<string, Record<string, number>> = {}

currencyConversion.forEach(([from, to, coefficient ]) => {
    currencyConversionDict[from] ??= {}
    currencyConversionDict[to] ??= {}

    currencyConversionDict[from][to] = coefficient
    currencyConversionDict[to][from] = (1 / coefficient)
})

// Logical:
//
//   AUD 
//    |
//  V   V
// USD IDR
//  |
//  V
// GBP
//
//
// Notes:
// - Can cycle

const NOT_FOUND = -1

const dfs = (currentCurrency: string, toFindCurrency: string, seenNodes: Set<string>): number => {
    if (currentCurrency === toFindCurrency) {
        return 1
    }

    // Already visited
    if (seenNodes.has(currentCurrency)) {
        return NOT_FOUND
    }

    seenNodes.add(currentCurrency)

    for (const [symbol, coefficient] of Object.entries(currencyConversionDict[currentCurrency] || {})) {

        if (toFindCurrency === symbol) {
            return coefficient
        }

        const value = dfs(symbol, toFindCurrency, seenNodes)

        if (value === NOT_FOUND) {
            continue
        }

        return value * coefficient
    }

    return -1 
}


const bfs =  (fromCurrency: string, toFindCurrency: string): number => {
    const queue = [{
        currencyToCheck: fromCurrency,
        currentCoefficient: 1
    }]

    const seenCurrencies = new Set<string>([fromCurrency])

    while (queue.length) {
        // Save check because we do a queue length check
        const { currencyToCheck, currentCoefficient } = queue.shift()!;

        if (currencyToCheck === toFindCurrency) {
            return currentCoefficient 
        }

        for (const [currency, coefficient] of Object.entries(currencyConversionDict[currencyToCheck] || {})) {
            if (seenCurrencies.has(currency)) {
                continue
            }

            // Mark seen so we do not check again
            seenCurrencies.add(currencyToCheck)            

            queue.push({
                currencyToCheck: currency,
                currentCoefficient: coefficient * currentCoefficient
            })
        }
    }
    
    return NOT_FOUND
}

const convert = (fromCurrency: string, toCurrency: string, amount: number) => {
    // const searchResult = dfs(fromCurrency, toCurrency, new Set())
    const searchResult = bfs(fromCurrency, toCurrency)

    if (searchResult !== -1) {
        return amount * searchResult
    }

    return "Not Found"
}

console.log(convert('AUD', 'AAA', 10))