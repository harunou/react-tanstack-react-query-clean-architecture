export type UseCaseSuccess<T = void> = T;
export type UseCaseFailure = Error;

export type UseCaseResult<T = void> = UseCaseSuccess<T> | UseCaseFailure;

export type UseCase<T = void, R = void> = {
  execute: (params: T) => Promise<UseCaseResult<R>>;
};
