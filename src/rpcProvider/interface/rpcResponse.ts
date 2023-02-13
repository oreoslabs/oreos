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

interface Operation {
  operation_id: { index: number; network_index: number };
  type: string;
}

interface Note {
  commitment: string;
}

interface Spend {
  nullifier: string;
}

interface Transaction {
  transaction_id: { hash: string };
  operations: Operation[];
  metadata: {
    size: number;
    notes: Note[];
    spends: Spend[];
  };
}

interface Block {
  blockIdentifier: { index: string; hash: string };
  parentBlockIdentifier: { index: string; hash: string };
  timestamp: number;
  transactions: Transaction[];
  metadata: {
    size: number;
    difficulty: number;
  };
}

export type GetBlockResponse = Block;

export type GetBlockInfoResponse = {
  block: {
    graffiti: string;
    difficulty: string;
    hash: string;
    previousBlockHash: string;
    sequence: number;
    timestamp: number;
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

export type EstimateFeeResponse = {
  slow?: string;
  average?: string;
  fast?: string;
};

export type SendTransactionResponse = {
  outputs: {
    publicAddress: string;
    amount: string;
    memo: string;
    assetId?: string;
  }[];
  fromAccountName: string;
  hash: string;
};
