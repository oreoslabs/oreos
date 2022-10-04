import { RpcTcpClient, RpcTlsClient } from '../client';
import {
  GetBalanceRequest,
  GetBlockRequest,
  GetBlockInfoRequest,
  GetChainInfoRequest,
  GetFeesRequest,
  GetAccountTransactionRequest,
  SendTransactionRequest,
} from '../interface';

export enum RpcServiceProtocol {
  tcp = 'TCP',
  tls = 'TLS',
  http = 'HTTP'
}

export class RpcService {
  readonly mode: RpcServiceProtocol | undefined = RpcServiceProtocol.tcp;
  readonly host: string;
  readonly port: number;
  readonly auth: string | undefined = undefined;
  readonly client: RpcTcpClient | RpcTlsClient;

  constructor(host: string, port: number, auth?: string, mode?: string) {
    this.host = host;
    this.port = port;
    this.auth = auth;
    switch (mode) {
      case RpcServiceProtocol.tcp: {
        this.mode = RpcServiceProtocol.tcp;
        this.client = new RpcTcpClient(host, port, auth);
        break;
      }
      case RpcServiceProtocol.tls: {
        this.mode = RpcServiceProtocol.tls;
        this.client = new RpcTlsClient(host, port, auth);
        break;
      }
      default: {
        this.mode = RpcServiceProtocol.tcp;
        this.client = new RpcTcpClient(host, port, auth);
        break;
      }
    }
  }

  async getBalance(getBalanceRequest: GetBalanceRequest) {
    return await this.client.send('account/getBalance', getBalanceRequest);
  }

  async getTransaction(getTransactionRequest: GetAccountTransactionRequest) {
    return await this.client.send('account/getAccountTransaction', getTransactionRequest);
  }

  async getBlock(getBlockRequest: GetBlockRequest) {
    return await this.client.send('chain/getBlock', getBlockRequest);
  }

  async getBlockInfo(getBlockInfoRequest: GetBlockInfoRequest) {
    return await this.client.send('chain/getBlockInfo', getBlockInfoRequest);
  }

  async getChainInfo(getChainInfoRequest: GetChainInfoRequest) {
    return await this.client.send('chain/getChainInfo', getChainInfoRequest);
  }

  async getFees(getFeeRequest: GetFeesRequest) {
    return await this.client.send('fees/getFees', getFeeRequest);
  }

  async getStatus() {
    return await this.client.send('node/getStatus', undefined);
  }

  async sendTransaction(transaction: SendTransactionRequest) {
    return await this.client.send('transaction/sendTransaction', transaction);
  }
}
