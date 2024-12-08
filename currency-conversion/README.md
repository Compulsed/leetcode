# Learnings

## Graph Traversal

- A Node is something that stores information
- An ARC is a connection
- It is really hard to use information from a node + arc w/o some kind of accumulator. 
   - Can just use logic to say you've 'found' something and if it's been found then mutate the accumulator
- An accumulator w/ a set is a useful way to determine if you've already seen something or now

## Typescript

For dict based typing

```
interface ConversionsEntries {
    [currencySymbol: string]: Currency
}
```

Printing a Graph

```
import util from 'node:util'

console.log(util.inspect(currencyNode, null, 4)) // Prints to a certaind depth
```


## Possible optimizations?

- The return value could be the total, if we do not find the result just multiply by 1