# Graph

## Key Techniques
- **DFS**: Recursive traversal, good for connected components (islands)
    - Pre-order, In-order, and Post-order are only for DFS
- **BFS**: Level-order traversal, shortest path in unweighted graphs
    - Must use a queue to do BFS
- **Cycle Detection**: Track "in current path" vs "visited" separately
- **Topological Sort**: Dependencies/task ordering

## Array as Stack/Queue

Arrays can act as either a stack or queue depending on which operations you use:

### Stack (LIFO - Last In, First Out)
Used for **DFS**:
- `push(item)` - add to end
- `pop()` - remove from end

```
push(1), push(2), push(3) → [1, 2, 3]
pop() → 3, array is now [1, 2]
```

### Queue (FIFO - First In, First Out)
Used for **BFS**:
- `push(item)` - add to end (enqueue)
- `shift()` - remove from beginning (dequeue)

```
push(1), push(2), push(3) → [1, 2, 3]
shift() → 1, array is now [2, 3]
```

### Other Operations
- `unshift(item)` - add to beginning (rarely used, O(n) operation)

### Summary Table
| Operation | Stack | Queue |
|-----------|-------|-------|
| Add       | `push()` | `push()` |
| Remove    | `pop()` | `shift()` |

## Tips
- Mark visited by mutating grid (set to 0) or use seen Set
- Bidirectional edges: add both directions with inverse weights
- "Callee should be simple" - do bounds/validity checks before recursing
- Cycle detection needs fresh seen list per path OR backtracking
-> Any algorithm that needs to explore multiple paths through shared state needs backtracking
- 4 directions: (0,1), (0,-1), (1,0), (-1,0)

# Challenges:
1. Implement BFS
2. Implement another backtracking problem in directed graphql (cycles?)
3. Currency calculation / converstion pairs (was asked on an interview)