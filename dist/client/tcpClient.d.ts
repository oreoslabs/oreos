import { RpcClient } from './client';
import { SocketRpcClient, SocketRpcServerResponse } from '../interface';
export declare class RpcTcpClient extends RpcClient {
    constructor(host: string, port: number, auth?: string);
    request(message: SocketRpcClient): Promise<string>;
    send(route: string, data: unknown): Promise<SocketRpcServerResponse>;
}
