import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector, image, name) {
    super(selector);
    this._image = image;
    this._name = name;
  }

  open() {
    super.open();
    this._selector.querySelector(".popup__img").src = this._image;
    this._selector.querySelector(".popup__img").alt = this._name;
    this._selector.querySelector(".popup__caption").textContent = this._name;
  }
}
