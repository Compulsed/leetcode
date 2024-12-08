import util from 'node:util'

interface Conversion {
    currency: Currency
    amount: number
}

interface ConversionsMap {
    [currencySymbol: string]: Conversion
}

interface Currency {
    currencySymbol: string
    conversions: ConversionsMap
}

interface ConversionsEntries {
    [currencySymbol: string]: Currency
}

const currencyNode: ConversionsEntries = {}


const data = [
    ['USD', 'EUR', 2],
    ['EUR', 'AUD', 2],
    ['AUD', 'YEN', 2],
    ['USD', 'GBP', 2],
    // Crypto
    ['DOGE', 'BTC', 0.65],
    ['BTC', 'ETH', 0.65],
]

const initializeGetCurrency = (symbol: string): Currency => {
    if(!currencyNode[symbol]) {
        currencyNode[symbol] = {
            conversions: {},
            currencySymbol: symbol
        }
    }

    return currencyNode[symbol]
}

const addPair = (toCurrency: Currency, fromCurrency: Currency, amount: number) => {
    toCurrency.conversions[fromCurrency.currencySymbol] = {
        amount,
        currency: fromCurrency
    }    
}

data.forEach((conversionData) => {
    const [toSymbol, fromSymbol, amount] = conversionData as [string, string, number]

    // Ensure currencies are initialized
    const toCurrency = initializeGetCurrency(toSymbol)
    const fromCurrency = initializeGetCurrency(fromSymbol)

    // Link each of the currencies to each other
    addPair(toCurrency, fromCurrency, amount)
    addPair(fromCurrency, toCurrency, 1 / amount)
});


console.log(util.inspect(currencyNode, null, 4))

interface Accululator {
    total: number
    searchedCurrencies: Set<string>
}

const convertRecursive = (acc: Accululator, currentCurrency: Currency, currencyToFind: string): ("FOUND" | "NOT_FOUND") => {
    const currentCurrencySymbol = currentCurrency.currencySymbol

    // Bcase case 1: We have found a conversion, return that we have found the case
    if (currentCurrencySymbol === currencyToFind) {
        return "FOUND"
    }

    // Base case 2: Prevent looping through currencies we have already seen
    if (acc.searchedCurrencies.has(currentCurrencySymbol)) {
        return "NOT_FOUND"
    }

    acc.searchedCurrencies.add(currentCurrencySymbol)

    // Iteration: Search each child node
    for (const currencyToSearchSymbol in currentCurrency.conversions) {
        const currencyToSearch = currentCurrency.conversions[currencyToSearchSymbol];

        // A child node has the currency
        if (convertRecursive(acc, currencyToSearch.currency, currencyToFind) !== "NOT_FOUND") {

            acc.total = acc.total * currencyToSearch.amount

            return "FOUND"
        }
    }

    // We did not find the currency we were looking for
    return "NOT_FOUND"
}


const convert = (fromCurrency: string, toCurrency: string, amount: number): (number | "NO_MATCHING_CURRENCY_PAIRS") => {
    const acc: Accululator = { 
        total: amount,
        searchedCurrencies: new Set()
    };

    const result = convertRecursive(acc, currencyNode[fromCurrency], toCurrency)

    if (result === "FOUND") {
        return acc.total
    }

    if (result === "NOT_FOUND") {
        return "NO_MATCHING_CURRENCY_PAIRS"
    }
    
    throw new Error("Logic error: result states did not match 'FOUND' or 'NOT_FOUND'")
} 


console.log(convert('USD', 'AUD', 1))
console.log(convert('USD', 'ETH', 1))
// console.log(convert('USD', 'AUD', 10))