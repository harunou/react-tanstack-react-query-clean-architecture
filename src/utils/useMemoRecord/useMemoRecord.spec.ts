import { renderHook } from "@testing-library/react";
import { useMemoRecord } from "./useMemoRecord";
import { describe, expect, it } from "vitest";

describe(`${useMemoRecord.name}`, () => {
  it("returns the same reference when values do not change", () => {
    const { result, rerender } = renderHook(({ record }) => useMemoRecord(record), {
      initialProps: { record: { a: 1, b: "test" } },
    });

    const firstRender = result.current;

    rerender({ record: { a: 1, b: "test" } });

    expect(result.current).toBe(firstRender);
  });

  it("returns a new reference when a value changes", () => {
    const { result, rerender } = renderHook(({ record }) => useMemoRecord(record), {
      initialProps: { record: { a: 1, b: "test" } },
    });

    const firstRender = result.current;

    rerender({ record: { a: 2, b: "test" } });

    expect(result.current).not.toBe(firstRender);
  });

  it("detects changes in object values by reference", () => {
    const obj1 = { nested: true };
    const obj2 = { nested: true };

    const { result, rerender } = renderHook(({ record }) => useMemoRecord(record), {
      initialProps: { record: { a: 1, obj: obj1 } },
    });

    const firstRender = result.current;

    rerender({ record: { a: 1, obj: obj2 } });

    expect(result.current).not.toBe(firstRender);
  });

  it("works with empty objects", () => {
    const { result, rerender } = renderHook(({ record }) => useMemoRecord(record), {
      initialProps: { record: {} },
    });

    const firstRender = result.current;

    rerender({ record: {} });

    expect(result.current).toBe(firstRender);
  });

  it("is not affected by property order", () => {
    const { result, rerender } = renderHook(({ record }) => useMemoRecord(record), {
      initialProps: { record: { a: 1, b: "test" } },
    });

    const firstRender = result.current;

    rerender({ record: { b: "test", a: 1 } });

    expect(result.current).toBe(firstRender);
  });

  it("detects changes in function references", () => {
    const fn1 = () => {};
    const fn2 = () => {};

    const { result, rerender } = renderHook(({ record }) => useMemoRecord(record), {
      initialProps: { record: { a: 1, fn: fn1 } },
    });

    const firstRender = result.current;

    rerender({ record: { a: 1, fn: fn2 } });

    expect(result.current).not.toBe(firstRender);
  });
});
