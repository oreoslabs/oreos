The Oreos Project
==================

An ironfish provider implementation and utilities in TypeScript.

**Features:**

- Ironfish rpc over socket, both Tcp and Tls are supported
- Fully **TypeScript** ready, with definition files and full TypeScript source

**Methods:**

- getBalance
- getTransaction
- getBlock
- getBlockInfo
- getChainInfo
- getFees
- getStatus
- sendTransaction

**Usage:**

```typescript
const tcpServer = new RpcService(ip, port, rpcAuthToken, 'TCP') // communication with rpc server over tcp
const tlsServer = new RpcService(ip, port, rpcAuthToken, 'TLS') // communication with rpc server over tls
```

##### getBalance

```typescript
type GetBalanceRequest = {
  account?: string;
  minimumBlockConfirmations?: number;
};
type GetBalanceResponse = {
  account: string;
  confirmed: string;
  pending: string;
  pendingCount: number;
  unconfirmed: string;
  unconfirmedCount: number;
  minimumBlockConfirmations: number;
};

const getBalanceRequest: GetBalanceRequest = {
  account: 'default',
  minimumBlockConfirmations: 12,
};

const response: GetBalanceResponse = await server.getBalance(getBalanceRequest);
```

##### getTransaction

```typescript
type GetAccountTransactionRequest = {
  account?: string;
  hash: string;
};
type GetAccountTransactionResponse = {
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

const getAccountTransactionRequest: GetAccountTransactionRequest = {
  account: 'default',
  hash: '0xxxxxxxx',
};

const response: GetAccountTransactionResponse = await server.getTransaction(getAccountTransactionRequest);
```

##### getBlockInfo

```typescript
type GetBlockInfoRequest = {
  search?: string;
  hash?: string;
  sequence?: number;
};
type GetBlockInfoResponse = {
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

const getBlockInfoRequest: GetBlockInfoRequest = {
  sequence: 10000,
};

const response = await server.getBlockInfo(getBlockInfoRequest);
```

##### getFees

```typescript
type GetFeesRequest = {
  numOfBlocks: number;
};
type GetFeesResponse = {
  startBlock: number;
  endBlock: number;
  p25: number;
  p50: number;
  p75: number;
};

const getFeesRequest: GetFeesRequest = {
  numOfBlocks: 10,
};

const response = await server.getFees(getFeesRequest);
```

##### sendTransaction

```typescript
type SendTransactionRequest = {
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
type SendTransactionResponse = {
  receives: {
    publicAddress: string;
    amount: string;
    memo: string;
  }[];
  fromAccountName: string;
  hash: string;
};

const sendTransactionRequest: SendTransactionRequest = {
  fromAccountName: 'default',
  receives: [{
    publicAddress: '0xxxx0',
    amount: '100000',
    memo: 'oreos',
  }],
  fee: '100',
};

const response = await server.sendTransaction(sendTransactionRequest);
```
