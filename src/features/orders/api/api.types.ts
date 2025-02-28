export interface ApiRequestParams {
  signal?: AbortSignal;
}

export interface ApiHttpClient {
  request: (request: Request) => Promise<Response>;
}
