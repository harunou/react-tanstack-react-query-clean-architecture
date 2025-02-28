import { vi } from "vitest";
import * as sleepModule from "../sleep";

export const mockSleep = () => {
  vi.spyOn(sleepModule, "sleepWithScheduler").mockResolvedValue();
  vi.spyOn(sleepModule, "sleepWithTimeout").mockResolvedValue();
};
