import { Note, NoteEncrypted } from './primitives';

export class Transaction {
  fee: string;
  notesCount: number;
  spendsCount: number;
  notesEncrypted: NoteEncrypted[];
  notes: Note[] | null;

  constructor(
    fee: string,
    notesCount: number,
    spendsCount: number,
    notesEncrypted: NoteEncrypted[],
  ) {
    this.fee = fee;
    this.notesCount = notesCount;
    this.spendsCount = spendsCount;
    this.notesEncrypted = notesEncrypted;
    this.notes = null;
  }

  decryptNotesForOwner(ownerHexKey: string): Note[] {
    const result: Note[] = [];
    this.notesEncrypted.map(noteToDecrypt => {
      const note = noteToDecrypt.decryptNoteForOwner(ownerHexKey);
      if (note) {
        result.push(note);
      }
    });
    return result;
  }

  decryptNotesForSpender(spenderHexKey: string): Note[] {
    const result: Note[] = [];
    this.notesEncrypted.map(noteToDecrypt => {
      const note = noteToDecrypt.decryptNoteForSpender(spenderHexKey);
      if (note) {
        result.push(note);
      }
    });
    return result;
  }
}
