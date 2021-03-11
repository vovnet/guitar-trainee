import { makeAutoObservable } from "mobx";
import { GuitarString, Note } from "./GuitarString";

export class Neck {
  private strings: GuitarString[] = [];

  constructor() {}

  addString(guitarString: GuitarString) {
    this.strings.push(guitarString);
  }

  getString(position: number) {
    const index = position - 1;
    return this.strings[index];
  }

  allStrings() {
    return this.strings;
  }

  static createGuitar() {
    const neckLength = 12;

    const str6 = new GuitarString("F", neckLength);
    const str5 = new GuitarString("A#/B", neckLength);
    const str4 = new GuitarString("D#/Eb", neckLength);
    const str3 = new GuitarString("G#/Ab", neckLength);
    const str2 = new GuitarString("C", neckLength);
    const str1 = new GuitarString("F", neckLength);

    const neck = new Neck();
    neck.addString(str1);
    neck.addString(str2);
    neck.addString(str3);
    neck.addString(str4);
    neck.addString(str5);
    neck.addString(str6);

    return neck;
  }
}
