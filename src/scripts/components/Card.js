import { PopupWithImage } from "./PopupWithImage.js";


export class Card {
  constructor(data, selector, userId, { handleCardClick }) {
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._data = data;
    this._selector = selector;
    this._image = data.link;
    this.likes = data.likes;
    this.ownerId = data.owner._id;
    (this._text = data.name), (this.cardId = data._id);
  }

  _getElement() {
    const cardTemplate = document
      .querySelector(this._selector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardTemplate;
  }

  generate() {
    this._cardElement = this._getElement();
    this._setEventListeners();
    this._checkUserLike();
    this._checkUserId();
    this._cardElement.querySelector(".card__image").src = this._image;
    this._cardElement.querySelector(".card__name-text").textContent =
      this._text;
    this._cardElement.querySelector(".card__like-count").textContent =
      this.likes.length;
    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__remove-icon")
      .addEventListener("click", (evt) => {
        evt.stopPropagation();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._text, this._image);
      });


  }

  handleLike(data) {
    this._likes = data.likes;
    this._cardElement.querySelector(".card__like-count").textContent =
      this._likes.length;
    this._cardElement
      .querySelector(".card__like")
      .classList.add("card__like_liked");
  }

  handleDislike(data) {
    this._likes = data.likes;
    this._cardElement.querySelector(".card__like-count").textContent =
      this._likes.length;
    this._cardElement
      .querySelector(".card__like")
      .classList.remove("card__like_liked");
  }




  _checkUserLike() {
    if (this.likes.find((item) => item._id === this._userId)) {
      this._cardElement
        .querySelector(".card__like")
        .classList.add("card__like_liked");
    }
  }

  _checkUserId() {
    if (this.ownerId !== this._userId) {
      this._cardElement
        .querySelector(".card__remove-icon")
        .classList.remove("card__remove-icon_active");
    }
  }

  deleteCard() {
    this._cardElement.remove();
  }
}
