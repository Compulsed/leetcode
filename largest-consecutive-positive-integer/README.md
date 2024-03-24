# Problem

Largest Consecutive Whole Number


# General notes

- Best theoretical performance would be the hash set, with N * O(1)
- Best actual performance is a sort, though has N Log (N) performance due to in-place sorting
- Worst performance is the BTreeSet, likely would be fast if we needed lots of
    random inserts. Though because we have the entire up-front dataset
    this is definitely the slowest


BTree - 2ms / 1ms
Hashset - 2ms / 700us
Sort - 92us / 16ns

# Performance

```
btree - random          time:   [1.0707 ms 1.0727 ms 1.0748 ms]
                        change: [+9.2957% +10.153% +10.801%] (p = 0.00 < 0.05)
                        Performance has regressed.
Found 5 outliers among 100 measurements (5.00%)
  3 (3.00%) high mild
  2 (2.00%) high severe

hashset                 time:   [2.2479 ms 2.2506 ms 2.2534 ms]
Found 5 outliers among 100 measurements (5.00%)
  4 (4.00%) high mild
  1 (1.00%) high severe

hashset - random        time:   [672.61 µs 676.06 µs 680.01 µs]
Found 5 outliers among 100 measurements (5.00%)
  3 (3.00%) high mild
  2 (2.00%) high severe

sort                    time:   [92.955 µs 93.092 µs 93.237 µs]
                        change: [-0.5180% -0.2131% +0.1389%] (p = 0.22 > 0.05)
                        No change in performance detected.
Found 5 outliers among 100 measurements (5.00%)
  2 (2.00%) high mild
  3 (3.00%) high severe

sort - random           time:   [16.514 ns 16.610 ns 16.734 ns]
                        change: [-9.9763% +1.5089% +14.284%] (p = 0.82 > 0.05)
                        No change in performance detected.
Found 11 outliers among 100 measurements (11.00%)
  4 (4.00%) high mild
  7 (7.00%) high severe
```