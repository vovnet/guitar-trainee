import { action, makeAutoObservable } from "mobx";

export type NoteType =
  | "C"
  | "C#/Db"
  | "D"
  | "D#/Eb"
  | "E"
  | "F"
  | "F#/Gb"
  | "G"
  | "G#/Ab"
  | "A"
  | "A#/B"
  | "H";

export type Note = {
  position: number;
  type: NoteType;
};

export class GuitarString {
  public enabled: boolean = false;

  private notes: Note[] = [];

  constructor(start: NoteType, total: number) {
    makeAutoObservable(this);
    const list: NoteType[] = [
      "C",
      "C#/Db",
      "D",
      "D#/Eb",
      "E",
      "F",
      "F#/Gb",
      "G",
      "G#/Ab",
      "A",
      "A#/B",
      "H",
    ];

    const startPos = list.indexOf(start);

    let current = startPos;
    for (let i = 0; i < total; i++) {
      if (current >= list.length) {
        current = 0;
      }
      this.notes.push({ type: list[current], position: i + 1 });
      current++;
    }
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  getNoteByPos(pos: number) {
    return this.notes.find((n) => n.position === pos);
  }

  getPosByNoteType(note: NoteType) {
    return this.notes.find((n) => n.type === note)?.position;
  }

  getAllNotes() {
    return this.notes;
  }

  toString() {
    let result = "";
    this.notes.map((note) => {
      result += note.position + " - " + note.type + "\n";
    });
    return result;
  }
}
