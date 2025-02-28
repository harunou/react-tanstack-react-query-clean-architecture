import type { ApiHttpClient } from "../api.types";
import { HttpClient } from "../httpClient";
import type { OrdersSnapshotDto } from "./ServiceApi.types";

export class ServiceApi {
  static make(): ServiceApi {
    return new ServiceApi(HttpClient.make());
  }

  private serviceApiUrl = "/api/service";

  constructor(private httpClient: ApiHttpClient) {}

  async logOrdersSnapshot(snapshot: OrdersSnapshotDto): Promise<void> {
    const request = new Request(`${this.serviceApiUrl}/snapshot`, {
      method: "POST",
      body: JSON.stringify(snapshot),
    });
    await this.httpClient.request(request);
  }
}
