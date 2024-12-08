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
    searched?: boolean
}

interface ConversionsEntries {
    [currencySymbol: string]: Currency
}

const currencyNode: ConversionsEntries = {}


const data = [
    ['USD', 'EUR', 1.05],
    ['EUR', 'AUD', 0.65],
    ['AUD', 'YEN', 0.65],
    ['USD', 'GBP', 2.00],
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


const convertSimple = (fromCurrency: string, toCurrency: string, amountToConvert: number): number => {
    return currencyNode[fromCurrency].conversions[toCurrency].amount * amountToConvert
}

const convertRecursive = (currentCurrency: Currency, currencyToFind: string): ("FOUND" | "NOT_FOUND") => {

    if (currentCurrency.currencySymbol === currencyToFind) {
        return "FOUND"
    }

    if (currentCurrency.searched === true) {
        return "NOT_FOUND"
    }

    currentCurrency.searched = true

    // Iteration: Search each child node
    for (const currencyToSearchSymbol in currentCurrency.conversions) {
        const currencyToSearch = currentCurrency.conversions[currencyToSearchSymbol];

        // A child node has the currency
        if (convertRecursive(currencyToSearch.currency, currencyToFind) !== "NOT_FOUND") {
            return "FOUND"
        }
    }

    return "NOT_FOUND"
}


console.log(convertRecursive(currencyNode.YEN, 'DOGE'))
// console.log(convert('GBP', 'USD', 10))
// console.log(convert('USD', 'AUD', 10))