# Arrays & Hashing

## Key Techniques
- **Hash Map**: O(1) lookup for complements/targets (two-sum pattern)
- **Frequency Map**: Count occurrences, then sort by frequency
- **Set**: Track seen values, find missing numbers in range

## Tips
- One-pass solutions often exist using hash maps to track complements
- Sorting: `a - b` = ascending, `b - a` = descending
- Read the question carefully - K largest vs top K are different
- Cannot use same element twice? Remove before querying or check index
