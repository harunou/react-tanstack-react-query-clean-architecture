import type { FC } from "react";
import {
  DeleteOrder,
  PrintAvailableOrderIds,
  PrintOrdersResource,
  SwitchOrdersResource,
} from "./commands";

export const cli: FC = () => {
  return (
    <>
      <DeleteOrder />
      <PrintAvailableOrderIds />
      <SwitchOrdersResource />
      <PrintOrdersResource />
    </>
  );
};
