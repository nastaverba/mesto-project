import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._selectorImg = this._selector.querySelector(".popup__img");
    this._selectorName = this._selector.querySelector(".popup__caption");

  }

  open(name, link) {
    super.open(name,link);
    this._selectorName.textContent = name;
    this._selectorImg.src = link;
  }
}
