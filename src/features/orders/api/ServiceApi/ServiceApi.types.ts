export interface OrdersSnapshotDto {
  timestamp: number;
  orders: Array<{
    id: string;
    userId: string;
    entries: Array<{
      id: string;
      productId: string;
      number: number;
    }>;
  }>;
}
