import { generateKey, generateKeyFromPrivateKey } from '@ironfish/rust-nodejs';

export class Account {
  name: string;
  readonly spendingKey: string;
  readonly incomingViewKey: string;
  readonly outgoingViewKey: string;
  publicAddress: string;

  constructor(
    name: string,
    incomingViewKey: string,
    outgoingViewKey: string,
    publicAddress: string,
    spendingKey: string,
  ) {
    this.name = name;
    this.incomingViewKey = incomingViewKey;
    this.outgoingViewKey = outgoingViewKey;
    this.spendingKey = spendingKey;
    this.publicAddress = publicAddress;
  }
}

export function createAccount(name: string): Account {
  const key = generateKey();
  return new Account(
    name,
    key.incoming_view_key,
    key.outgoing_view_key,
    key.public_address,
    key.spending_key,
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
    key.incoming_view_key,
    key.outgoing_view_key,
    key.public_address,
  );
}
