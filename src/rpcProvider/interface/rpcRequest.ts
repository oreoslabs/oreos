export type GetBalanceRequest = {
  account?: string;
  assetId?: string;
  confirmations?: number;
};

export type GetAccountTransactionRequest = {
  account?: string;
  hash: string;
};

export type GetBlockRequest = {
  search?: string;
  hash?: string;
  sequence?: number;
  confirmations?: number;
};

export type GetChainInfoRequest = Record<string, never> | undefined;

export type EstimateFeeRatesRequest = undefined;

export type SendTransactionRequest = {
  account: string;
  outputs: {
    publicAddress: string;
    amount: string;
    memo: string;
    assetId?: string;
  }[];
  fee: string;
  expiration?: number | null;
  expirationDelta?: number | null;
  confirmations?: number | null;
};
