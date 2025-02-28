import { useIsMutating, useQuery } from "@tanstack/react-query";
import { useOrdersResourceSelector } from "../useOrdersResourceSelector";
import { useDeleteOrderItemOptions, useGetOrdersOptions } from "../../../gateways";

export const useIsOrdersProcessingSelector = (): boolean => {
  const resource = useOrdersResourceSelector();
  const { isLoading: isLoadingWhileGetOrders } = useQuery({
    ...useGetOrdersOptions(resource),
  });
  const isDeletingOrderItem = useIsMutating({ ...useDeleteOrderItemOptions(resource) });
  return isLoadingWhileGetOrders || !!isDeletingOrderItem;
};
