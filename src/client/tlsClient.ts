import { RpcTcpClient } from './tcpClient';
import {
  SocketRpcClient,
  MESSAGE_DELIMITER,
} from '../interface';
import * as tls from 'tls';

export class RpcTlsClient extends RpcTcpClient {
  async request(message: SocketRpcClient): Promise<string> {
    return new Promise((resolve, reject): void => {
      const onSecureConnect = () => {
        client.off('secureConnection', onSecureConnect);
        client.off('error', onError);
        client.write(JSON.stringify(message) + MESSAGE_DELIMITER);
      };

      const onData = async (dataBuffer: Buffer) => {
        client.off('secureConnection', onSecureConnect);
        client.off('error', onError);

        resolve(dataBuffer.toString('utf-8'));
        client.end();
      };

      const onError = (error: unknown) => {
        client.off('secureConnection', onSecureConnect);
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
