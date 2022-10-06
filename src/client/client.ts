import { SocketRpcServerResponse } from '../interface';

export abstract class RpcClient {
  readonly host: string;
  readonly port: number;
  readonly auth: string | undefined;

  constructor(host: string, port: number, auth?: string) {
    this.host = host;
    this.port = port;
    this.auth = auth;
  }

  protected abstract send(route: string, data: unknown): Promise<SocketRpcServerResponse>;

  getMessageId() {
    return Math.floor(Math.random() * 2 ** 32);
  }
}
