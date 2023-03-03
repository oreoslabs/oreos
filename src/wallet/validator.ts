import { isValidPublicAddress as nativeIsValidPublicAddress } from '@ironfish/rust-nodejs';

const SPENDING_KEY_LENGTH = 64;
const INCOMING_VIEW_KEY_LENGTH = 64;
const OUTGOING_VIEW_KEY_LENGTH = 64;

function haveAllowedCharacters(text: string): boolean {
  const validInputRegex = /^[0-9a-f]+$/;
  return validInputRegex.exec(text.toLowerCase()) != null;
}

export function isValidPublicAddress(publicAddress: string): boolean {
  return nativeIsValidPublicAddress(publicAddress);
}

export function isValidSpendingKey(spendingKey: string): boolean {
  return (
    spendingKey.length === SPENDING_KEY_LENGTH &&
    haveAllowedCharacters(spendingKey)
  );
}

export function isValidIncomingViewKey(incomingViewKey: string): boolean {
  return (
    incomingViewKey.length === INCOMING_VIEW_KEY_LENGTH &&
    haveAllowedCharacters(incomingViewKey)
  );
}

export function isValidOutgoingViewKey(outgoingViewKey: string): boolean {
  return (
    outgoingViewKey.length === OUTGOING_VIEW_KEY_LENGTH &&
    haveAllowedCharacters(outgoingViewKey)
  );
}
