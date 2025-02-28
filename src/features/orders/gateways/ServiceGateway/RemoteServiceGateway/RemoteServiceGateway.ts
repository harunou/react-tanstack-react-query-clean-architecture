import { ServiceApi } from "../../../api";
import type { ServiceGateway, OrderEntity } from "../../../types";
import { toOrdersSnapshotDto } from "./mappers";

export class RemoteServiceGateway implements ServiceGateway {
  static make(): ServiceGateway {
    return new RemoteServiceGateway(ServiceApi.make());
  }

  constructor(private api: ServiceApi) {}

  async logOrders(orders: OrderEntity[]): Promise<void> {
    await this.api.logOrdersSnapshot(toOrdersSnapshotDto(orders));
  }
}
