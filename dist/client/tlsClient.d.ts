import { RpcTcpClient } from './tcpClient';
import { SocketRpcClient } from '../interface';
export declare class RpcTlsClient extends RpcTcpClient {
    request(message: SocketRpcClient): Promise<string>;
}
