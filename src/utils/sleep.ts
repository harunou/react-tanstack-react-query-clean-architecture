const DEFAULT_DELAY_MS = 0;

export const sleep = async (ms = DEFAULT_DELAY_MS): Promise<void> => {
  void sleepWithScheduler;
  return sleepWithTimeout(ms);
};

const sleepWithTimeout = async (ms: number): Promise<void> => {
  await new Promise((res) => {
    setTimeout(res, ms);
  });
};

const sleepWithScheduler = async (ms: number): Promise<void> => {
  const start = performance.now();

  if ("scheduler" in window) {
    while (performance.now() - start < ms) {
      // @ts-expect-error - scheduler API is not yet in TypeScript types
      await scheduler.yield();
    }
  } else {
    throw new Error("scheduler API is not available");
  }
};
