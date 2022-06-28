//Импорт
import {popupEdit, profileName, profileDesc, nameInput, jobInput} from './constants.js' ;

//Закрытие попапов
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

//Закрытие попапов по Esc
function closePopupEsc(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

//Открытие попапов
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

//Редактирование имени и информации о себе
function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closePopup(popupEdit);
}

//Экспорт
export {openPopup, editProfile, closePopupEsc, closePopup};