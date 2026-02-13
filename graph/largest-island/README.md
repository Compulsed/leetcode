# Problem

Given a 2D array, find the largest island

# Terminology 

Common names:
1. Number of islands
1. Largest island

Terminology:
1. Depth first search
1. Node
1. Vertex

# Problem notes

**General**
1. We are mutating the pixels in place, so no need to use an external data structure to capture seen / not seen (Likely more performant than using a HashSet or similar, saves a lookup / a)
1. Calculating the largest shape is as simple as keeping track of the current largest shape and then comparing it to the size of the current shape
1. Speed is NM, where N is the number of rows and M is the number of columns, cannot be faster than this because we MUST visit every pixel at least once. 

**Optimization notes:**
1. If we have already seen the pixel:
  1. It must have been a part of a shape we have already calculated
  1. OR it is a part of a shape that we are already calculating
1. Can compress the on / seen state into a single bit, the 'seen' state is the same as the 'off' state


**Optimization to implement:**
1. An optimization might be to check to see if the future pixel is on, off, seen before we recurse this would save creating a stack frame
1. Could skip checking the pixel we came from, though this would be a minor optimization

**Non-optimizations:**
1. Knowing that pixels are checked top to bottom, left to right, it might be intuitive to skip checking up and left
though this is not possible see 'test_native_skip_up'

# Running the solution

```
cargo run
cargo bench
```

# Performance:

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