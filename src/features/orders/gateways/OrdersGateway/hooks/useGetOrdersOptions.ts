import { queryOptions } from "@tanstack/react-query";
import { useGetOrdersKey } from "./useGetOrdersKey";
import { useOrdersGateway } from "./useOrdersGateway";
import type { OrdersResource } from "../../../types";

export const useGetOrdersOptions = (resource: OrdersResource) => {
  const queryKey = useGetOrdersKey(resource);
  const gateway = useOrdersGateway(resource);

  return queryOptions({
    queryFn: () => gateway.getOrders(),
    queryKey,
  });
};
