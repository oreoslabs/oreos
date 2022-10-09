import { generateKey } from '@ironfish/rust-nodejs';
import { validateAccount } from './accountValidator';

class Account {
  name: string;
  readonly spendingKey: string;
  readonly incomingViewKey: string;
  readonly outgoingViewKey: string;
  publicAddress: string;

  constructor(
    name: string,
    spendingKey: string,
    incomingViewKey: string,
    outgoingViewKey: string,
    publicAddress: string,
  ) {
    this.name = name;
    this.spendingKey = spendingKey;
    this.incomingViewKey = incomingViewKey;
    this.outgoingViewKey = outgoingViewKey;
    this.publicAddress = publicAddress;
  }
}

function createAccount(name: string): Account {
  const key = generateKey();
  return new Account(
    name,
    key.spending_key,
    key.incoming_view_key,
    key.outgoing_view_key,
    key.public_address,
  );
}

function importAccount(toImport: {
  name: string;
  spendingKey: string;
  incomingViewKey: string;
  outgoingViewKey: string;
  publicAddress: string;
}): Account {
  validateAccount(toImport);
  return new Account(
    toImport.name,
    toImport.spendingKey,
    toImport.incomingViewKey,
    toImport.outgoingViewKey,
    toImport.publicAddress,
  );
}

export const Wallet = { Account, createAccount, importAccount };
