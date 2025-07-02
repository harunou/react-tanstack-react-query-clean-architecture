import { useCallback } from "react";
import type { Controller } from "../Orders.types";
import { useQueryClient } from "@tanstack/react-query";
import { useOrdersResourceSelector } from "../../../../hooks/selectors";
import { useMemoRecord } from "../../../../../../utils";
import { keys } from "../../../../repositories/OrdersRepository/keys";

export const useController = (): Controller => {
  const queryClient = useQueryClient();
  const resource = useOrdersResourceSelector();
  const getOrdersKey = keys.makeGetOrdersKey(resource);

  const moduleDestroyed = useCallback(() => {
    queryClient.cancelQueries({ queryKey: getOrdersKey });
  }, [getOrdersKey, queryClient]);

  return useMemoRecord({ moduleDestroyed });
};
