import { reaction } from "mobx";
import { GuitarString } from "models/GuitarString";
import "./styles.css";

export class Note {
  private view: HTMLDivElement | null = null;
  constructor(
    private parent: HTMLElement,
    private pos: number,
    private stringNumber: number,
    private str: GuitarString
  ) {
    reaction(
      () => this.str.enabled,
      (enabled) => {
        if (enabled) {
          this.view?.classList.add("note--active");
        } else {
          this.view?.classList.remove("note--active");
        }
      },
      { fireImmediately: true }
    );
    this.view = document.createElement("div");
    this.view.classList.add("note");
    this.parent.appendChild(this.view);

    this.view.style.top = (this.stringNumber - 1) * 30 + 2 + "px";

    if (str.enabled) {
      this.view.classList.add("note--active");
    }
  }

  onClick(fn: () => void) {
    this.view?.addEventListener("click", fn);
  }
}
