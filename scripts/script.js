//Объявление переменных

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

//Попапы
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('#edit');
const popupAdd = document.querySelector('#add');
const addBtn = document.querySelector('.profile__add-btn');
const editBtn = document.querySelector('.profile__name-edit');

//Попап создания карточки
const createForm = document.querySelector('#addPlace');
const createBtn = document.querySelector('#create-btn');
const photoNameInput = document.querySelector('.popup__element_data_photoname');
const photoLinkInput = document.querySelector('.popup__element_data_photolink');

//Поля формы "Редактировать профиль"
const profileName = document.querySelector('.profile__name-text');
const profileDesc = document.querySelector('.profile__desc');
const formElement = document.querySelector('#profileInfo');
const nameInput = document.querySelector('.popup__element_data_firstname');
const jobInput = document.querySelector('.popup__element_data_about');

//Карточки
const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards');
const photoFull = document.querySelector('#photo-full');
const photoFullImage = document.querySelector('.popup__img');
const photoFullName = document.querySelector('.popup__caption');

//Функции

//Открытие попапов
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

//Закрытие попапов
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

//Редактирование имени и информации о себе
function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closePopup(popupEdit);
}

//Создание карточки
function createCard(name, link) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  card.querySelector('.card__name-text').textContent = name;
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = name;
  //Лайк карточки
  const like = card.querySelector('.card__like');
  function addLike() {
    like.classList.toggle('card__like_liked');
  }
  like.addEventListener('click', addLike);
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
    const closeBtn = popup.querySelector('.popup__close-icon');
    closeBtn.addEventListener('click', function () {
      closePopup(popup);
    });
    //Закрытие по кнопке Esc
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        closePopup(popup);
      }
    });
    //Закрытие по нажатию на оверлей
    popup.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('popup')) {
        closePopup(popup);
      }
    });
  })

//Редактирование имени и информации о себе
formElement.addEventListener('submit', editProfile);

//Добавление новой карточки
createForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderCard(createCard(photoNameInput.value, photoLinkInput.value), cards);
  createForm.reset();
  closePopup(popupAdd);
})
