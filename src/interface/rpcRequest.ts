export type GetBalanceRequest = {
  account?: string;
  minimumBlockConfirmations?: number;
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

export type GetFeesRequest = {
  numOfBlocks: number;
};

export type SendTransactionRequest = {
  fromAccountName: string;
  receives: {
    publicAddress: string;
    amount: string;
    memo: string;
  }[];
  fee: string;
  expirationSequence?: number | null;
  expirationSequenceDelta?: number | null;
};
