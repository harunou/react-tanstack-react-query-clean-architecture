import { memo, useEffect, type FC } from "react";
import { useController } from "./hooks/useController";

export const DeleteOrder: FC = memo(() => {
  const deleteOrderController = useController();

  useEffect(() => {
    window.deleteOrder = deleteOrderController;
    return () => {
      delete window.deleteOrder;
    };
  }, [deleteOrderController]);

  return null;
});
