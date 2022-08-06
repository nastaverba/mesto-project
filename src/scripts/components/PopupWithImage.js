import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector, image, name) {
    super(selector);
    this._image = image;
    this._name = name;
    this._selectorImg = this._selector.querySelector(".popup__img");
    this._selectorName = this._selector.querySelector(".popup__caption");

  }

  open() {
    super.open();
    this._selectorImg.src = this._image;
    this._selectorImg.alt = this._name;
    this._selectorName.textContent = this._name;
  }
}
