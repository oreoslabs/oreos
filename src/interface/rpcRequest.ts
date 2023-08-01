export type GetBalanceRequest = {
  account?: string;
  assetId?: string;
  confirmations?: number;
};

export type GetBalancesRequest = {
  account?: string;
  confirmations?: number;
};

export type MintAssetRequest = {
  account: string;
  fee: string;
  value: string;
  assetId?: string;
  expiration?: number;
  expirationDelta?: number;
  confirmations?: number;
  metadata?: string;
  name?: string;
};

export type BurnAssetRequest = {
  account: string;
  assetId: string;
  fee: string;
  value: string;
  expiration?: number;
  expirationDelta?: number;
  confirmations?: number;
};

export type CreateTransactionRequest = {
  account: string;
  outputs: {
    publicAddress: string;
    amount: string;
    memo: string;
    assetId?: string;
  }[];
  mints?: {
    assetId?: string;
    name?: string;
    metadata?: string;
    value: string;
  }[];
  burns?: {
    assetId: string;
    value: string;
  }[];
  fee?: string | null;
  feeRate?: string | null;
  expiration?: number;
  expirationDelta?: number;
  confirmations?: number;
  notes?: string[];
};

export type SendTransactionRequest = {
  account: string;
  outputs: {
    publicAddress: string;
    amount: string;
    memo: string;
    assetId?: string;
  }[];
  fee?: string;
  feeRate?: string;
  expiration?: number | null;
  expirationDelta?: number | null;
  confirmations?: number | null;
};

export type GetAccountTransactionRequest = {
  hash: string;
  account?: string;
  confirmations?: number;
};

export type GetAccountTransactionsRequest = {
  account?: string;
  hash?: string;
  sequence?: number;
  limit?: number;
  offset?: number;
  confirmations?: number;
  notes?: boolean;
  spends?: boolean;
};

export type GetAssetRequest = {
  id: string;
};

export type BroadcastTransactionRequest = {
  transaction: string;
};

export type GetBlockRequest = {
  search?: string;
  hash?: string;
  sequence?: number;
  confirmations?: number;
};

export type GetChainInfoRequest = Record<string, never> | undefined;

export type GetTransactionRequest = {
  transactionHash: string;
  blockHash?: string;
};
