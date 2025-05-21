import { useQuery } from "@tanstack/react-query";
import { type FC, memo, useCallback, useEffect } from "react";
import { useGetOrdersOptions } from "../../gateways";
import { useOrdersResourceSelector } from "../../hooks/selectors";
import { useConsoleRenderer } from "../hooks/useConsoleRenderer";

declare global {
  interface Window {
    printAvailableOrderIds?: () => void;
  }
}

export type PrintAvailableOrderIdsController = () => Promise<string | Error>;

const useController = (): PrintAvailableOrderIdsController => {
  const resource = useOrdersResourceSelector();
  const { refetch } = useQuery({ ...useGetOrdersOptions(resource) });
  return useCallback(async () => {
    try {
      const { data: orders = [] } = await refetch();
      const ids = orders?.map((order) => `"${order.id}"`) ?? [];
      if (ids.length) {
        return `Available order ids: ${ids.join(", ")}`;
      }
      return "No orders available";
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
      return "Unknown error";
    }
  }, [refetch]);
};

export const PrintAvailableOrderIds: FC = memo(() => {
  const renderer = useConsoleRenderer();
  const controller = useController();

  useEffect(() => {
    window.printAvailableOrderIds = async () => renderer(await controller());

    return () => {
      delete window.printAvailableOrderIds;
    };
  }, [controller, renderer]);

  return null;
});
