import { memo, useEffect, type FC } from "react";
import type { OrderEntityId } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { useGetOrdersOptions } from "../../gateways";
import { useOrdersResourceSelector } from "../../hooks/selectors";
import { useDeleteOrderUseCase } from "../../hooks/useCases";

declare global {
  interface Window {
    deleteOrder: (id: OrderEntityId) => void;
  }
}

export const DeleteOrder: FC = memo(() => {
  const resource = useOrdersResourceSelector();
  const { execute: executeDeleteOrder } = useDeleteOrderUseCase();

  const { refetch } = useQuery({ ...useGetOrdersOptions(resource) });

  useEffect(() => {
    window.deleteOrder = async (id: OrderEntityId) => {
      try {
        await executeDeleteOrder({ orderId: id });
        const result = await refetch();
        console.log("Current orders: ", result.data);
      } catch (e) {
        console.log(e);
      }
    };
  }, [executeDeleteOrder, refetch]);

  return null;
});
