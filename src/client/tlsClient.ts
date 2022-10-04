import { RpcTcpClient } from './tcpClient';
import {
  SocketRpcClient,
  SocketRpcServer,
  SocketRpcServerSchema,
  MESSAGE_DELIMITER,
} from '../interface';
import { YupUtils } from '../utils/yup';
import * as tls from 'tls';

export class RpcTlsClient extends RpcTcpClient {
  async request(message: SocketRpcClient) {
    return new Promise((resolve, reject): void => {
      const onSecureConnect = () => {
        client.off('connect', onSecureConnect);
        client.off('error', onError);
        client.write(JSON.stringify(message) + MESSAGE_DELIMITER);
      };

      const onData = async (dataBuffer: Buffer) => {
        client.off('connect', onSecureConnect);
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
        client.off('connect', onSecureConnect);
        client.off('error', onError);
        reject(error);
      };

      const options = {
        rejectUnauthorized: false,
      };

      const client = tls.connect(this.port, this.host, options, onSecureConnect);
      client.on('error', onError);
      client.on('data', onData);
    });
  }
}
