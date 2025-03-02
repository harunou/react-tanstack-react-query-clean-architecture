import { type FC, memo, useEffect } from "react";
import { useOrdersResourceSelector } from "../../hooks/selectors";

declare global {
  interface Window {
    printOrdersResource?: () => void;
  }
}

export const PrintOrdersResource: FC = memo(() => {
  const resource = useOrdersResourceSelector();
  useEffect(() => {
    window.printOrdersResource = () => {
      console.log(`Orders resource is "${resource}"`);
    };

    return () => {
      delete window.printOrdersResource;
    };
  }, [resource]);
  return null;
});
