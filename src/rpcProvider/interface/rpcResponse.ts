export type GetBalanceResponse = {
  account: string;
  assetId: string;
  confirmed: string;
  unconfirmed: string;
  unconfirmedCount: number;
  pending: string;
  pendingCount: number;
  confirmations: number;
  blockHash: string | null;
  sequence: number | null;
};

export type RpcAccountDecryptedNote = {
  owner: boolean;
  value: string;
  assetId: string;
  assetName: string;
  memo: string;
  sender: string;
  spent: boolean;
};

export type GetAccountTransactionResponse = {
  account: string;
  transaction: {
    hash: string;
    status: string;
    type: string;
    fee: string;
    blockHash?: string;
    blockSequence?: number;
    notesCount: number;
    spendsCount: number;
    mintsCount: number;
    burnsCount: number;
    timestamp: number;
    notes: RpcAccountDecryptedNote[];
    assetBalanceDeltas: { assetId: string; delta: string }[];
  } | null;
};

export type GetBlockResponse = {
  block: {
    graffiti: string;
    difficulty: string;
    hash: string;
    previousBlockHash: string;
    sequence: number;
    timestamp: number;
    noteSize: number;
    noteCommitment: string;
    transactions: {
      fee: string;
      hash: string;
      signature: string;
      notes: number;
      spends: number;
    }[];
  };
  metadata: {
    main: boolean;
    confirmed: boolean;
  };
};

export type BlockIdentifier = { index: string; hash: string };

export interface ChainInfo {
  currentBlockIdentifier: BlockIdentifier;
  genesisBlockIdentifier: BlockIdentifier;
  oldestBlockIdentifier: BlockIdentifier;
  currentBlockTimestamp: number;
}

export type GetChainInfoResponse = ChainInfo;

export type EstimateFeeRatesResponse = {
  slow: string;
  average: string;
  fast: string;
};

export type SendTransactionResponse = {
  account: string;
  hash: string;
  transaction: string;
};

export type GetChainTransactionResponse = {
  fee: string;
  expiration: number;
  notesCount: number;
  spendsCount: number;
  signature: string;
  notesEncrypted: string[];
  mints: {
    assetId: string;
    value: string;
  }[];
  burns: {
    assetId: string;
    value: string;
  }[];
};
