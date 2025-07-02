import type { OrdersGateway, OrdersResource } from "../../../types";
import { LocalOrdersGateway } from "./InMemoryOrdersService";
import { makeOrderEntities } from "./makeOrderEntities";
import { RemoteOrdersGateway } from "./RemoteOrdersService";

export const makeOrdersService = (resource: OrdersResource): OrdersGateway => {
  return resource === "local"
    ? LocalOrdersGateway.make(makeOrderEntities())
    : RemoteOrdersGateway.make();
};
