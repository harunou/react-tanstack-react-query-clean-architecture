import type { ServiceGateway } from "../../types";
import { RemoteServiceGateway } from "./RemoteServiceGateway";
import { StubServiceGateway } from "./StubServiceGateway";

export const useServiceGateway = (): ServiceGateway => {
  return import.meta.env.PROD ? RemoteServiceGateway.make() : StubServiceGateway.make();
};
