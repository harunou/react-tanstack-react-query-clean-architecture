import { memo, useEffect, type FC } from "react";
import { useController } from "./hooks/useController";
import { useLogRenderer } from "../../hooks/useLogRenderer";

export const DeleteOrder: FC = memo(() => {
  const renderer = useLogRenderer();
  const controller = useController();

  useEffect(() => {
    window.deleteOrder = async (id: unknown) => renderer(await controller(id));
    return () => {
      delete window.deleteOrder;
    };
  }, [controller, renderer]);

  return null;
});
