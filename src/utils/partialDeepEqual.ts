// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function partialDeepEqual(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (a && b && typeof a === "object" && typeof b === "object") {
    return !Object.keys(b).some((key) => !partialDeepEqual(a[key], b[key]));
  }

  return false;
}
