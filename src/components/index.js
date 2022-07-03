//Импорт
import '../pages/index.css';

import { popups, popupEdit, popupAdd, addBtn, editBtn, createForm, createBtn, photoNameInput, photoLinkInput, profileName,
profileDesc, profileInfo, nameInput, jobInput, cardTemplate, cards, photoFull, photoFullImage, photoFullName} from './constants.js' ;
import {showInputError, hideInputError, isValid, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation} from './validate.js';
import {createCard, renderCard, renderInitialCards, adddLike} from './card.js';
import {openPopup, closePopupEsc, closePopup} from './modal.js';
import {addNewCard, getInitialCards, getUserInfo, sendUserInfo} from './api.js';
import { renderProfile } from './utils';

//Загрузка карточки с сервера
getInitialCards()
  .then((result) => {
    result.forEach(function (item) {
      const myCard = createCard(item.name, item.link);
      renderInitialCards(myCard, cards);
    })
  })
  .catch((err) => {
    console.log(err);
  })

//Загрузка данные пользователя с сервера
getUserInfo()
  .then((result) => {
    renderProfile(result.name, result.about, result.avatar);
  })
  .catch((err) => {
    console.log(err);
  })


//Обновление данных о пользователе
profileInfo.addEventListener('submit', function(evt) {
  evt.preventDefault();
  sendUserInfo(nameInput.value, jobInput.value)
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((result) => {
      renderProfile(result.name, result.about, result.avatar);
    })
    .then((result) => {
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
});

//Добавление новой карточки
createForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addNewCard()
    .then((result) => {
      renderCard(createCard(result.name, result.link), cards);
    })
    .then((result) => {
      createForm.reset();
    })
    .then((result) => {
      createBtn.classList.add('popup__btn_inactive');
    })
    .then((result) => {
      createBtn.disabled = true;
    })
    .then((result) => {
      closePopup(popupAdd);
    })
    .catch((err) => {
      console.log(err);
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

//Закрытие попапов
popups.forEach(function (popup) {
  const closeBtn = popup.querySelector('.popup__close-icon');
  closeBtn.addEventListener('click', function () {
    closePopup(popup);
  });
  //Закрытие по нажатию на оверлей
  popup.addEventListener('click', function (evt) {
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




