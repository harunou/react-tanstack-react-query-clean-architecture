import type { OrdersResource } from "../../../types";
import { LocalOrdersGateway } from "./InMemoryOrdersService";
import { makeOrderEntities } from "./makeOrderEntities";
import type { OrdersService } from "./OrdersService.types";
import { RemoteOrdersGateway } from "./RemoteOrdersService";

export const makeOrdersService = (resource: OrdersResource): OrdersService => {
  return resource === "local"
    ? LocalOrdersGateway.make(makeOrderEntities())
    : RemoteOrdersGateway.make();
};
