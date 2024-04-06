import {QueryClientImpl as NFTQueryClient} from "./proto-ts/coreum/nft/v1beta1/query";

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

export class QueryClient {
  private readonly nftClient: NFTQueryClient;

  constructor(rpc: Rpc) {
    this.nftClient = new NFTQueryClient(rpc)
  }

  public NFTClient(): NFTQueryClient {
    return this.nftClient
  }
}
