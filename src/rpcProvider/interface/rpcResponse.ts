export type GetBalanceResponse = {
  account: string;
  confirmed: string;
  pending: string;
  pendingCount: number;
  unconfirmed: string;
  unconfirmedCount: number;
  minimumBlockConfirmations: number;
};

export type GetAccountTransactionResponse = {
  account: string;
  transaction: {
    status: string;
    isMinersFee: boolean;
    fee: string;
    notesCount: number;
    spendsCount: number;
    notes: {
      value: string;
      memo: string;
      spent: boolean;
    }[];
  } | null;
};

interface Operation {
  operation_identifier: { index: number; network_index: number };
  type: string;
}

interface Note {
  commitment: string;
}

interface Spend {
  nullifier: string;
}

interface Transaction {
  transaction_identifier: { hash: string };
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

export type GetFeesResponse = {
  startBlock: number;
  endBlock: number;
  p25: number;
  p50: number;
  p75: number;
};

export type SendTransactionResponse = {
  receives: {
    publicAddress: string;
    amount: string;
    memo: string;
  }[];
  fromAccountName: string;
  hash: string;
};
