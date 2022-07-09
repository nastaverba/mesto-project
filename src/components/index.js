//Импорт
import '../pages/index.css';

import {
  popups, popupEdit, popupAdd, addBtn, editBtn, editAva, editAvaBtn, profileAvatar, createForm, createBtn, photoNameInput, photoLinkInput, profileName,
  profileDesc, profileInfo, nameInput, jobInput, cardTemplate, cards, photoFull, photoFullImage, photoFullName, avaInput
} from './constants.js';
import { showInputError, hideInputError, isValid, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation } from './validate.js';
import { createCard, renderCard, renderInitialCards, adddLike, likeCard, unlikeCard, removeCard } from './card.js';
import { openPopup, closePopupEsc, closePopup } from './modal.js';
import { getOneCardAndUser, getResponseData, addNewCard, getInitialCards, getUserInfo, sendUserInfo, getCardsAndUser, addLikeToCard, removeLikefromCard, sendUserAvatar, deleteCard } from './api.js';
import { renderProfile, renderLoading } from './utils';

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
export function LikeThisCard(myLikes, me, cardId, myCard) {
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

//Загрузка карточек
getCardsAndUser
  .then((result) => {
    result[0].forEach(function (item) {
      const myCard = createCard(item.name, item.link, item.likes.length, item._id, item.likes, result[1]._id, item.owner._id);
      renderInitialCards(myCard, cards);
    })
  })
  .catch((err) => {
    console.log(err);
  })

//Загрузка данных пользователя с сервера
getUserInfo()
  .then((result) => {
    renderProfile(result.name, result.about, result.avatar);
  })
  .catch((err) => {
    console.log(err);
  })

//Обновление данных о пользователе
profileInfo.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderLoading(profileInfo.querySelector('.popup__btn'), "Сохранение...");
  sendUserInfo(nameInput.value, jobInput.value)
    .then((result) => {
      renderProfile(result.name, result.about, result.avatar);
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
  sendUserAvatar(avaInput.value)
    .then((result) => {
      renderProfile(result.name, result.about, result.avatar);
      closePopup(editAva);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(profileAvatar.querySelector('.popup__btn'), "Сохранить");
    })
})

//Добавление новой карточки
createForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderLoading(createForm.querySelector('.popup__btn'), "Сохранение...");
  addNewCard()
    .then((result) => {
      const myCard = createCard(result.name, result.link, result.likes.length, result._id, result.likes, result._id, result.owner._id);
      renderCard(myCard, cards);
      createForm.reset();
      createBtn.classList.add('popup__btn_inactive');
      createBtn.disabled = true;
      closePopup(popupAdd);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(createForm.querySelector('.popup__btn'), "Создать");
    })
})

//Обработчики

//Открытие попапов
addBtn.addEventListener('click', function () {
  openPopup(popupAdd);
});

editBtn.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
  openPopup(popupEdit);
});

editAvaBtn.addEventListener('click', function () {
  openPopup(editAva);
})

//Закрытие попапов
popups.forEach(function (popup) {
  const closeBtn = popup.querySelector('.popup__close-icon');
  closeBtn.addEventListener('click', function () {
    closePopup(popup);
  });
  //Закрытие по нажатию на оверлей
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  });
})

//Валидация форм
enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__element',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__element_type_error',
  errorClass: 'popup__element-error_active'
});




