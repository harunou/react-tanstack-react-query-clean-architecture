export type UseCaseResult<T = void> = T | Error;

export type UseCase<T = void, R = void> = {
  execute: (params: T) => Promise<UseCaseResult<R>>;
};
