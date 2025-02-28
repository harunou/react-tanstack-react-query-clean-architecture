import { Deferred as EsfxDeferred } from "@esfx/async-deferred";

interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T | Promise<T>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (reason: any) => void;
}

export const makeDeferred = <T>(): Deferred<T> => {
  const { promise, resolve, reject } = new EsfxDeferred<T>();
  return {
    promise,
    resolve,
    reject,
  };
};
