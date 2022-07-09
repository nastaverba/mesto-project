//Импорт
import { popupAdd, createForm, photoNameInput, photoLinkInput, cardTemplate, cards, photoFull, photoFullImage, photoFullName, createBtn} from './constants.js' ;
import { openPopup, closePopup } from './modal.js';
import {likeCardsApi} from './index.js'

//Создание карточки
function createCard(name, link, likes) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__name-text').textContent = name;
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = name;
  card.querySelector('.card__like-count').textContent = likes;
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
  //const cardLike = card.querySelector('.card__like');
  //cardLike.addEventListener('click', function () {
    //likeCardsApi();
  //})

  return card;


}

//Функция, которая добавляет карточку в DOM
function renderCard(somecard, somecontainer) {
  somecontainer.prepend(somecard);
}
function renderInitialCards(somecard, somecontainer) {
  somecontainer.append(somecard);
}


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

//Экспорт
export {createCard, renderCard, renderInitialCards, likeCard, unlikeCard};
