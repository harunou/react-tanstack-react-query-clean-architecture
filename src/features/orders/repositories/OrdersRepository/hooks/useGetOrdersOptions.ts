import { queryOptions } from "@tanstack/react-query";
import { makeOrdersService } from "../OrdersService";
import type { OrdersResource } from "../../../types";
import { useGatewayResource } from "./useGatewayResource";
import { keys } from "./keys";

export const useGetOrdersOptions = (forceResource?: OrdersResource) => {
  const resource = useGatewayResource(forceResource);
  const getOrdersKey = keys.makeGetOrdersKey(resource);
  const gateway = makeOrdersService(resource);

  return queryOptions({
    queryFn: async () => await gateway.getOrders(),
    queryKey: getOrdersKey,
  });
};
