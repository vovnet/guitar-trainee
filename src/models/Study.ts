import { makeAutoObservable } from "mobx";
import { GuitarString, Note, NoteType } from "./GuitarString";
import { Neck } from "./Neck";

export class Study {
  findNote?: NoteType | null = null;
  currentNote?: Note | null = null;

  noteTypes: NoteType[] = [];

  neck: Neck;

  error: boolean = false;

  currentString?: GuitarString | null = null;

  prevRand?: number;

  constructor() {
    makeAutoObservable(this);

    this.neck = Neck.createGuitar();
  }

  private resetString() {
    this.neck.allStrings().map((str) => str.disable());
  }

  private rand() {
    let rand = Math.floor(Math.random() * (7 - 1) + 1);
    if (rand === this.prevRand) {
      rand = this.rand();
    }
    return rand;
  }

  private next() {
    const rand = this.rand();
    this.prevRand = rand;
    this.currentString = this.neck.getString(rand);

    this.findNote = this.noteTypes[
      Math.floor(Math.random() * this.noteTypes.length)
    ];

    this.neck.allStrings().map((str) => str.disable);
    this.currentString.enable();
  }

  start() {
    if (this.noteTypes.length < 1) {
      throw new Error("Study notes is empty. Add some notes.");
    }

    this.next();
  }

  addNoteToStudy(noteType: NoteType) {
    if (this.noteTypes.find((el) => el === noteType)) {
      return;
    }

    this.noteTypes.push(noteType);
  }

  toggleNoteToStudy(noteType: NoteType) {
    if (this.noteTypes.find((el) => el === noteType)) {
      const i = this.noteTypes.indexOf(noteType);
      this.noteTypes.splice(i, 1);
    } else {
      this.noteTypes.push(noteType);
    }
  }

  setCurrentNote(mode: number) {
    this.currentNote = this.currentString?.getNoteByPos(mode);

    console.log(
      "current: ",
      this.currentNote?.type,
      this.currentNote?.position,
      ", find: ",
      this.findNote
    );

    if (this.currentNote?.type === this.findNote) {
      console.log("yeah");
      this.error = false;
      this.currentNote = null;
      this.findNote = null;
      this.resetString();
      this.next();
    } else {
      this.error = true;
    }
  }

  get neckLength() {
    return 12;
  }
}
