//Импорт
import '../../pages/index.css';

import {
  cards,
  createForm,
  popups,
  popupEdit,
  popupAdd,
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
} from "../utils/constants.js";
import { Card } from '../components/Card.js'
import Section from '../components/Section.js';
import { openPopup, closePopupEsc, closePopup } from '../components/Modal.js';
//import { getOneCardAndUser, getResponseData, addNewCard, getInitialCards, getUserInfo, sendUserInfo, getUserandCards, addLikeToCard, removeLikefromCard, sendUserAvatar, deleteCard } from './api.js';
import { api } from '../components/Api.js';
import { FormValidator } from "../components/Validate.js";
import { renderLoading } from '../utils/utils';
import {Popup} from '../components/Popup.js';
import UserInfo from '../components/UserInfo.js';





const popup1 = new Popup("#edit-ava");
editAvaBtn.addEventListener("click", () => {
popup1.open()
} )
popup1.setEventListeners();

const popup2 = new Popup("#add");
addBtn.addEventListener("click", () => {
popup2.open()
} )
popup2.setEventListeners();

const popup3 = new Popup("#edit");
editBtn.addEventListener("click", () => {
popup3.open()
} )
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



//Функция, которая делает запрос на сервер и удаляет карточку
export function deleteThisCard(cardId, myCard) {
  deleteCard(cardId)
    .then(() => {
      removeCard(myCard);
    })
    .catch((err) => {
      console.log(err);
    })
}

//Функция, которая делает запрос на сервер и лайкает карточку
export function likeThisCard(myLikes, me, cardId, myCard) {
  if (myLikes.every((user) => user._id !== me)) {
    addLikeToCard(cardId)
      .then((result) => {
        likeCard(result, myCard);
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
    removeLikefromCard(cardId)
      .then((result) => {
        unlikeCard(result, myCard);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

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

// //Добавление новой карточки (ПОКА НЕ УДАЛЯТЬ)
// createForm.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   renderLoading(createForm.querySelector('.popup__btn'), "Сохранение...");
//   api.addNewCard()
//     .then((result) => {
//       const myCard = createCard(result.name, result.link, result.likes.length, result._id, result.likes, userId, result.owner._id, deleteThisCard, likeThisCard);
//       renderCard(myCard, cards);
//       createForm.reset();
//       createBtn.classList.add('popup__btn_inactive');
//       createBtn.disabled = true;
//       closePopup(popupAdd);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       renderLoading(createForm.querySelector('.popup__btn'), "Создать");
//     })
// })





const test1 = new FormValidator(enableValidation, profileInfo);
const test2 = new FormValidator(enableValidation, createForm);
const test3 = new FormValidator(enableValidation, profileAvatar);
test1.enableValidation();
test2.enableValidation();
test3.enableValidation();



