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
- getChainInfo
- getStatus
- sendTransaction

**Basic Rpc Usage:**

```typescript
import { RpcService, RpcTcpClient, RpcTlsClient } from 'oreos';

// communication with rpc server over tcp
const tcpProvider = new RpcService(ip, port, rpcAuthToken, 'TCP');
// communication with rpc server over tls
const tlsProvider = new RpcService(ip, port, rpcAuthToken, 'TLS');

type GetBalanceRequest = {
  account?: string;
  assetId?: string;
  confirmations?: number;
};
type GetBalanceResponse = {
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
};

const getBalanceRequest: GetBalanceRequest = {
  account: 'default',
  confirmations: 2,
};

// get balance with tcp/tls provider
const response: GetBalanceResponse = await tcpProvider.getBalance(getBalanceRequest);
```

**Advanced:**

As shown above, only part of rpc methods are supported by Oreos rpc service component. Therefore, Oreos provides another
way to perform rpc request.

```typescript
import { RpcTcpClient, RpcTlsClient } from 'oreos';

const tcpClient = new RpcTcpClient(ip, port, rpcAuthToken);
const tlsClient = new RpcTlsClient(ip, port, rpcAuthToken);

// to perform getBalance
const getBalanceRequest: GetBalanceRequest = {
  account: 'default',
  confirmations: 2,
};
const response = await tlsClient.send("wallet/getBalance", getBalanceRequest);
```

Please refer to [HowToRpc.md](/docs/HowToRpc.md) for more details about rpc.

**Account & Transaction:**

`CreateAccount`, `ImportAccount` and `Transaction` based components are supported.

```typescript
import {
  Account,
  createAccount,
  importAccount,
} from 'oreos';

const newAccount: Account = createAccount(accountName);
const importedAccount: Account = importAccount(newAccount.name, newAccount.spendingKey);
```

Please refer to [HowToWallet.md](/docs/HowToWallet.md) for more details about wallet.
