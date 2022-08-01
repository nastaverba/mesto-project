//Импорт
import { api } from "./Api.js";
import { PopupWithImage } from "./PopupWithImage.js";

export class Card {
  constructor(data, selector) {
    this._selector = selector;
    this._image = data.link;
    this._text = data.name,
    this.likes = data.likes;
    this.cardId = data._id;
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
    this._cardElement.querySelector(".card__image").src = this._image;
    this._cardElement.querySelector(".card__name-text").textContent = this._text;
    this._cardElement.querySelector(".card__like-count").textContent = this.likes.length;
    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like")
      .addEventListener("click", () => {
        this._checkLike();
      });

    this._cardElement
      .querySelector(".card__remove-icon")
      .addEventListener("click", (evt) => {
        evt.stopPropagation();
        this._deleteCard();
      })

    this._cardElement
      .querySelector(".card__image-container")
      .addEventListener("click", () => {
        const photoPopup = new PopupWithImage("#photo-full", this._image, this._text);
        photoPopup.open();
        photoPopup.setEventListeners();
      })
  }

  _checkLike() {

    if (this._cardElement.querySelector(".card__like").classList.contains("card__like_liked")) {
      this._handleDislike();
    } else {
      this._handleLike();
    }
  }

  _handleLike() {
    api
      .addLikeToCard(this.cardId)
      .then((res) => {
        this._cardElement.querySelector(".card__like-count").textContent =
          res.likes.length;
        this._cardElement
          .querySelector(".card__like")
          .classList.add("card__like_liked");
      })
      .catch((error) => alert(error.message));
  }

  _handleDislike() {
    api.removeLikefromCard(this.cardId)
      .then((res) => {
        this._cardElement.querySelector(".card__like-count").textContent = res.likes.length;
        this._cardElement.querySelector(".card__like").classList.remove("card__like_liked");
      })
      .catch((error) => alert(error.message));

  }

  _checkUserLike() {
    if (this.likes.find((item) => item._id === "b10a1c6c35dfac127967e93a")) {
      this._cardElement
        .querySelector(".card__like")
        .classList.add("card__like_liked");
    }
  }

  _deleteCard() {
    api.deleteCard(this.cardId)
      .then(() => {
        this._cardElement.remove();
      })
      .catch((error) => alert(error.message));
  }
}










