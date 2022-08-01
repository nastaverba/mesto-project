//Импорт
import "../../pages/index.css";

import {
  createForm,
  addBtn,
  editBtn,
  editAvaBtn,
  profileAvatar,
  profileInfo,
  enableValidation,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import Section from "../components/Section.js";
import { api } from "../components/Api.js";
import { FormValidator } from "../components/Validate.js";
import { renderLoading } from "../utils/utils";
import { Popup } from "../components/Popup.js";
import UserInfo from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";

addBtn.addEventListener("click", () => {
  const popupAddCard = new PopupWithForm("#add", {
    formSubmitCallback: () => {
      api
        .addNewCard()
        .then((result) => {
          renderLoading(document.querySelector("#create-btn"), "Сохранение...");
          const cardList = new Section(
            {
              items: new Array(result),
              renderer: (cardItem) => {
                let cardTemplate = "";
                cardTemplate = new Card(cardItem, "#my-card");
                const cardElement = cardTemplate.generate();
                cardList.addItem(cardElement);
              },
            },
            ".cards"
          );
          cardList.renderItems();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoading(document.querySelector("#create-btn"), "Создать");
        });
    },
  });
  popupAddCard.open();
  popupAddCard.setEventListeners();
});

editBtn.addEventListener("click", () => {
  const editPopup = new PopupWithForm("#edit", {
    formSubmitCallback: () => {
      api
        .sendUserInfo()
        .then((result) => {
          renderLoading(document.querySelector(".popup__btn"), "Сохранение...");
          const myUserInfo = new UserInfo(
            document.querySelector(".profile__name-text"),
            document.querySelector(".profile__desc"),
            document.querySelector(".profile__image"),
            result.name,
            result.about,
            result.avatar
          );
          myUserInfo.setUserInfo();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoading(document.querySelector(".popup__btn"), "Сохранить");
        });
    },
  });
  editPopup.open();
  editPopup.setEventListeners();
});

editAvaBtn.addEventListener("click", () => {
  const popupNewAvatar = new PopupWithForm("#edit-ava", {
    formSubmitCallback: () => {
      api
        .sendUserAvatar()
        .then((result) => {
          renderLoading(document.querySelector(".popup__btn"), "Сохранение");
          const myUserInfo = new UserInfo(
            document.querySelector(".profile__name-text"),
            document.querySelector(".profile__desc"),
            document.querySelector(".profile__image"),
            result.name,
            result.about,
            result.avatar
          );
          myUserInfo.setUserInfo();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoading(document.querySelector(".popup__btn"), "Сохранить");
        });
    },
  });
  popupNewAvatar.open();
  popupNewAvatar.setEventListeners();
});




//Отрисовка карточек
api.getInitialCards()
  .then((res) => {
    const cardList = new Section(
      {
        items: res,
        renderer: (cardItem) => {
          let cardTemplate = "";
          if (cardItem.owner._id === "b10a1c6c35dfac127967e93a") {
            cardTemplate = new Card(cardItem, "#my-card");
          } else {
            cardTemplate = new Card(cardItem, "#card");
          }
          const cardElement = cardTemplate.generate();
          cardList.addItem(cardElement);
        },
      },
      ".cards"
    );
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

//ID пользователя
let userId = "";

//Загрузка данных пользователя с сервера
api
  .getUserInfo()
  .then((result) => {
    userId = result._id;
    const myUserInfo = new UserInfo(
      document.querySelector(".profile__name-text"),
      document.querySelector(".profile__desc"),
      document.querySelector(".profile__image"),
      result.name,
      result.about,
      result.avatar
    );
    myUserInfo.setUserInfo();
  })
  .catch((err) => {
    console.log(err);
  });

//Обновление аватара

//Валидация форм
const formProfileInfo = new FormValidator(enableValidation, profileInfo);
const formCreateCard = new FormValidator(enableValidation, createForm);
const formProfileAvatar = new FormValidator(enableValidation, profileAvatar);
formProfileInfo.enableValidation();
formCreateCard.enableValidation();
formProfileAvatar.enableValidation();
