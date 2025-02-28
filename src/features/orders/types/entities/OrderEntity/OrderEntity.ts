import type { ItemEntity } from "../ItemEntity";
import type { Nominal, UniqueEntity } from "../../../../../@types";

export type OrderEntityId = Nominal<string, "ORDER_ENTITY_ID">;

export type OrderEntity = UniqueEntity<OrderEntityId> & {
  userId: string;
  itemEntities: ItemEntity[];
};
