/* eslint-disable no-unused-vars */

export type AssetVerification = {
  status: 'verified' | 'unverified' | 'unknown';
};

export enum TransactionStatus {
  CONFIRMED = 'confirmed',
  EXPIRED = 'expired',
  PENDING = 'pending',
  UNCONFIRMED = 'unconfirmed',
  UNKNOWN = 'unknown',
}

export enum TransactionType {
  SEND = 'send',
  RECEIVE = 'receive',
  MINER = 'miner',
}

export type GetBalanceResponse = {
  account: string;
  assetId: string;
  assetVerification: AssetVerification;
  confirmed: string;
  unconfirmed: string;
  unconfirmedCount: number;
  pending: string;
  pendingCount: number;
  available: string;
  confirmations: number;
  blockHash: string | null;
  sequence: number | null;
};

export type GetBalancesResponse = {
  account: string;
  balances: {
    assetId: string;
    assetName: string;
    assetCreator: string;
    assetVerification: AssetVerification;
    confirmed: string;
    unconfirmed: string;
    unconfirmedCount: number;
    pending: string;
    pendingCount: number;
    available: string;
    blockHash: string | null;
    sequence: number | null;
  }[];
};

export type MintAssetResponse = {
  assetId: string;
  hash: string;
  name: string;
  value: string;
};

export type BurnAssetResponse = {
  assetId: string;
  hash: string;
  name: string;
  value: string;
};

export type CreateTransactionResponse = {
  transaction: string;
};

export type SendTransactionResponse = {
  account: string;
  hash: string;
  transaction: string;
};

export type RpcSpend = {
  nullifier: string;
  commitment: string;
  size: number;
};

export type RpcWalletNote = {
  value: string;
  assetId: string;
  assetName: string;
  memo: string;
  sender: string;
  owner: string;
  noteHash: string;
  transactionHash: string;
  index: number | null;
  nullifier: string | null;
  spent: boolean;
  /**
   * @deprecated Please use `owner` address instead
   */
  isOwner: boolean;
  /**
   * @deprecated Please use `noteHash` instead
   */
  hash: string;
};

export type GetAccountTransactionResponse = {
  account: string;
  transaction: {
    hash: string;
    status: TransactionStatus;
    type: TransactionType;
    confirmations: number;
    fee: string;
    blockHash?: string;
    blockSequence?: number;
    notesCount: number;
    spendsCount: number;
    mintsCount: number;
    burnsCount: number;
    timestamp: number;
    submittedSequence: number;
    assetBalanceDeltas: {
      assetId: string;
      assetName: string;
      delta: string;
    }[];
    notes: RpcWalletNote[];
    spends: RpcSpend[];
  } | null;
};

export type GetAccountTransactionsResponse = {
  hash: string;
  status: TransactionStatus;
  type: TransactionType;
  confirmations: number;
  fee: string;
  blockHash?: string;
  blockSequence?: number;
  notesCount: number;
  spendsCount: number;
  mintsCount: number;
  burnsCount: number;
  expiration: number;
  timestamp: number;
  submittedSequence: number;
  assetBalanceDeltas: {
    assetId: string;
    assetName: string;
    delta: string;
  }[];
  notes?: RpcWalletNote[];
  spends?: RpcSpend[];
};

export type GetAssetResponse = {
  createdTransactionHash: string;
  id: string;
  metadata: string;
  name: string;
  nonce: number;
  creator: string;
  supply: string;
};

export type BroadcastTransactionResponse = {
  hash: string;
  accepted: boolean;
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

export type RpcNote = {
  hash: string;
  serialized: string;
};

export type GetTransactionResponse = {
  fee: string;
  expiration: number;
  noteSize: number;
  notesCount: number;
  spendsCount: number;
  signature: string;
  spends: RpcSpend[];
  notes: RpcNote[];
  mints: {
    assetId: string;
    value: string;
  }[];
  burns: {
    assetId: string;
    value: string;
  }[];
  blockHash: string;
  /**
   * @deprecated Please use `notes` instead
   */
  notesEncrypted: string[];
};
