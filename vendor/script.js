//Шесть карточек «из коробки»
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards');
initialCards.forEach(function (card) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__name-text').textContent = card.name;
  cards.append(cardElement);
});

//Открытие попапов
const popup_edit = document.querySelector('#edit');
const popup_add = document.querySelector('#add');
const addBtn = document.querySelector('.profile__add-btn');
const editBtn = document.querySelector('.profile__name-edit');

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

addBtn.addEventListener('click', function () {
  openPopup(popup_add);
});
editBtn.addEventListener('click', function () {
  openPopup(popup_edit);
});

//Закрытие попапов
const popups = document.querySelectorAll('.popup');
popups.forEach(function (popup) {
  const closeBtn = popup.querySelector('.popup__close-icon');
  function closePopup() {
    popup.classList.remove('popup_opened');
  }
  closeBtn.addEventListener('click', closePopup);
});
