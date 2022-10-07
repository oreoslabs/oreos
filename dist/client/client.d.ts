import { SocketRpcServerResponse } from '../interface';
export declare abstract class RpcClient {
    readonly host: string;
    readonly port: number;
    readonly auth: string | undefined;
    protected messageBuffer: string;
    constructor(host: string, port: number, auth?: string);
    getMessageId(): number;
    protected abstract send(route: string, data: unknown): Promise<SocketRpcServerResponse>;
}
