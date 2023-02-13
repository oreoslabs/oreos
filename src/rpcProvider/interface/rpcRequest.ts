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

export type PriorityLevel = typeof PRIORITY_LEVELS[number];
export type PriorityLevelPercentiles = {
  low: number;
  medium: number;
  high: number;
};

export const PRIORITY_LEVELS = ['low', 'medium', 'high'] as const;

export type EstimateFeeRatesRequest = { priority?: PriorityLevel } | undefined;

export type SendTransactionRequest = {
  fromAccountName: string;
  outputs: {
    publicAddress: string;
    amount: string;
    memo: string;
    assetId?: string;
  }[];
  fee: string;
  expiration?: number | null;
  expirationDelta?: number | null;
};
