import { RpcTcpClient, RpcTlsClient } from '../client';
import { GetBalanceRequest, GetBlockRequest, GetBlockInfoRequest, GetChainInfoRequest, GetFeesRequest, GetAccountTransactionRequest, SendTransactionRequest } from '../interface';
export declare enum RpcServiceProtocol {
    tcp = "TCP",
    tls = "TLS",
    http = "HTTP"
}
export declare class RpcService {
    readonly mode: RpcServiceProtocol | undefined;
    readonly host: string;
    readonly port: number;
    readonly auth: string | undefined;
    readonly client: RpcTcpClient | RpcTlsClient;
    constructor(host: string, port: number, auth?: string, mode?: string);
    getBalance(getBalanceRequest: GetBalanceRequest): Promise<unknown>;
    getTransaction(getTransactionRequest: GetAccountTransactionRequest): Promise<unknown>;
    getBlock(getBlockRequest: GetBlockRequest): Promise<unknown>;
    getBlockInfo(getBlockInfoRequest: GetBlockInfoRequest): Promise<unknown>;
    getChainInfo(getChainInfoRequest: GetChainInfoRequest): Promise<unknown>;
    getFees(getFeeRequest: GetFeesRequest): Promise<unknown>;
    getStatus(): Promise<unknown>;
    sendTransaction(transaction: SendTransactionRequest): Promise<unknown>;
    request<T>(method: string, params: T): Promise<unknown>;
}
