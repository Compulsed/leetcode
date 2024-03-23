# Problem

Common names:
1. Number of islands
1. Largest island

Terminology:
1. Depth first search
1. Node
1. Vertex


Performance:

M1 Macbook Air

```
find 9x4                time:   [87.401 ns 87.891 ns 88.487 ns]
                        change: [-10.933% -7.4012% -4.2732%] (p = 0.00 < 0.05)
                        Performance has improved.
Found 8 outliers among 100 measurements (8.00%)
  4 (4.00%) high mild
  4 (4.00%) high severe

find 9x4 empty          time:   [87.095 ns 87.416 ns 87.827 ns]
                        change: [-8.3527% -5.5750% -3.3161%] (p = 0.00 < 0.05)
                        Performance has improved.
                        find 9x4                time:   [87.401 ns 87.891 ns 88.487 ns]
                        change: [-10.933% -7.4012% -4.2732%] (p = 0.00 < 0.05)
                        Performance has improved.
Found 8 outliers among 100 measurements (8.00%)
  4 (4.00%) high mild
  4 (4.00%) high severe

find 9x4 empty          time:   [87.095 ns 87.416 ns 87.827 ns]
                        change: [-8.3527% -5.5750% -3.3161%] (p = 0.00 < 0.05)
                        Performance has improved.
```