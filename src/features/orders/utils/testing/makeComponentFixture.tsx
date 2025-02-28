import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FC, PropsWithChildren } from "react";

export const makeComponentFixture = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Fixture: FC<PropsWithChildren<unknown>> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return {
    user: userEvent.setup(),
    Fixture,
  };
};
