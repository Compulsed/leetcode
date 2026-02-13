// Implement a retry mechanism that can:
//  1. Take a dynamic amount of retries
//  2. Apply a backoff algorithm
//  3. Can apply jitter

const sleep = async (durationMs: number) => {
  return new Promise((resolve, _) => setTimeout(resolve, durationMs));
};

enum BackoffStatic {
  LINEAR = "LINEAR",
  EXPONENTIAL = "EXPONENTIAL",
}

type Backoff = BackoffStatic | ((attempt: number) => number);

interface Options {
  retryAttempts: number;
  backoff: Backoff;
  jitter: boolean;
}

const getBackoffDurationMs = (
  attempt: number,
  backoff: Backoff,
  jitter: boolean
): number => {
  let sleepBeforeJitter = getBackoffValue(attempt, backoff);

  if (jitter) {
    return sleepBeforeJitter + Math.random() * 1000;
  } else {
    return sleepBeforeJitter;
  }
};

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
    return backoff(attempt);
  }

  throw new Error("Unexpected getBackoffValue type");
};

const getDefaultOptions = (): Options => {
  return {
    retryAttempts: 3,
    backoff: BackoffStatic.LINEAR,
    jitter: false,
  };
};

const retryFunction = async (execute: any, optionsArg?: Partial<Options>) => {
  let options: Options = {
    ...getDefaultOptions(),
    ...optionsArg,
  };

  let attempt = 0;

  while (true) {
    attempt += 1;

    try {
      return execute();
    } catch (e) {
      if (attempt <= options.retryAttempts) {
        const timeToBackOffMs = getBackoffDurationMs(
          attempt,
          options.backoff,
          options.jitter
        );

        console.log(`Sleeping ${timeToBackOffMs} ms`);

        await sleep(timeToBackOffMs);
      } else {
        throw new Error("Hit max retry attempts");
      }
    }
  }
};

(async () => {
  let resultSuccess = await retryFunction(
    () => {
      return 10;
    },
    {
      backoff: BackoffStatic.EXPONENTIAL,
      jitter: true,
      retryAttempts: 5,
    }
  );

  console.log(`Result Success: ${resultSuccess}`);

  let result = await retryFunction(
    () => {
      console.log("Attempt start");
      throw new Error("Custom error from function");
    },
    {
      backoff: (attempt: number) => attempt * 1000,
      jitter: false,
      retryAttempts: 1,
    }
  );
})();
