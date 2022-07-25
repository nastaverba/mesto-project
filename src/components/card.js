//Импорт
import {
  popupAdd,
  createForm,
  photoNameInput,
  photoLinkInput,
  cardTemplate,
  cards,
  photoFull,
  photoFullImage,
  photoFullName,
  createBtn,
} from "./constants.js";
import { openPopup, closePopup } from "./modal.js";
import { api } from "./api.js";

class Card {
  constructor(data, selector) {
    this._selector = selector;
    this._image = data.link;
    (this._text = data.name), (this.likes = data.likes);
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
    this
    this._cardElement.querySelector(".card__image").src = this._image;
    this._cardElement.querySelector(".card__name-text").textContent =
      this._text;
    this._cardElement.querySelector(".card__like-count").textContent =
      this.likes.length;
    return this._cardElement;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like")
      .addEventListener("click", () => {
        this._checkLike();
      });
  }

_checkLike () {

  if(this._cardElement.querySelector(".card__like").classList.contains("card__like_liked")) {
    this._handleDislike();
  }else{
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
}

let test = api.getInitialCards().then((res) => {
  console.log(res);
  res.forEach((cardItem) => {
    const cardTemplate = new Card(cardItem, "#card");
    const messageElement = cardTemplate.generate();
    cards.append(messageElement);
  });
});

//Функция, которая добавляет карточку в DOM
function renderCard(somecard, somecontainer) {
  somecontainer.prepend(somecard);
}
function renderInitialCards(somecard, somecontainer) {
  somecontainer.append(somecard);
}

//Функция для отображения лайка карточки
function showLike(serverLikes, serverMe, card) {
  const cardLike = card.querySelector(".card__like");
  if (serverLikes.some((user) => user._id === serverMe)) {
    cardLike.classList.add("card__like_liked");
  }
}

//Функция для отображения иконки удаления
function showDeleteIcon(itemOwner, serverMe, card) {
  if (itemOwner !== serverMe) {
    const removeIcon = card.querySelector(".card__remove-icon");
    removeIcon.classList.remove("card__remove-icon_active");
  }
}

//Функции лайка и дизлайка карточки
function likeCard(result, myCard) {
  const cardLike = myCard.querySelector(".card__like");
  myCard.querySelector(".card__like-count").textContent = result.likes.length;
  cardLike.classList.add("card__like_liked");
}

function unlikeCard(result, myCard) {
  const cardLike = myCard.querySelector(".card__like");
  myCard.querySelector(".card__like-count").textContent = result.likes.length;
  cardLike.classList.remove("card__like_liked");
}

//Функция удаления карточки
function removeCard(myCard) {
  myCard.remove();
}

//Экспорт
export {
  renderCard,
  renderInitialCards,
  likeCard,
  unlikeCard,
  removeCard,
};
