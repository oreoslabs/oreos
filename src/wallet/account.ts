import { generateKey, generateKeyFromPrivateKey } from '@ironfish/rust-nodejs';

export class Account {
  name: string;
  readonly spendingKey: string;
  readonly viewKey: string;
  readonly incomingViewKey: string;
  readonly outgoingViewKey: string;
  publicAddress: string;

  constructor(
    name: string,
    incomingViewKey: string,
    outgoingViewKey: string,
    publicAddress: string,
    spendingKey: string,
    viewKey: string,
  ) {
    this.name = name;
    this.spendingKey = spendingKey;
    this.viewKey = viewKey;
    this.incomingViewKey = incomingViewKey;
    this.outgoingViewKey = outgoingViewKey;
    this.publicAddress = publicAddress;
  }
}

export function createAccount(name: string): Account {
  const key = generateKey();
  return new Account(
    name,
    key.spendingKey,
    key.viewKey,
    key.incomingViewKey,
    key.outgoingViewKey,
    key.publicAddress,
  );
}

export function importAccount(toImport: {
  name: string;
  spendingKey: string;
}): Account {
  const key = generateKeyFromPrivateKey(toImport.spendingKey);
  return new Account(
    toImport.name,
    toImport.spendingKey,
    key.viewKey,
    key.incomingViewKey,
    key.outgoingViewKey,
    key.publicAddress,
  );
}
