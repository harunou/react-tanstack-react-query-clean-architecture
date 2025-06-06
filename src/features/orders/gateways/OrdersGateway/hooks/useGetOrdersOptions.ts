import { queryOptions } from "@tanstack/react-query";
import { useGetOrdersKey } from "./useGetOrdersKey";
import { useOrdersGateway } from "./useOrdersGateway";
import type { OrdersResource } from "../../../types";
import { useGatewayResource } from "./useGatewayResource";

export const useGetOrdersOptions = (forceResource?: OrdersResource) => {
  const resource = useGatewayResource(forceResource);
  const queryKey = useGetOrdersKey(resource);
  const gateway = useOrdersGateway(resource);

  return queryOptions({
    queryFn: async () => await gateway.getOrders(),
    queryKey,
  });
};
