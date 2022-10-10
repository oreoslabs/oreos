import { NoteEncrypted as NativeNoteEncrypted } from '@ironfish/rust-nodejs';
import bufio from 'bufio';
import { Note } from './note';

export class NoteEncrypted {
  private readonly noteEncryptedSerialized: Buffer;
  private readonly _noteCommitment: Buffer;
  private noteEncrypted: NativeNoteEncrypted | null = null;

  constructor(noteEncryptedSerialized: Buffer) {
    this.noteEncryptedSerialized = noteEncryptedSerialized;

    const reader = bufio.read(noteEncryptedSerialized, true);

    // value commitment
    reader.seek(32);

    // note commitment
    this._noteCommitment = reader.readBytes(32);

    // ephemeral public key
    reader.seek(32);
    // encrypted note
    reader.seek(83);
    // aead MAC
    reader.seek(16);
    // note encryption keys
    reader.seek(64);
    // aead MAC
    reader.seek(16);

    // total serialized size: 192 (proof from transaction)
    // + 32 + 32 + 32 + 83 + 16 + 64 + 16 = 467 bytes
  }

  takeReference(): NativeNoteEncrypted {
    if (this.noteEncrypted === null) {
      this.noteEncrypted = new NativeNoteEncrypted(
        this.noteEncryptedSerialized,
      );
    }
    return this.noteEncrypted;
  }

  decryptNoteForOwner(ownerHexKey: string): Note | undefined {
    const note = this.takeReference().decryptNoteForOwner(ownerHexKey);
    if (note) {
      return new Note(note);
    }
  }

  decryptNoteForSpender(spenderHexKey: string): Note | undefined {
    const note = this.takeReference().decryptNoteForSpender(spenderHexKey);
    if (note) {
      return new Note(note);
    }
  }
}
