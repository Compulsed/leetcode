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


## Min / Max Heap 
When thinking about using min heap or max heap for top K we want to:
1. Keep collection of smallest values -- max heap
2. Keep collection of biggest values -- min heap
3. Do head checks to determine if we evict or not

Notes:
1. Min / max heaps do not have a storage / auto eviction limit,
    that has to be done with head checks