import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImg = this._popup.querySelector(".popup__img");
    this._popupName = this._popup.querySelector(".popup__caption");

  }

  open(name, link) {
    super.open();
    this._popupName.textContent = name;
    this._popupImg.src = link;
  }
}
