# Getting Started Wallet Components

**Components supported by Wallet:**

- Account
- createAccount
- importAccount
- Transaction
- decryptNotesForOwner
- decryptNotesForSpender

**Usage:**

```typescript
import {
  Account,
  createAccount,
  importAccount,
  Transaction,
  NoteEncrypted,
  Note,
} from 'oreos';

const newAccount: Account = createAccount(accountName);
const importedAccount: Account = importAccount(
  {
    name: 'helloAccount',
    spendingKey: 'mySpendingKey',
    incomingViewKey: 'myIncomingViewKey',
    outgoingViewKey: 'myOutgoingViewKey',
    publicAddress: 'myPublicAddress',
  });

// Transaction signature: 
// @fee: transaction fee, string
// @notesCount: notesCount, number
// @spendsCount: spendsCount, number
// @notesEncrypted: notesEncrypted, NoteEncrypted[]
// RawTransaction information is accessible in every node.

const transaction = new Transaction('100', 2, 1, notesEncrypted)
const decryptedNotes = transaction.decryptNotesForSpender(importedAccount.outgoingViewKey);
for (const note of decryptedNotes) {
  const value = note.value();
  const memo = note.memo();
}
```
