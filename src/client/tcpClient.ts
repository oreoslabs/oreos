import * as net from 'net';
import { YupUtils } from '../utils/yup';
import { RpcClient } from './client';
import {
  SocketRpcClient,
  SocketRpcServer,
  SocketRpcServerSchema,
  MESSAGE_DELIMITER,
} from '../interface';

export class RpcTcpClient extends RpcClient {
  constructor(host: string, port: number, auth?: string) {
    super(host, port, auth);
  }

  async request(message: SocketRpcClient) {
    return new Promise((resolve, reject): void => {
      const onConnect = () => {
        client.off('connect', onConnect);
        client.off('error', onError);
        client.write(JSON.stringify(message) + MESSAGE_DELIMITER);
      };

      const onData = async (dataBuffer: Buffer) => {
        client.off('connect', onConnect);
        client.off('error', onError);

        const received = dataBuffer.toString('utf-8');
        const {
          result,
          error,
        } = await YupUtils.tryValidate(
          SocketRpcServerSchema,
          JSON.parse(received.substring(0, received.length - 1)),
        );
        if (!result) {
          reject(error);
        } else {
          const { data }: SocketRpcServer = result;
          client.end();
          resolve(data);
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

  async send(route: string, data: unknown) {
    const message: SocketRpcClient = {
      type: 'message',
      data: {
        mid: this.getMessageId(),
        type: route,
        auth: this.auth,
        data,
      },
    };
    return await this.request(message);
  }
}
