//Импорт
import {popupEdit, profileName, profileDesc, nameInput, jobInput} from '../utils/constants.js' ;

//Закрытие попапов
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

//Закрытие попапов по Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

//Открытие попапов
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

//Экспорт
export {openPopup, closePopupEsc, closePopup};
