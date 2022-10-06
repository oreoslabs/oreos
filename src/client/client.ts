import { SocketRpcServerResponse } from '../interface';

export abstract class RpcClient {
  readonly host: string;
  readonly port: number;
  readonly auth: string | undefined;

  protected messageBuffer: string;

  constructor(host: string, port: number, auth?: string) {
    this.host = host;
    this.port = port;
    this.auth = auth;
    this.messageBuffer = '';
  }

  protected abstract send(route: string, data: unknown): Promise<SocketRpcServerResponse>;

  getMessageId() {
    return Math.floor(Math.random() * 2 ** 32);
  }
}
