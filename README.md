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

##### getBalance

```js
const server = new RpcService(ip, port, rpcAuthToken, 'TCP') // over tcp
const server = new RpcService(ip, port, rpcAuthToken, 'TLS') // over tls

const getBalanceRequest: GetBalanceRequest = {
  account: 'default',
  minimumBlockConfirmations: 12,
};

const response = await server.getBalance(getBalanceRequest)
```
