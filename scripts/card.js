//Импорт
import {initialCards, popupAdd, createForm, photoNameInput, photoLinkInput, cardTemplate, cards, photoFull, photoFullImage, photoFullName} from './constants.js' ;
import {closePopup} from './utils.js';

//Создание карточки
function createCard(name, link) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__name-text').textContent = name;
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = name;
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
    photoFull.classList.add('popup_opened');
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

//Отрисовка исходных 6 карточек
initialCards.forEach(function (item) {
  const myCard = createCard(item.name, item.link);
  renderCard(myCard, cards);
})

//Добавление новой карточки
createForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderCard(createCard(photoNameInput.value, photoLinkInput.value), cards);
  createForm.reset();
  closePopup(popupAdd);
})

//Лайк карточки
function adddLike(evt) {
  evt.target.classList.toggle('card__like_liked');
}

cards.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('card__like')) {
    adddLike(evt);
  }
}
)

//Экспорт
export {createCard, renderCard, adddLike};