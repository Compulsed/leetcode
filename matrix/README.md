# Matrix

## Key Techniques
- **Spiral Traversal**: Move in direction until boundary/seen, then rotate direction (R→D→L→U)
- **Rotate 90° Clockwise**: Transpose + reverse each row (O(1) space)
- **Transpose**: Swap matrix[i][j] with matrix[j][i]
- **Diagonal Traverse**: Move (r+1, c-1), reverse alternating diagonals

## Tips
- "In-place" requirement makes problems harder - look for swap patterns
- Track visited cells with a Set or mutate values
- Bounds checking: 0 <= r < rows && 0 <= c < cols
- "Keep going same direction, if blocked, change direction"
