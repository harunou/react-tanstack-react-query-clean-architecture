import type { FC } from "react";
import { memo } from "react";
import { deleteItemButtonTestId, orderItemTestId } from "../../testIds";
import type { OrderItemProps } from "./OrderItem.types";
import { useController, usePresenter } from "./hooks";

export const OrderItem: FC<OrderItemProps> = memo((props) => {
  const presenter = usePresenter(props);
  const controller = useController(props);

  if (!presenter.hasItem) {
    return null;
  }

  return (
    <div
      style={{
        border: "1px dashed green",
        marginBottom: `${presenter.isLastItem ? "0px" : "3px"}`,
      }}
      data-testid={orderItemTestId}
    >
      <button
        data-testid={deleteItemButtonTestId}
        onClick={controller.deleteOrderItemButtonClicked}
      >
        Delete Item
      </button>
      <div>id: {presenter.itemId}</div>
      <div>productId: {presenter.productId}</div>
      <div>quantity: {presenter.productQuantity}</div>
    </div>
  );
});

OrderItem.displayName = "OrderItem";
