# Strings

## Key Techniques
- **Sliding Window**: Two pointers (head/tail) with character position map
- **Hash Map**: Track character indices for duplicate detection

## Tips
- When duplicate found, shrink window to position after first occurrence
- Time: O(n), Space: O(min(n, alphabet_size))
- Window only expands or shrinks - never reprocess characters
