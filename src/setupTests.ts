import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, expect, vi } from "vitest";

afterEach(() => {
  cleanup();
});
beforeEach(() => {
  vi.clearAllMocks();
});
afterEach(() => {
  vi.restoreAllMocks();
});

import.meta.env.BASE_URL = "http://test.base.url/";

const toHaveParsedTextContent = <T extends object>(element: HTMLElement, expected: T) => {
  let pass: boolean;
  let actual: T;
  try {
    // NOTE(harunou): JSON.parse accepts null
    actual = JSON.parse(element.textContent!);
    expect(actual).toMatchObject(expected);
    pass = true;
  } catch (error) {
    void error;
    pass = false;
  }

  return {
    pass,
    message: () =>
      pass
        ? `expected element not to have output matching ${JSON.stringify(expected)}, but found ${JSON.stringify(actual)}`
        : `expected element to have output matching ${JSON.stringify(expected)}, but found ${JSON.stringify(actual)}`,
  };
};

expect.extend({
  toHaveOutput: toHaveParsedTextContent,
});
