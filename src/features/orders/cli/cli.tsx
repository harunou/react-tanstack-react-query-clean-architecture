import type { FC } from "react";
import { DeleteOrder, SwitchOrdersResource } from "./commands";

export const cli: FC = () => {
  return (
    <>
      <DeleteOrder />
      <SwitchOrdersResource />
    </>
  );
};
