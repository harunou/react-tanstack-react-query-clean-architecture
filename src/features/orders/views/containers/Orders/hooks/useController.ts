import { useCallback } from "react";
import type { Controller } from "../Orders.types";
import { useQueryClient } from "@tanstack/react-query";
import { useOrdersResourceSelector } from "../../../../hooks/selectors";
import { useGetOrdersKey } from "../../../../gateways";
import { useMemoRecord } from "../../../../../../utils";

export const useController = (): Controller => {
  const queryClient = useQueryClient();
  const resource = useOrdersResourceSelector();
  const key = useGetOrdersKey(resource);

  const moduleDestroyed = useCallback(() => {
    queryClient.cancelQueries({ queryKey: key });
  }, [key, queryClient]);

  return useMemoRecord({ moduleDestroyed });
};
