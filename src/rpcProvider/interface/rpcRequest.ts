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
  index?: number;
  hash?: string;
};

export type GetBlockInfoRequest = {
  search?: string;
  hash?: string;
  sequence?: number;
};

export type GetChainInfoRequest = Record<string, never> | undefined;

export type EstimateFeeRequest = {
  fromAccountName: string;
  receives: {
    publicAddress: string;
    amount: string;
    memo: string;
  }[];
};

export type SendTransactionRequest = {
  fromAccountName: string;
  receives: {
    publicAddress: string;
    amount: string;
    memo: string;
    assetId?: string;
  }[];
  fee: string;
  expiration?: number | null;
  expirationDelta?: number | null;
};
