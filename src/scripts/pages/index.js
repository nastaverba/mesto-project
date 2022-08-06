import "../../pages/index.css";
import {
  createForm,
  addBtn,
  editBtn,
  editAvaBtn,
  profileAvatar,
  profileInfo,
  enableValidation,
  profileName,
  profileDesc,
  profileImg,
  nameInput,
  jobInput,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import Section from "../components/Section.js";
import { api } from "../components/Api.js";
import { FormValidator } from "../components/Validate.js";
import { renderLoading } from "../utils/utils";
import UserInfo from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
let userId = "";
let cardList = "";

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cards]) => {
  userId = userData._id;
  userInfo.setUserInfo(userData);
  cardList = new Section(
    {
      items: cards.reverse(),
      renderer: (cardItem) => {
        let cardTemplate = "";
        cardTemplate = new Card(cardItem, "#my-card", userId);
        const cardElement = cardTemplate.generate();

        cardElement
          .querySelector(".card__like")
          .addEventListener("click", function () {
            if (
              cardElement
                .querySelector(".card__like")
                .classList.contains("card__like_liked")
            ) {
              api.removeLikefromCard(cardItem._id).then((data) => {
                cardTemplate.handleDislike(data);
              });
            } else {
              api.addLikeToCard(cardItem._id).then((data) => {
                cardTemplate.handleLike(data);
              });
            }
          });
        cardElement
          .querySelector(".card__remove-icon")
          .addEventListener("click", function () {
            api.deleteCard(cardItem._id).then(() => {
              cardTemplate.deleteCard();
            });
          });
        cardList.addItem(cardElement);
      },
    },
    ".cards"
  );
  cardList.renderItems();
});

//Инфо о пользователе
const userInfo = new UserInfo({
  username: ".profile__name-text",
  job: ".profile__desc",
  avatar: ".profile__image",
});

//Валидация форм
const formProfileInfo = new FormValidator(enableValidation, profileInfo);
const formCreateCard = new FormValidator(enableValidation, createForm);
const formProfileAvatar = new FormValidator(enableValidation, profileAvatar);
formProfileInfo.enableValidation();
formCreateCard.enableValidation();
formProfileAvatar.enableValidation();

//Попапы с формами
//Добавление карточки
const popupAddCard = new PopupWithForm("#add", {
  formSubmitCallback: (data) => {
    renderLoading(document.querySelector("#create-btn"), "Сохранение...");
    api
      .addNewCard(data)
      .then((data) => {
        let cardTemplate = "";
        cardTemplate = new Card(data, "#my-card", userId);
        const cardElement = cardTemplate.generate();
        cardElement
          .querySelector(".card__like")
          .addEventListener("click", function () {
            if (
              cardElement
                .querySelector(".card__like")
                .classList.contains("card__like_liked")
            ) {
              api.removeLikefromCard(data._id).then((data) => {
                cardTemplate.handleDislike(data);
              });
            } else {
              api.addLikeToCard(data._id).then((data) => {
                cardTemplate.handleLike(data);
              });
            }
          });
        cardElement
          .querySelector(".card__remove-icon")
          .addEventListener("click", function () {
            api.deleteCard(data._id).then(() => {
              cardTemplate.deleteCard();
            });
          });
        cardList.addItem(cardElement);
      })
      .then(function () {
        popupAddCard.close();
      })
      .finally(() => {
        renderLoading(document.querySelector("#create-btn"), "Создать");
      });
  },
});

//Редактирование профиля
const editPopup = new PopupWithForm("#edit", {
  formSubmitCallback: (data) => {
    renderLoading(document.querySelector(".popup__btn"), "Сохранение...");
    api
      .sendUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        editPopup.close();
      })
      .finally(() => {
        renderLoading(document.querySelector(".popup__btn"), "Сохранить");
      });
  },
});

//Редактирование аватара
const popupNewAvatar = new PopupWithForm("#edit-ava", {
  formSubmitCallback: (data) => {
    renderLoading(document.querySelector(".popup__btn"), "Сохранение");
    api
      .sendUserAvatar(data)
      .then((data) => {
        profileImg.style.backgroundImage = `url(${data.avatar}`;
        popupNewAvatar.close();
      })
      .finally(() => {
        renderLoading(document.querySelector(".popup__btn"), "Сохранить");
      });
  },
});

addBtn.addEventListener("click", () => {
  formCreateCard.disableButton();
  popupAddCard.open();
  popupAddCard.setEventListeners();
});

editBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
  formProfileInfo.disableButton();
  editPopup.open();
  editPopup.setEventListeners();
});

editAvaBtn.addEventListener("click", () => {
  formProfileAvatar.disableButton();
  popupNewAvatar.open();
  popupNewAvatar.setEventListeners();
});

//Обновление аватара
