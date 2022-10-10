import net from 'net';
import { YupUtils } from '../../utils';
import { RpcClient } from './client';
import {
  SocketRpcClient,
  MESSAGE_DELIMITER,
  SocketRpcServerResponse,
  SocketRpcServerSchema,
} from '../interface';

export class RpcTcpClient extends RpcClient {
  constructor(host: string, port: number, auth?: string) {
    super(host, port, auth);
  }

  async request(message: SocketRpcClient): Promise<string> {
    return new Promise((resolve, reject): void => {
      const onConnect = () => {
        client.off('connect', onConnect);
        client.off('error', onError);
        client.write(JSON.stringify(message) + MESSAGE_DELIMITER);
      };

      const onData = async (dataBuffer: Buffer) => {
        client.off('connect', onConnect);
        client.off('error', onError);

        this.messageBuffer += dataBuffer.toString('utf-8');
        if (this.messageBuffer.lastIndexOf(MESSAGE_DELIMITER) !== -1) {
          resolve(this.messageBuffer);
          client.end();
          this.messageBuffer = '';
        }
      };

      const onError = (error: unknown) => {
        client.off('connect', onConnect);
        client.off('error', onError);
        reject(error);
      };

      const client = net.connect(this.port, this.host);
      client.on('error', onError);
      client.on('connect', onConnect);
      client.on('data', onData);
    });
  }

  async send(route: string, data: unknown): Promise<SocketRpcServerResponse> {
    const message: SocketRpcClient = {
      type: 'message',
      data: {
        mid: this.getMessageId(),
        type: route,
        auth: this.auth,
        data,
      },
    };
    const response = await this.request(message);
    const { result, error } = await YupUtils.tryValidate(
      SocketRpcServerSchema,
      JSON.parse(response.substring(0, response.length - 1)),
    );
    return {
      result,
      error,
    };
  }
}
