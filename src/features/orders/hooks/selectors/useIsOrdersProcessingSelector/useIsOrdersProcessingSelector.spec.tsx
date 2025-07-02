import type { UserEvent } from "@testing-library/user-event";
import type { FC, PropsWithChildren } from "react";
import { type Mocked, describe, beforeEach, vi, afterEach, it, expect } from "vitest";
import { makeDeferred, output } from "../../../../../utils/testing";
import type { OrderEntity, OrdersGateway } from "../../../types";
import { makeOrderEntityId, makeItemEntityId } from "../../../utils";
import { stubMakeOrdersService } from "../../../utils/testing";
import { makeComponentFixture } from "../../../utils/testing/makeComponentFixture";
import { useIsOrdersProcessingSelector } from "./useIsOrdersProcessingSelector";
import { render, screen } from "@testing-library/react";
import { useMutation } from "@tanstack/react-query";
import { useDeleteOrderItemOptions } from "../../../repositories/OrdersRepository";

interface LocalTestContext {
  Fixture: FC<PropsWithChildren<unknown>>;
  Sut: FC;
  user: UserEvent;
  gateway: Mocked<OrdersGateway>;
}

type Output = {
  isLoading: boolean;
};

const outputTestId = "output-test-id";
const deleteOrderItemButtonTestId = "delete-button-test-id";

describe(`${useIsOrdersProcessingSelector.name}`, () => {
  beforeEach<LocalTestContext>((context) => {
    vi.useFakeTimers();

    const orderId = makeOrderEntityId("3");
    const itemId = makeItemEntityId("5");

    const { Fixture, user } = makeComponentFixture();
    const Component: FC = () => {
      const isLoading = useIsOrdersProcessingSelector();
      const { mutateAsync: deleteOrderItem } = useMutation({
        ...useDeleteOrderItemOptions("local"),
      });
      return (
        <>
          <button
            data-testid={deleteOrderItemButtonTestId}
            onClick={() => deleteOrderItem({ orderId, itemId })}
          >
            delete item
          </button>
          <div data-testid={outputTestId}>
            {output<Output>({
              isLoading,
            })}
          </div>
        </>
      );
    };
    context.Fixture = Fixture;
    context.Sut = () => {
      return (
        <Fixture>
          <Component />
        </Fixture>
      );
    };
    context.user = user;
    context.gateway = stubMakeOrdersService();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it<LocalTestContext>("displays isLoading as true when orders are being fetched", async (context) => {
    const { promise } = makeDeferred<OrderEntity[]>();
    context.gateway.getOrders.mockReturnValue(promise);

    render(<context.Sut />);

    await vi.runAllTimersAsync();

    expect(screen.getByTestId(outputTestId)).toHaveOutput<Output>({
      isLoading: true,
    });
  });

  it<LocalTestContext>("displays isLoading as false when orders are fetched", async (context) => {
    context.gateway.getOrders.mockResolvedValue([]);

    render(<context.Sut />);

    await vi.runAllTimersAsync();

    expect(screen.getByTestId(outputTestId)).toHaveOutput<Output>({
      isLoading: false,
    });
  });

  it<LocalTestContext>("displays isLoading as true when order item is being deleted", async (context) => {
    const { promise } = makeDeferred<void>();
    context.gateway.getOrders.mockResolvedValue([]);
    context.gateway.deleteItem.mockReturnValue(promise);

    render(<context.Sut />);

    await vi.runAllTimersAsync();

    context.user.click(screen.getByTestId(deleteOrderItemButtonTestId));

    await vi.runAllTimersAsync();

    expect(screen.getByTestId(outputTestId)).toHaveOutput<Output>({
      isLoading: true,
    });
  });
});
