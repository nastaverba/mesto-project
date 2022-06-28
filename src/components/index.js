//Импорт
import '../pages/index.css';

import {initialCards, popups, popupEdit, popupAdd, addBtn, editBtn, createForm, createBtn, photoNameInput, photoLinkInput, profileName,
profileDesc, profileInfo, nameInput, jobInput, cardTemplate, cards, photoFull, photoFullImage, photoFullName} from './constants.js' ;
import {showInputError, hideInputError, isValid, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation} from './validate.js';
import {createCard, renderCard, adddLike} from './card.js';
import {openPopup, editProfile, closePopupEsc} from './modal.js';
import {closePopup} from './utils.js';

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
  document.removeEventListener('keydown', closePopupEsc);
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


//Редактирование имени и информации о себе
profileInfo.addEventListener('submit', editProfile);

//Валидация форм
enableValidation();



