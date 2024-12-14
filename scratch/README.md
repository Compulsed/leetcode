# Python nodes

## General approaches

- First, start with hashmap
- Second, can this be expressed with a stack or a queue
- Lastly, use array indexes

## Helpful Python

### Strings
- Split string with list(), join with ''.join()

### Iteration
- next(iter, default)
- for (index, char) in enumerate(s)
- reversed(list(enumerate(a))) to iterate from the back

### Arrays
- List / Array are similar
- Ranges with [start,end]
    - Start is INCLUSIVE, end is EXCLUSIVE
    - [start: -1] means all except for the last element
        - To use this syntax effectively 0 must be None, e.g. [:-n or None]
- arr.sort(key=cmp_to_key(compare)) / from functools import cmp_to_key
    - a > b -> 1, 
    - a < b -> -1
    - a == b -> 0

### Sets / HashSet
- For a set 'set()' OR for a dict '{}'
- .keys() or values() for an array of the keys or values.
    - NOTE: Will be in `dict_values([1])` format.
    - These are called views, and, like lists are iterable
- .Items() for key value enumeration
- hashset.get(value, 0) + 1, for incrementing a hashset
- Prefer `in` rather than [] because 0 will eval to false

### Queuing
- `from collections import deque`
- pop, popleft, append, appendleft
- Must check len() else will throw a key error





