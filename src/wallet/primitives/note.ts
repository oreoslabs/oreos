import { Note as NativeNote } from '@ironfish/rust-nodejs';
import bufio from 'bufio';
import { BufferUtils } from '../../utils';

export const NOTE_LENGTH = 43 + 8 + 32 + 32;

export class Note {
  private readonly noteSerialized: Buffer;
  private note: NativeNote | null = null;

  private readonly _value: bigint;
  private readonly _memo: Buffer;

  constructor(noteSerialized: Buffer) {
    this.noteSerialized = noteSerialized;

    const reader = bufio.read(this.noteSerialized, true);

    // skip owner
    reader.seek(43);

    this._value = BigInt(reader.readU64());

    // skip randomness
    reader.seek(32);

    this._memo = reader.readBytes(32, true);
  }

  serialize(): Buffer {
    return this.noteSerialized;
  }

  takeReference(): NativeNote {
    if (this.note === null) {
      this.note = NativeNote.deserialize(this.noteSerialized);
    }
    return this.note;
  }

  value(): bigint {
    return this._value;
  }

  memo(): string {
    return BufferUtils.toHuman(this._memo);
  }

  nullifier(ownerPrivateKey: string, position: bigint): Buffer {
    return this.takeReference().nullifier(ownerPrivateKey, position);
  }

  equals(other: Note): boolean {
    return this.noteSerialized.equals(other.noteSerialized);
  }
}
