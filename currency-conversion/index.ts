import util from 'node:util'
import assert from 'node:assert'
import { describe, it } from 'node:test'

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

interface CurrencyNodes {
    [currencySymbol: string]: Currency
}

interface Accululator {
    total: number
    searchedCurrencies: Set<string>
}


const initializeGetCurrency = (currencyNode: CurrencyNodes, symbol: string): Currency => {
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

        // Improvement to a mutable acc: Send conversion as a part of the arguments?
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

const buildCurrencyGraph = (currencyData: Array<Array<string | number>>): CurrencyNodes => {
    const currencyNode: CurrencyNodes = {}
    
    currencyData.forEach((conversionData) => {
        const [toSymbol, fromSymbol, amount] = conversionData as [string, string, number]
    
        // Ensure currencies are initialized
        const toCurrency = initializeGetCurrency(currencyNode, toSymbol)
        const fromCurrency = initializeGetCurrency(currencyNode, fromSymbol)
    
        // Link each of the currencies to each other
        addPair(toCurrency, fromCurrency, amount)
        addPair(fromCurrency, toCurrency, 1 / amount)
    });
    
    return currencyNode
}

const traverseCurrencyGraph = (currencyNode: CurrencyNodes, fromCurrency: string, toCurrency: string, amount: number): (number | "NO_MATCHING_CURRENCY_PAIRS") => {
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

const convert = (currencyData: Array<Array<string | number>>, fromCurrency: string, toCurrency: string, amount: number): (number | "NO_MATCHING_CURRENCY_PAIRS") => {
    const currencyNode = buildCurrencyGraph(currencyData)

    return traverseCurrencyGraph(currencyNode,  fromCurrency, toCurrency, amount)
} 


describe('happy case', () => {
    it('should give the correct response for a simple case', () => {
        const data = [
            ['USD', 'EUR', 2],
        ]

        assert.strictEqual(convert(data, 'USD', 'EUR', 1), 2)
    })

    it('should give the correct response multi-node-hop', () => {
        const data = [
            ['USD', 'EUR', 2],
            ['EUR', 'AUD', 2],
        ]

        assert.strictEqual(convert(data, 'USD', 'AUD', 1), 4)
    })

    it('should give the correct response multi-node-hop in reverse', () => {
        const data = [
            ['USD', 'EUR', 2],
            ['EUR', 'AUD', 2],
        ]

        assert.strictEqual(convert(data, 'AUD', 'USD', 1), 0.25)
    })    

    it('should return not found when there is no possible link', () => {
        const data = [
            ['USD', 'EUR', 2],
            ['ETH', 'DOGE', 2]
        ]

        assert.strictEqual(convert(data, 'USD', 'DOGE', 1), 'NO_MATCHING_CURRENCY_PAIRS')
    })
})


