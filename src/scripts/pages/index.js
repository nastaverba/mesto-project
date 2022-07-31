//Импорт
import '../../pages/index.css';

import {
  cards,
  createForm,
  popups,
  popupEdit,
  popupAdd,
  createBtn,
  addBtn,
  editBtn,
  editAva,
  editAvaBtn,
  profileAvatar,
  profileName,
  profileDesc,
  profileInfo,
  nameInput,
  jobInput,
  avaInput,
  enableValidation,
  cardTemplate,
} from "../utils/constants.js";
import { Card } from '../components/Card.js'
import Section from '../components/Section.js';
import { openPopup, closePopupEsc, closePopup } from '../components/Modal.js';
//import { getOneCardAndUser, getResponseData, addNewCard, getInitialCards, getUserInfo, sendUserInfo, getUserandCards, addLikeToCard, removeLikefromCard, sendUserAvatar, deleteCard } from './api.js';
import { api } from '../components/Api.js';
import { FormValidator } from "../components/Validate.js";
import { renderLoading } from '../utils/utils';
import { Popup } from '../components/Popup.js';
import UserInfo from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';



addBtn.addEventListener("click", () => {
  const myTest = new PopupWithForm("#add", {
    formSubmitCallback: () => {
      api.addNewCard()
        .then((result) => {
          renderLoading(document.querySelector('#create-btn'), "Сохранение...");
          const cardList = new Section({
            items: new Array(result),
            renderer: (cardItem) => {
              let cardTemplate = '';
              cardTemplate = new Card(cardItem, "#my-card");
              const cardElement = cardTemplate.generate();
              cardList.addItem(cardElement);
            }

          }, ".cards"
          )
          cardList.renderItems();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoading(document.querySelector('#create-btn'), "Создать");
        })

    }
  });
  myTest.open();
  myTest.setEventListeners();
})


const popup1 = new Popup("#edit-ava");
editAvaBtn.addEventListener("click", () => {
  popup1.open()
})
popup1.setEventListeners();

const popup3 = new Popup("#edit");
editBtn.addEventListener("click", () => {
  popup3.open()
})
popup3.setEventListeners();

//Отрисовка карточек
let test = api.getInitialCards()
  .then((res) => {
    const cardList = new Section({
      items: res,
      renderer: (cardItem) => {
        let cardTemplate = '';
        if (cardItem.owner._id === "b10a1c6c35dfac127967e93a") {
          cardTemplate = new Card(cardItem, "#my-card");
        } else {
          cardTemplate = new Card(cardItem, "#card");
        }
        const cardElement = cardTemplate.generate();
        cardList.addItem(cardElement);
      }

    }, ".cards"
    )
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  })


//ID пользователя
let userId = '';

//Загрузка данных пользователя с сервера
api.getUserInfo()
  .then((result) => {
    userId = result._id;
    const myUserInfo = new UserInfo(document.querySelector('.profile__name-text'), document.querySelector('.profile__desc'), document.querySelector('.profile__image'), result.name, result.about, result.avatar);
    myUserInfo.setUserInfo();
  })
  .catch((err) => {
    console.log(err);
  })

//Обновление данных о пользователе
profileInfo.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderLoading(profileInfo.querySelector('.popup__btn'), "Сохранение...");
  api.sendUserInfo(nameInput.value, jobInput.value)
    .then((result) => {
      const myUserInfo = new UserInfo(document.querySelector('.profile__name-text'), document.querySelector('.profile__desc'), document.querySelector('.profile__image'), result.name, result.about, result.avatar);
      myUserInfo.setUserInfo();
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(profileInfo.querySelector('.popup__btn'), "Сохранить");
    })
});

//Обновление аватара
profileAvatar.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderLoading(profileAvatar.querySelector('.popup__btn'), "Сохранение...");
  api.sendUserAvatar(avaInput.value)
    .then((result) => {
      const myUserInfo = new UserInfo(document.querySelector('.profile__name-text'), document.querySelector('.profile__desc'), document.querySelector('.profile__image'), result.name, result.about, result.avatar);
      myUserInfo.setUserInfo();
      closePopup(editAva);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(profileAvatar.querySelector('.popup__btn'), "Сохранить");
    })
})

//Валидация форм
const test1 = new FormValidator(enableValidation, profileInfo);
const test2 = new FormValidator(enableValidation, createForm);
const test3 = new FormValidator(enableValidation, profileAvatar);
test1.enableValidation();
test2.enableValidation();
test3.enableValidation();



