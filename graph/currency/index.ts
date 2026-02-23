

// Input: 
// ['AUD', 'USD', 1.33]
// ['USD', 'GBP', 2]

const currencyConversion = [
    ['AUD', 'USD', 0.71],
    ['AUD', 'IDR', 11873],
    ['USD', 'GBP', 0.74],
    ['EUR', 'GBP', 0.87],
]

/*
    { AUD: { USD: 1.33, IDR: 50 }}
*/
const currencyConversionDict: any = {}

currencyConversion.forEach(([from, to, coefficient ]) => {
    if (!currencyConversionDict[from]) {
        currencyConversionDict[from] = {}
    }

    if (!currencyConversionDict[to]) {
        currencyConversionDict[to] = {}
    }    

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

const dfs = (currentCurreny: string, toFindCurrency: string, seenNodes: Set<String>): number => {
    // Already visited
    if (seenNodes.has(currentCurreny)) {
        return NOT_FOUND
    }

    seenNodes.add(currentCurreny)

    // [ 'USD', '1.33' ]
    const searchCurrencies = Object.entries(currencyConversionDict[currentCurreny] || {});

    for (const currencyPair of searchCurrencies) {
        const [symbol, coefficient] = currencyPair as any

        if (toFindCurrency === symbol) {
            return coefficient
        }

        const value = dfs(symbol, toFindCurrency, seenNodes)

        if (value === -1) {
            continue
        }

        return value * coefficient
    }

    return -1 
}

const convert = (fromCurrency: string, toCurrency: string, amount: number) => {
    const searchResult = dfs(fromCurrency, toCurrency, new Set())

    if (searchResult !== -1) {
        return amount * searchResult
    }

    return "Not Found"
}

console.log(convert('AUD', 'EUR', 10))