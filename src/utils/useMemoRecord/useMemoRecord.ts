import { useMemo } from "react";

export function useMemoRecord<T extends Record<string, unknown>>(record: T): T {
  const keys = Object.keys(record).sort();
  const values = keys.map((key) => record[key as keyof T]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => record, values);
}
