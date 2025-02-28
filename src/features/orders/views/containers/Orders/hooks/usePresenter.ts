import type { Presenter } from "../Orders.types";
import {
  useIsOrdersProcessingSelector,
  useOrderIdsSelector,
  useTotalItemsQuantitySelector,
} from "../../../../hooks/selectors";
import { useMemoRecord } from "../../../../../../utils";

export const usePresenter = (): Presenter => {
  const isLoading = useIsOrdersProcessingSelector();
  const orderIds = useOrderIdsSelector();
  const totalItemsQuantity = useTotalItemsQuantitySelector();

  return useMemoRecord({
    isLoading: isLoading,
    orderIds,
    totalItemsQuantity,
  });
};
