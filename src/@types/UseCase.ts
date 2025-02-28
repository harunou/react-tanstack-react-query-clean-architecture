export type UseCase<T = void> = {
  execute: (params: T) => Promise<void>;
};
