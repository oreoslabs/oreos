import axios from 'axios';
import {
  BroadcastTransactionRequest,
  BroadcastTransactionResponse,
  BurnAssetRequest,
  BurnAssetResponse,
  CreateTransactionRequest,
  CreateTransactionResponse,
  GetAccountTransactionRequest,
  GetAccountTransactionResponse,
  GetAccountTransactionsRequest,
  GetAccountTransactionsResponse,
  GetAssetRequest,
  GetAssetResponse,
  GetBalanceRequest,
  GetBalanceResponse,
  GetBalancesRequest,
  GetBalancesResponse,
  GetBlockRequest,
  GetBlockResponse,
  GetChainInfoRequest,
  GetChainInfoResponse,
  GetNoteWitnessRequest,
  GetNoteWitnessResponse,
  GetTransactionRequest,
  GetTransactionResponse,
  MintAssetRequest,
  MintAssetResponse,
  SendTransactionRequest,
  SendTransactionResponse,
} from './interface';
export * from './interface';

export class RpcService {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getBalance(req: GetBalanceRequest) {
    return await this.request<GetBalanceResponse>('wallet/getBalance', req);
  }

  async getBalances(req: GetBalancesRequest) {
    return await this.request<GetBalancesResponse>('wallet/getBalances', req);
  }

  async mintAsset(req: MintAssetRequest) {
    return await this.request<MintAssetResponse>('wallet/mintAsset', req);
  }

  async burnAsset(req: BurnAssetRequest) {
    return await this.request<BurnAssetResponse>('wallet/burnAsset', req);
  }

  async createTransaction(req: CreateTransactionRequest) {
    return await this.request<CreateTransactionResponse>(
      'wallet/createTransaction',
      req,
    );
  }

  async sendTransaction(req: SendTransactionRequest) {
    return await this.request<SendTransactionResponse>(
      'wallet/sendTransaction',
      req,
    );
  }

  async getAccountTransaction(req: GetAccountTransactionRequest) {
    return await this.request<GetAccountTransactionResponse>(
      'wallet/getAccountTransaction',
      req,
    );
  }

  async getAccountTransactions(req: GetAccountTransactionsRequest) {
    return await this.request<GetAccountTransactionsResponse>(
      'wallet/getAccountTransactions',
      req,
    );
  }

  async getAsset(req: GetAssetRequest) {
    return await this.request<GetAssetResponse>('chain/getAsset', req);
  }

  async broadcastTransaction(req: BroadcastTransactionRequest) {
    return await this.request<BroadcastTransactionResponse>(
      'chain/broadcastTransaction',
      req,
    );
  }

  async getBlock(req: GetBlockRequest) {
    return await this.request<GetBlockResponse>('chain/getBlock', req);
  }

  async getChainInfo(req: GetChainInfoRequest) {
    return await this.request<GetChainInfoResponse>('chain/getChainInfo', req);
  }

  async getTransaction(req: GetTransactionRequest) {
    return await this.request<GetTransactionResponse>(
      'chain/getTransaction',
      req,
    );
  }

  async getNoteWitness(req: GetNoteWitnessRequest) {
    return await this.request<GetNoteWitnessResponse>(
      'chain/getNoteWitness',
      req,
    );
  }

  async request<T>(
    method: string,
    params: any,
    options: { timeout?: number } = {},
  ) {
    const apiAddress = `http://${this.baseUrl}/${method}`;
    const response = await axios.post(apiAddress, params, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: options.timeout ?? 10000,
    });
    if (response.status === 200) {
      return response.data.data! as T;
    }
  }
}
