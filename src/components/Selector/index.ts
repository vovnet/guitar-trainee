import { reaction } from "mobx";
import { NoteType } from "models/GuitarString";
import { Study } from "../../models/Study";
import "./styles.css";

export class Selector {
  private container: HTMLElement;

  constructor(
    private parent: HTMLElement,
    private study: Study,
    private onSelect: (noteType: NoteType) => void
  ) {
    this.container = document.createElement("div");
    this.parent.appendChild(this.container);
    this.container.classList.add("selector__container");

    this.container.appendChild(this.createSelectButton("C"));
    this.container.appendChild(this.createSelectButton("C#/Db"));
    this.container.appendChild(this.createSelectButton("D"));
    this.container.appendChild(this.createSelectButton("D#/Eb"));
    this.container.appendChild(this.createSelectButton("E"));
    this.container.appendChild(this.createSelectButton("F"));
    this.container.appendChild(this.createSelectButton("F#/Gb"));
    this.container.appendChild(this.createSelectButton("G"));
    this.container.appendChild(this.createSelectButton("G#/Ab"));
    this.container.appendChild(this.createSelectButton("A"));
    this.container.appendChild(this.createSelectButton("A#/B"));
    this.container.appendChild(this.createSelectButton("H"));

    reaction(
      () => study.noteTypes.length,
      () => {
        this.container
          .querySelectorAll<HTMLButtonElement>(".selector__button")
          .forEach((btn) => {
            if (this.study.noteTypes.find((note) => note === btn.innerText)) {
              btn.classList.add("selector__button--selected");
            } else {
              btn.classList.remove("selector__button--selected");
            }
          });
      },
      { fireImmediately: true }
    );
  }

  private createSelectButton(noteType: NoteType) {
    const btn = document.createElement("button");
    btn.classList.add("selector__button");
    btn.innerText = noteType;
    btn.addEventListener("click", () => this.onSelect(noteType));
    return btn;
  }
}
