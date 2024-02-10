The Oreos Project
==================

An ironfish provider implementation and utilities in TypeScript.

**Features:**

- Ironfish rpc over http
- Fully **TypeScript** ready, with definition files and full TypeScript source

**Methods:**

- getBalance
- getBalances
- mintAsset
- burnAsset
- createTransaction
- sendTransaction
- getAccountTransaction
- getAccountTransactions
- getAsset
- broadcastTransaction
- getBlock
- getChainInfo
- getTransaction
- getNoteWitness

**Rpc Usage:**

```typescript
import { RpcService } from 'oreos';

const provider = new RpcService(baseUrl);

type GetBalanceRequest = {
  account?: string;
  assetId?: string;
  confirmations?: number;
};

type AssetVerification = {
  status: 'verified' | 'unverified' | 'unknown';
};

type GetBalanceResponse = {
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

const getBalanceRequest: GetBalanceRequest = {
  account: 'default',
  confirmations: 2,
};

const response: GetBalanceResponse = await provider.getBalance(getBalanceRequest);
```

**Advanced Usage:**

```typescript
import { RpcService } from 'oreos';

const provider = new RpcService(baseUrl);

const route = 'chain';
const method = 'getNetworkInfo';
const response: T = await provider.request<T>(`${route}/${method}`, params); 
```