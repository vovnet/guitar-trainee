import { Neck } from "./models/Neck";
import { GuitarString } from "./models/GuitarString";
import "./styles/styles.css";
import { Note } from "./components/Note";
import { Study } from "./models/Study";
import { reaction } from "mobx";
import { Selector } from "./components/Selector";

const study = new Study();

const deckView = document.createElement("div");
const content = document.getElementById("content");
content?.appendChild(deckView);

deckView.classList.add("deck");

for (let i = 0; i < study.neckLength; i++) {
  const fretView = document.createElement("div");
  fretView.addEventListener("click", () => {
    study.setCurrentNote(i + 1);
  });
  fretView.classList.add("fret");
  if (i === 2 || i === 4 || i === 6 || i === 8) {
    const pin = document.createElement("div");
    pin.classList.add("pin");
    fretView.appendChild(pin);
  }

  if (i === 11) {
    const doublePin = document.createElement("div");
    doublePin.classList.add("double-pin");
    const fPin = document.createElement("div");
    fPin.classList.add("pin--d");
    const sPin = document.createElement("div");
    sPin.classList.add("pin--d");
    doublePin.appendChild(fPin);
    doublePin.appendChild(sPin);
    fretView.appendChild(doublePin);
  }
  deckView.appendChild(fretView);
  createNote(fretView, i + 1, 1);
  createNote(fretView, i + 1, 2);
  createNote(fretView, i + 1, 3);
  createNote(fretView, i + 1, 4);
  createNote(fretView, i + 1, 5);
  createNote(fretView, i + 1, 6);
}

function createNote(parent: HTMLElement, mode: number, line: number): Note {
  const str = study.neck.getString(line);
  const note = new Note(parent, mode, line, str);
  return note;
}

//@ts-ignore
window.rangom = () => (study.findNote = "F#");

const search = document.createElement("div");
search.classList.add("search-text");
content?.appendChild(search);

study.addNoteToStudy("E");
study.addNoteToStudy("F");
study.addNoteToStudy("G");
study.start();

reaction(
  () => study.error,
  (error) => {
    if (error) {
      search.classList.add("search-text--error");
    } else {
      search.classList.remove("search-text--error");
    }
  }
);

reaction(
  () => study.findNote,
  (findNote) => {
    search.innerHTML = findNote?.toString() || "test";
    console.log("find: ", findNote);
  },
  { fireImmediately: true }
);

const selector = new Selector(content!, study, (note) => {
  console.log("click: ", note);
  study.toggleNoteToStudy(note);
});
