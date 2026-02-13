/*
Top K Frequent Words
    Given an array of strings words and an integer k, return the k most frequent strings.
    Return the answer sorted by frequency from highest to lowest. 

    If two words have the same frequency, sort them in lexicographical (alphabetical) order.

    Examples
    Input: words = ["code", "love", "code", "baby", "baby", "baby", "love"], k = 2
    Output: ["baby", "code"]

    Explanation: "baby" appears 3 times, "code" appears 2 times, "love" appears 2 times. Since "code" and "love" are tied, "code" comes first alphabetically.

    Input: words = ["the", "day", "is", "the", "the", "sunny", "is", "is", "sunny"], k = 3
    Output: ["the", "is", "sunny"]
*/

const words = ["code", "love", "code", "baby", "baby", "baby", "love"]

/*
Notes:
1. Did not read the question properly / follow through the example.
    thought it was just K, not K LARGEST.
2. Sort is smallest to largest, e.g. [1, 2, 3] rather than [3, 2, 1]
    Sort is a - b, for smallest to largest, largest to smallest is b - a
3. Unsure how sorting handles 1 vs. 10
*/

const getKFrequentWord = (words: string[], k: number): string[] => {
    const wordsDict: { [word: string]: number } = {}

    words.forEach(w => {
        if (!wordsDict[w]) {
            wordsDict[w] = 0
        }

        ++wordsDict[w]
    });

    const frequencyDict: { [frequency: number]: string[] } = {}

    Object.entries(wordsDict).forEach(([word, frequency]) => {
        if (!frequencyDict[frequency]) {
            frequencyDict[frequency] = []
        }

        frequencyDict[frequency].push(word)
    })
    
    return Object.keys(frequencyDict)
        .sort((a, b) => b - a)
        .flatMap(k => {
            return frequencyDict[k].sort()
        })
        .slice(0, k)
}

console.log(getKFrequentWord(words, 2))
