import { sleepWithTimeout } from "../../../../utils";
import type { ServiceGateway } from "../../types";

export class StubServiceGateway implements ServiceGateway {
  static make(): ServiceGateway {
    return new StubServiceGateway();
  }

  async logOrders(): Promise<void> {
    await sleepWithTimeout();
  }
}
