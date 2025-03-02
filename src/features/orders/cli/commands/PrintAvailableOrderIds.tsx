import { useQuery } from "@tanstack/react-query";
import { type FC, memo, useEffect } from "react";
import { useGetOrdersOptions } from "../../gateways";
import { useOrdersResourceSelector } from "../../hooks/selectors";

declare global {
  interface Window {
    printAvailableOrderIds?: () => void;
  }
}

export const PrintAvailableOrderIds: FC = memo(() => {
  const resource = useOrdersResourceSelector();
  const { refetch } = useQuery({ ...useGetOrdersOptions(resource) });
  useEffect(() => {
    window.printAvailableOrderIds = async () => {
      try {
        const { data } = await refetch();
        const ids = data?.map((order) => `"${order.id}"`) ?? [];
        if (ids.length) {
          console.log(`Available order ids: ${ids}`);
        } else {
          console.log("No orders available");
        }
      } catch (e) {
        console.log(e);
      }
    };

    return () => {
      delete window.printAvailableOrderIds;
    };
  }, [refetch]);
  return null;
});
