import { describe, it, expect, vi, beforeEach, afterEach, type Mocked } from "vitest";
import { useTotalItemsQuantitySelector } from "./useTotalItemsQuantitySelector";
import { render, renderHook, screen } from "@testing-library/react";
import { memo, type FC, type PropsWithChildren } from "react";
import type { UserEvent } from "@testing-library/user-event";
import { output } from "../../../../../utils/testing";
import { ordersRepository } from "../../../repositories";
import type { OrdersGateway, OrderEntity } from "../../../types";
import { makeOrderEntityId } from "../../../utils";
import {
  resetOrderEntitiesFactories,
  stubMakeOrdersService,
  makeOrderEntities,
} from "../../../utils/testing";
import { makeComponentFixture } from "../../../utils/testing/makeComponentFixture";

interface LocalTestContext {
  Fixture: FC<PropsWithChildren<unknown>>;
  user: UserEvent;
  gateway: Mocked<OrdersGateway>;
  orders: OrderEntity[];
}

interface Output {
  quantity: number;
}

const outputTestId = "output-test-id";
const deleteOrderButtonTestId = "delete-order-button-test-id";

describe(`${useTotalItemsQuantitySelector.name}`, () => {
  beforeEach<LocalTestContext>((context) => {
    vi.useFakeTimers();

    resetOrderEntitiesFactories();

    const { Fixture, user } = makeComponentFixture();
    context.Fixture = Fixture;
    context.user = user;
    context.gateway = stubMakeOrdersService();
    context.orders = makeOrderEntities();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it<LocalTestContext>("returns 0 when there are no orders", async (context) => {
    context.gateway.getOrders.mockResolvedValueOnce([]);

    const { result } = renderHook(() => useTotalItemsQuantitySelector(), {
      wrapper: context.Fixture,
    });

    await vi.runAllTimersAsync();

    expect(result.current).toBe(0);
  });

  it<LocalTestContext>("returns 0 when the gateway fails to fetch orders", async (context) => {
    context.gateway.getOrders.mockRejectedValueOnce([]);

    const { result } = renderHook(() => useTotalItemsQuantitySelector(), {
      wrapper: context.Fixture,
    });

    await vi.runAllTimersAsync();

    expect(result.current).toBe(0);
  });

  it<LocalTestContext>("returns total quantity of items in the order ", async (context) => {
    context.gateway.getOrders.mockResolvedValueOnce(context.orders);

    const { result } = renderHook(() => useTotalItemsQuantitySelector(), {
      wrapper: context.Fixture,
    });

    await vi.runAllTimersAsync();

    expect(result.current).toBe(1825);
  });

  it<LocalTestContext>("changes value once an order is deleted", async (context) => {
    const fakeOrderId = makeOrderEntityId("9000");
    const Component: FC = memo(() => {
      const quantity = useTotalItemsQuantitySelector();
      const { mutateAsync: deleteOrder } = ordersRepository.useDeleteOrder("local");
      return (
        <>
          <div data-testid={outputTestId}>
            {output<Output>({
              quantity,
            })}
          </div>
          <button
            data-testid={deleteOrderButtonTestId}
            onClick={() => deleteOrder({ orderId: fakeOrderId })}
          ></button>
        </>
      );
    });
    const Sut: FC = () => (
      <context.Fixture>
        <Component />
      </context.Fixture>
    );

    const orders0 = context.orders.slice();
    const orders1 = context.orders.slice(0, 2);

    context.gateway.getOrders.mockResolvedValueOnce(orders0).mockResolvedValueOnce(orders1);
    context.gateway.deleteOrder.mockResolvedValueOnce();

    render(<Sut />);

    await vi.runAllTimersAsync();

    const deleteButton = screen.getByTestId(deleteOrderButtonTestId);

    context.user.click(deleteButton);

    await vi.runAllTimersAsync();

    expect(screen.getByTestId(outputTestId)).toHaveOutput<Output>({
      quantity: 730,
    });
  });
});
