// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface UniqueEntity<TId extends keyof any = number | string> {
  id: TId;
}
