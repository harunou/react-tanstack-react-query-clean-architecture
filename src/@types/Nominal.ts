declare const __nominal__type__: unique symbol;

export type Nominal<Type, Identifier> = Type & {
  readonly [__nominal__type__]: Identifier;
};
