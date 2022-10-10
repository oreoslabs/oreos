import { RpcTcpClient, RpcTlsClient } from '../client';
import {
  GetBalanceRequest,
  GetBlockRequest,
  GetBlockInfoRequest,
  GetChainInfoRequest,
  GetFeesRequest,
  GetAccountTransactionRequest,
  SendTransactionRequest,
  SocketRpcResponseSchema,
} from '../interface';
import { YupUtils } from '../../utils';

export enum RpcServiceProtocol {
  tcp = 'TCP',
  tls = 'TLS',
  http = 'HTTP',
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
    return await this.request('account/getBalance', getBalanceRequest);
  }

  async getTransaction(getTransactionRequest: GetAccountTransactionRequest) {
    return await this.request(
      'account/getAccountTransaction',
      getTransactionRequest,
    );
  }

  async getBlock(getBlockRequest: GetBlockRequest) {
    return await this.request('chain/getBlock', getBlockRequest);
  }

  async getBlockInfo(getBlockInfoRequest: GetBlockInfoRequest) {
    return await this.request('chain/getBlockInfo', getBlockInfoRequest);
  }

  async getChainInfo(getChainInfoRequest: GetChainInfoRequest) {
    return await this.request('chain/getChainInfo', getChainInfoRequest);
  }

  async getFees(getFeeRequest: GetFeesRequest) {
    return await this.request('fees/getFees', getFeeRequest);
  }

  async getStatus() {
    return await this.request('node/getStatus', undefined);
  }

  async sendTransaction(transaction: SendTransactionRequest) {
    return await this.request('transaction/sendTransaction', transaction);
  }

  async request<T>(method: string, params: T) {
    const response = await this.client.send(method, params);
    if (response.result) {
      const { result, error } = await YupUtils.tryValidate(
        SocketRpcResponseSchema,
        response.result.data,
      );
      if (result) {
        return result.data;
      } else {
        return error;
      }
    } else {
      return response.error;
    }
  }
}
