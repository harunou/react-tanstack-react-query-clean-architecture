import { memo, useCallback, useEffect, type FC } from "react";
import type { OrderEntity, OrderEntityId } from "../../../types";
import { useDeleteOrderUseCase } from "../../../hooks/useCases";
import { useOrdersResourceSelector } from "../../../hooks/selectors";
import { useQueryClient } from "@tanstack/react-query";
import { useGetOrdersOptions } from "../../../gateways";

type StringPresenter = (arg: string) => void;
type TablePresenter = (data: string[]) => void;

type DeleteOrderController = (id: OrderEntityId) => Promise<void>;

declare global {
  interface Window {
    deleteOrder?: DeleteOrderController;
  }
}

export const DeleteOrder: FC = memo(() => {
  const deleteOrderController = useDeleteOrderController();

  useEffect(() => {
    window.deleteOrder = deleteOrderController;
    return () => {
      delete window.deleteOrder;
    };
  }, [deleteOrderController]);

  return null;
});

const useOrderIdsSelector = () => {
  const queryClient = useQueryClient();
  const resource = useOrdersResourceSelector();
  const options = useGetOrdersOptions(resource);
  return useCallback(async (): Promise<OrderEntityId[]> => {
    const orders = await queryClient.fetchQuery(options);
    return orders.map((order: OrderEntity) => order.id);
  }, [options, queryClient]);
};

const useDeleteOrderController = (): DeleteOrderController => {
  const renderTable = useTableRenderer();
  const presenter = useOrderIdsPresenter();
  const { execute: executeDeleteOrderUseCase } = useDeleteOrderUseCase();
  return useCallback(
    async (id: OrderEntityId): Promise<void> => {
      await executeDeleteOrderUseCase({ orderId: id });
      renderTable(await presenter());
    },
    [executeDeleteOrderUseCase, presenter, renderTable],
  );
};

const useOrderIdsPresenter = (): (() => Promise<string[]>) => {
  const selectOrderIds = useOrderIdsSelector();
  return useCallback(async () => {
    const data = await selectOrderIds();
    return data.map((id: OrderEntityId) => `${id}`);
  }, [selectOrderIds]);
};

const useStringRenderer = (): StringPresenter => {
  return useCallback((data: string): void => {
    console.log(data);
  }, []);
};

const useTableRenderer = (): TablePresenter => {
  return useCallback((data: string[]): void => {
    console.table(data);
  }, []);
};

void useStringRenderer;
void useTableRenderer;
