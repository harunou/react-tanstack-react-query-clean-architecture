import { useIsMutating, useQuery } from "@tanstack/react-query";
import {
  useDeleteOrderItemOptions,
  useDeleteOrderOptions,
  useGetOrdersOptions,
} from "../../../gateways";

export const useIsOrdersProcessingSelector = (): boolean => {
  const { isLoading: isLoadingWhileGetOrders } = useQuery({
    ...useGetOrdersOptions(),
  });
  const isDeletingOrderItem = useIsMutating({ ...useDeleteOrderItemOptions() });
  const isDeletingOrder = useIsMutating({ ...useDeleteOrderOptions() });
  return isLoadingWhileGetOrders || !!isDeletingOrderItem || !!isDeletingOrder;
};
