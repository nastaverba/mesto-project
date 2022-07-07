//Импорт
import '../pages/index.css';

import {
  popups, popupEdit, popupAdd, addBtn, editBtn, editAva, editAvaBtn, profileAvatar, createForm, createBtn, photoNameInput, photoLinkInput, profileName,
  profileDesc, profileInfo, nameInput, jobInput, cardTemplate, cards, photoFull, photoFullImage, photoFullName, avaInput
} from './constants.js';
import { showInputError, hideInputError, isValid, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation } from './validate.js';
import { createCard, renderCard, renderInitialCards, adddLike } from './card.js';
import { openPopup, closePopupEsc, closePopup } from './modal.js';
import { addNewCard, getInitialCards, getUserInfo, sendUserInfo, getCardsAndUser, addLikeToCard, removeLikefromCard, sendUserAvatar, deleteCard } from './api.js';
import { renderProfile, renderLoading, renderLoadingForCard } from './utils';

//Загрузка карточек
getCardsAndUser
  .then((result) => {
    result[0].forEach(function (item) {
      const myCard = createCard(item.name, item.link, item.likes.length);
      if (item.owner._id !== result[1]._id) {
        const removeIcon = myCard.querySelector('.card__remove-icon');
        removeIcon.classList.remove('card__remove-icon_active');
      }
      const cardLike = myCard.querySelector('.card__like');
      if (item.likes.some((user) => user._id === result[1]._id)) {
        cardLike.classList.add('card__like_liked');
      }
      const removeIcon = myCard.querySelector('.card__remove-icon');
      removeIcon.addEventListener('click', function () {
        deleteCard(item._id)
          .catch((err) => {
            console.log(err);
          })
      })
      cardLike.addEventListener('click', function () {
        if (item.likes.every((user) => user._id !== result[1]._id)) {
          addLikeToCard(item._id)
            .then((result) => {
              myCard.querySelector('.card__like-count').textContent = result.likes.length;
            })
            .then(() => {
              cardLike.classList.add('card__like_liked');
            })
            .catch((err) => {
              console.log(err);
            })
        } else {
          removeLikefromCard(item._id)
            .then((result) => {
              myCard.querySelector('.card__like-count').textContent = result.likes.length;
            })
            .then(() => {
              cardLike.classList.remove('card__like_liked');
            })
            .catch((err) => {
              console.log(err);
            })
        }
      })
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
  renderLoading(true, profileInfo.querySelector('.popup__btn'));
  sendUserInfo(nameInput.value, jobInput.value)
    .then((result) => {
      renderProfile(result.name, result.about, result.avatar);
    })
    .then(() => {
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, profileInfo.querySelector('.popup__btn'));
    })
});

//Обновление аватара
profileAvatar.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderLoading(true, profileAvatar.querySelector('.popup__btn'));
  sendUserAvatar(avaInput.value)
    .then((result) => {
      renderProfile(result.name, result.about, result.avatar);
    })
    .then(() => {
      closePopup(editAva);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, profileAvatar.querySelector('.popup__btn'));
    })
})

//Добавление новой карточки
createForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderLoadingForCard(true, createForm.querySelector('.popup__btn'));
  addNewCard()
    .then((result) => {
      renderCard(createCard(result.name, result.link, result.likes.length), cards);
    })
    .then(() => {
      createForm.reset();
    })
    .then(() => {
      createBtn.classList.add('popup__btn_inactive');
    })
    .then(() => {
      createBtn.disabled = true;
    })
    .then(() => {
      closePopup(popupAdd);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoadingForCard(false, createForm.querySelector('.popup__btn'));
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




