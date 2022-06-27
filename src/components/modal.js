//Импорт
import {popupEdit, profileName, profileDesc, nameInput, jobInput} from './constants.js' ;
import {closePopup} from './utils.js';

//Открытие попапов
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

//Редактирование имени и информации о себе
function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closePopup(popupEdit);
}

//Экспорт
export {openPopup, editProfile};
