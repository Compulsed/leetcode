/*
    Post interview issues:
    1. Missed deducting the number from the source account
    2. My accountsExist function did not work the way I had wanted it to, I should have been more explicit <- yikes

    <Started to rush>
    3. I did not know the right way to type dicts off by heart
    4. I missed that I did not need to perform absolute checks

    Stumbles:
    1. Run was already defined as a part of CodeSignal
    2. Should have started creating the definition / quickly adding comments

    What I did well:
    1. Clarified whether I needed to parse certain inputs
    2. Did a baseline run to just see that things 'worked'
    3. Created a 'gochas list'
    4. Described how I would do this differently in production / better code
*/

const input: any = [
    ["ADD", "123"],
    ["ADD", "456"],
    ["DEPOSIT", "123", 10],
    ["TRANSFER", "123", "456", 10],
    ["HIGHEST_ACTIVITY", 1]
]

const ERROR_CODE = -1

class BankAccounts {
    accounts: any
    highestActivity: { [accountId: string]: number }

    constructor() {
        this.accounts = {}
        this.highestActivity = {}
    }

    accountExists(accountId: string): boolean {
        // Catchhes the right flasy case
        if (this.accounts[accountId] === 0) {
            return true
        }
    
        return this.accounts[accountId]
    }

    getHighestActivity(num: number) {

        // { activityNumber: accountIds[] }

        const activityNumberToAccounts: { [activityNumber: number]: string[] } = {}

        Object.entries(this.highestActivity)
            .forEach(([accountId, activityNumber]) => {

                if (!activityNumberToAccounts[activityNumber]) {
                    activityNumberToAccounts[activityNumber] = []   
                }

                activityNumberToAccounts[activityNumber].push(accountId)
            })


        return Object.keys(activityNumberToAccounts)
            .map(n => parseInt(n))
            .sort((a, b) => b - a) // Highest to lowest sort
            .flatMap(activityNumber => {
                return activityNumberToAccounts[activityNumber].sort() // Alpha sort
            })
            .slice(0, num)
    }

    addAccount(accountId: string) {
        if (this.accountExists(accountId)) {
            return false
        }

        this.accounts[accountId] = 0
        this.highestActivity[accountId] = 0

        return true
    }


    deposit(accountId: string, amount: number) {
        if (!this.accountExists(accountId)) {
            return ERROR_CODE
        }

        this.accounts[accountId] += amount
        this.highestActivity[accountId] += amount

        return this.accounts[accountId]
    }

    transfer(sourceAccount: string, destinationAccount: string, amount: number): number {

        if (!this.accountExists(sourceAccount)) {
            return ERROR_CODE
        }

        if (!this.accountExists(destinationAccount)) {
            return ERROR_CODE
        }

        if (sourceAccount === destinationAccount) {
            return ERROR_CODE
        }

        const sourceAccountBalance = this.accounts[sourceAccount]

        if (0 > sourceAccountBalance - amount) {
            return ERROR_CODE
        }

        // Debt accounts
        this.accounts[sourceAccount] -= amount
        this.accounts[destinationAccount] += amount

        this.highestActivity[sourceAccount] -= amount
        this.highestActivity[destinationAccount] += amount

        return this.accounts[sourceAccount]
    }
}

const main = () => {

    const accounts = new BankAccounts()
    
    return input.map(input => {
        const command = input[0]

        switch (command) {
            case "ADD": {
                return accounts.addAccount(input[1])
            }
            case "DEPOSIT": {
                return accounts.deposit(input[1], input[2])
            }
            case "TRANSFER": {
                return accounts.transfer(input[1], input[2], input[3])
            }
            case "HIGHEST_ACTIVITY": {
                return accounts.getHighestActivity(input[1], input[2], input[3])
            }
        }

        throw new Error(`Unknown Op: ${command}`)
    })
}

console.log(main())