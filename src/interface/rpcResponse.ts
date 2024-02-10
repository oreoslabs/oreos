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
  confirmed: string;
  unconfirmed: string;
  unconfirmedCount: number;
  pending: string;
  pendingCount: number;
  available: string;
  confirmations: number;
  blockHash: string | null;
  sequence: number | null;
  /**
   * @deprecated Please use getAsset endpoint to get this information
   * */
  assetVerification: AssetVerification;
};

export type GetBalancesResponse = {
  account: string;
  balances: {
    assetId: string;
    confirmed: string;
    unconfirmed: string;
    unconfirmedCount: number;
    pending: string;
    pendingCount: number;
    available: string;
    blockHash: string | null;
    sequence: number | null;
    /**
     * @deprecated Please use getAsset endpoint to get this information
     */
    assetName: string;
    /**
     * @deprecated Please use getAsset endpoint to get this information
     */
    assetCreator: string;
    /**
     * @deprecated Please use getAsset endpoint to get this information
     * */
    assetOwner: string;
    /**
     * @deprecated Please use getAsset endpoint to get this information
     * */
    assetVerification: AssetVerification;
  }[];
};

export type RpcMint = {
  assetId: string;
  value: string;
  transferOwnershipTo?: string;
  /**
   * @deprecated Please use assetId instead
   */
  id: string;
  /**
   * @deprecated Please use getAsset endpoint to get this information
   */
  assetName: string;
  /**
   * @deprecated Please use getAsset endpoint to get this information
   */
  metadata: string;
  /**
   * @deprecated Please use getAsset endpoint to get this information
   */
  name: string;
  /**
   * @deprecated Please use getAsset endpoint to get this information
   */
  creator: string;
};

export type RpcBurn = {
  assetId: string;
  value: string;
  /**
   * @deprecated Please use getAsset endpoint to get this information
   */
  id: string;
  /**
   * @deprecated Please use getAsset endpoint to get this information
   */
  assetName: string;
};

export type RpcAsset = {
  id: string;
  name: string;
  nonce: number;
  owner: string;
  creator: string;
  metadata: string;
  createdTransactionHash: string;
  verification: AssetVerification;
  supply?: string;
  /**
   * @deprecated query for the transaction to find it's status
   */
  status: string;
};

export type RpcAccountAssetBalanceDelta = {
  assetId: string;
  delta: string;
  /**
   * @deprecated Please use the getAsset RPC to fetch additional asset details
   */
  assetName: string;
};

export type RpcWalletTransaction = {
  hash: string;
  fee: string;
  signature: string;
  expiration: number;
  timestamp: number;
  submittedSequence: number;
  type: TransactionType;
  status: TransactionStatus;
  assetBalanceDeltas: RpcAccountAssetBalanceDelta[];
  burns: RpcBurn[];
  mints: RpcMint[];
  serialized?: string;
  blockHash?: string;
  blockSequence?: number;
  notes?: RpcWalletNote[];
  spends?: RpcSpend[];
  /**
   * @deprecated Please use `notes.length` instead
   */
  notesCount: number;
  /**
   * @deprecated Please use `spends.length` instead
   */
  spendsCount: number;
  /**
   * @deprecated Please use `mints.length` instead
   */
  mintsCount: number;
  /**
   * @deprecated Please use `burns.length` instead
   */
  burnsCount: number;
  /**
   * @deprecated This is configuarable via the node config, a setting that the user can pass, so doesn't need to be returned
   */
  confirmations: number;
};

export type MintAssetResponse = RpcMint & {
  asset: RpcAsset;
  transaction: RpcWalletTransaction;
  /**
   * @deprecated Please use `transaction.hash` instead
   */
  hash: string;
};

export type BurnAssetResponse = RpcBurn & {
  asset: RpcAsset;
  transaction: RpcWalletTransaction;
  /**
   * @deprecated Please use `transaction.hash` instead
   */
  hash: string;
  /**
   * @deprecated Please use `asset.name` instead
   */
  name: string;
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
  transaction: RpcWalletTransaction | null;
};

export type GetAccountTransactionsResponse = RpcWalletTransaction;

export type GetAssetResponse = RpcAsset;

export type BroadcastTransactionResponse = {
  hash: string;
  accepted: boolean;
  broadcasted: boolean;
};

export type RpcBlockHeader = {
  hash: string;
  sequence: number;
  previousBlockHash: string;
  difficulty: string;
  noteCommitment: string;
  transactionCommitment: string;
  target: string;
  randomness: string;
  timestamp: number;
  graffiti: string;
  work: string;
  noteSize: number | null;
  /**
   * @deprecated Please use previousBlockHash instead
   */
  previous: string;
};

export type RpcEncryptedNote = {
  hash: string;
  serialized: string;
  /**
   * @deprecated Please use hash instead
   */
  commitment: string;
};

export type RpcTransaction = {
  hash: string;
  size: number;
  fee: number;
  expiration: number;
  signature: string;
  notes: RpcEncryptedNote[];
  spends: RpcSpend[];
  mints: RpcMint[];
  burns: RpcBurn[];
  serialized?: string;
};

export type RpcBlock = RpcBlockHeader & {
  size: number;
  transactions: RpcTransaction[];
};

export type GetBlockResponse = {
  block: RpcBlock;
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

export type GetTransactionResponse = RpcTransaction & {
  noteSize: number;
  blockHash: string;
  /**
   * @deprecated Please use `notes.length` instead
   */
  notesCount: number;
  /**
   * @deprecated Please use `spends.length` instead
   */
  spendsCount: number;
  /**
   * @deprecated Please use `notes` instead
   */
  notesEncrypted: string[];
};

export type GetNoteWitnessResponse = {
  treeSize: number;
  rootHash: string;
  authPath: {
    side: 'Left' | 'Right';
    hashOfSibling: string;
  }[];
};
