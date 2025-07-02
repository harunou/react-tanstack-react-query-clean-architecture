import type { OrdersResource } from "../../../types";
import { LocalOrdersGateway } from "./InMemoryOrdersGateway";
import { makeOrderEntities } from "./makeOrderEntities";
import type { OrdersGateway } from "./OrdersGateway.types";
import { RemoteOrdersGateway } from "./RemoteOrdersGateway";

export const makeOrdersGateway = (resource: OrdersResource): OrdersGateway => {
  return resource === "local"
    ? LocalOrdersGateway.make(makeOrderEntities())
    : RemoteOrdersGateway.make();
};
