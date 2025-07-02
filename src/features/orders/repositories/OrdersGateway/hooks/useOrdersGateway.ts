import type { OrdersGateway, OrdersResource } from "../../../types";
import { LocalOrdersGateway } from "../LocalOrdersGateway";
import { makeOrderEntities } from "../makeOrderEntities";
import { RemoteOrdersGateway } from "../RemoteOrdersGateway";

export const useOrdersGateway = (resource: OrdersResource): OrdersGateway => {
  return resource === "local"
    ? LocalOrdersGateway.make(makeOrderEntities())
    : RemoteOrdersGateway.make();
};
