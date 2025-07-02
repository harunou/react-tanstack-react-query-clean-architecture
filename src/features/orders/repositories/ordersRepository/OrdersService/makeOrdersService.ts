import type { OrdersResource } from "../../../types";
import { LocalOrdersGateway } from "./InMemoryOrdersService";
import { makeOrderEntities } from "./makeOrderEntities";
import type { OrdersService } from "./OrdersService.types";
import { RemoteOrdersService } from "./RemoteOrdersService";

export const makeOrdersService = (resource: OrdersResource): OrdersService => {
  return resource === "local"
    ? LocalOrdersGateway.make(makeOrderEntities())
    : RemoteOrdersService.make();
};
