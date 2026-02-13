Learnings

**General ideas**

- Start w/ the interface then work the work back to the function definition
- Start w/ hard coded values and then make them parameters


**Optional values as an input**

```
Partial<Options> for everything in the array to use ?:
```

**Working with switch is painful, put it in a separate function**

```
const getBackoffValue = (attempt: number, backoff: Backoff) => {
  switch (backoff) {
    case Backoff.LINEAR:
      return 1000 * attempt;
    case Backoff.EXPONENTIAL:
      return 1000 * Math.pow(2, attempt);
  }
};
```

**Enum type**

```
enum Backoff {
  LINEAR,
  EXPONENTIAL,
}
```


**Special types** 

Union type definitions

```
enum BackoffStatic {
  LINEAR = "LINEAR",
  EXPONENTIAL = "EXPONENTIAL",
}


type Backoff = BackoffStatic | (() => number);
```

For union types must do individual type checking, e.g. `typeof`

```
const getBackoffValue = (attempt: number, backoff: Backoff) => {
  if (typeof backoff === "string") {
    switch (backoff) {
      case BackoffStatic.LINEAR:
        return 1000 * attempt;
      case BackoffStatic.EXPONENTIAL:
        return 1000 * Math.pow(2, attempt);
    }
  }

  if (typeof backoff === "function") {
    return backoff();
  }

  throw new Error("Unexpected getBackoffValue type");
};
```

