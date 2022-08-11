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
import { PopupWithImage } from "../components/PopupWithImage";
let userId = "";
let cardList = "";

const photoPopup = new PopupWithImage("#photo-full");
photoPopup.setEventListeners();

function createCard(cardItem, cardSelector, userId) {
  let cardTemplate = "";
  cardTemplate = new Card(cardItem, cardSelector, userId, {
    handleCardClick: (name, link) => {
      photoPopup.open(name, link);
    },
  }, {
    deleteFunction: () => {
      api.deleteCard(cardItem._id)
        .then(() => {
          cardTemplate.deleteCard();
        })
        .catch((err) => {
          console.log(err);
        })
    }
  },
    {
      likeFunction: () => {
        api.addLikeToCard(cardItem._id)
          .then((data) => {
            cardTemplate.handleLike(data);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    },
    {
      dislikeFunction: () => {
        api.removeLikefromCard(cardItem._id)
          .then((data) => {
            cardTemplate.handleDislike(data);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  );
  const cardElement = cardTemplate.generate();
  return cardElement;
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardList = new Section(
      {
        items: cards.reverse(),
        renderer: (cardItem) => {
          cardList.addItem(createCard(cardItem, "#my-card", userId));
        },
      },
      ".cards"
    );
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
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
        cardList.addItem(createCard(data, "#my-card", userId))
      })
      .then(function () {
        popupAddCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(document.querySelector("#create-btn"), "Создать");
      });
  },
});
popupAddCard.setEventListeners();

//Редактирование профиля
const editPopup = new PopupWithForm("#edit", {
  formSubmitCallback: (data) => {
    renderLoading(document.querySelector(".popup__btn"), "Сохранение...");
    api
      .sendUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);

      })
      .then(() => {
        editPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(document.querySelector(".popup__btn"), "Сохранить");
      });
  },
});
editPopup.setEventListeners();

//Редактирование аватара
const popupNewAvatar = new PopupWithForm("#edit-ava", {
  formSubmitCallback: (data) => {
    renderLoading(document.querySelector(".popup__btn"), "Сохранение");
    api
      .sendUserAvatar(data)
      .then((data) => {
        profileImg.style.backgroundImage = `url(${data.avatar}`;
      })
      .then(() => {
        popupNewAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(document.querySelector(".popup__btn"), "Сохранить");
      });
  },
});
popupNewAvatar.setEventListeners();




addBtn.addEventListener("click", () => {
  formCreateCard.disableButton();
  popupAddCard.open();
});

editBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
  formProfileInfo.disableButton();
  editPopup.open();
});

editAvaBtn.addEventListener("click", () => {
  formProfileAvatar.disableButton();
  popupNewAvatar.open();
});
