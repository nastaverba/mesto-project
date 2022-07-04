//Импорт
import { popupAdd, createForm, photoNameInput, photoLinkInput, cardTemplate, cards, photoFull, photoFullImage, photoFullName, createBtn} from './constants.js' ;
import { openPopup, closePopup } from './modal.js';

//Создание карточки
function createCard(name, link, likes) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__name-text').textContent = name;
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = name;
  card.querySelector('.card__like-count').textContent = likes;

  //Лайк карточки
  function adddLike(evt) {
    evt.target.classList.toggle('card__like_liked');
  }
  card.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__like')) {
      adddLike(evt);
    }
  }
  )
  //Удаление карточки
  const removeBtn = card.querySelector('.card__remove-icon');
  function removeCard() {
    card.remove();
  }
  removeBtn.addEventListener('click', removeCard);
  //Превью карточки
  const cardImage = card.querySelector('.card__image');
  const cardName = card.querySelector('.card__name-text');
  cardImage.addEventListener('click', function () {
    openPopup(photoFull);
    photoFullImage.src = cardImage.src;
    photoFullImage.alt = cardName.textContent;
    photoFullName.textContent = cardName.textContent;
  });
  return card;
}

//Функция, которая добавляет карточку в DOM
function renderCard(somecard, somecontainer) {
  somecontainer.prepend(somecard);
}
function renderInitialCards(somecard, somecontainer) {
  somecontainer.append(somecard);
}

//Экспорт
export {createCard, renderCard, renderInitialCards};
