//Импорт
import { popupAdd, createForm, photoNameInput, photoLinkInput, cardTemplate, cards, photoFull, photoFullImage, photoFullName, createBtn } from './constants.js';
import { openPopup, closePopup } from './modal.js';

//Создание карточки
function createCard(name, link, likes, cardId, serverLikes, serverMe, itemOwner, myDeleteFunction, myLikeFunction) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  card.querySelector('.card__name-text').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  card.querySelector('.card__like-count').textContent = likes;
  //Превью карточки

  const cardName = card.querySelector('.card__name-text');
  cardImage.addEventListener('click', function () {
    openPopup(photoFull);
    photoFullImage.src = cardImage.src;
    photoFullImage.alt = cardName.textContent;
    photoFullName.textContent = cardName.textContent;
  });
  //Отображение лайка карточки
  showLike(serverLikes, serverMe, card);
  //Отображение иконки удаления
  showDeleteIcon(itemOwner, serverMe, card);
  //Слушатель удаления карточки
  const removeIcon = card.querySelector('.card__remove-icon');
  removeIcon.addEventListener('click', function () {
    myDeleteFunction(cardId, card);
  })
  //Слушатель лайка карточки
  const cardLike = card.querySelector('.card__like');
  cardLike.addEventListener('click', function () {
    myLikeFunction(serverLikes, serverMe, cardId, card);
  })
  //Готовая карточка
  return card;
}

//Функция, которая добавляет карточку в DOM
function renderCard(somecard, somecontainer) {
  somecontainer.prepend(somecard);
}
function renderInitialCards(somecard, somecontainer) {
  somecontainer.append(somecard);
}

//Функция для отображения лайка карточки
function showLike(serverLikes, serverMe, card) {
  const cardLike = card.querySelector('.card__like');
  if (serverLikes.some((user) => user._id === serverMe)) {
    cardLike.classList.add('card__like_liked');
  }
}

//Функция для отображения иконки удаления
function showDeleteIcon(itemOwner, serverMe, card) {
  if (itemOwner !== serverMe) {
    const removeIcon = card.querySelector('.card__remove-icon');
    removeIcon.classList.remove('card__remove-icon_active');
  }
}

//Функции лайка и дизлайка карточки
function likeCard(result, myCard) {
  const cardLike = myCard.querySelector('.card__like');
  myCard.querySelector('.card__like-count').textContent = result.likes.length;
  cardLike.classList.add('card__like_liked');
}

function unlikeCard(result, myCard) {
  const cardLike = myCard.querySelector('.card__like');
  myCard.querySelector('.card__like-count').textContent = result.likes.length;
  cardLike.classList.remove('card__like_liked');
}

//Функция удаления карточки
function removeCard(myCard) {
  myCard.remove();
}

//Экспорт
export { createCard, renderCard, renderInitialCards, likeCard, unlikeCard, removeCard };
