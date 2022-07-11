//Попапы
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('#edit');
const popupAdd = document.querySelector('#add');
const addBtn = document.querySelector('.profile__add-btn');
const editBtn = document.querySelector('.profile__name-edit');
const editAva = document.querySelector('#edit-ava');
const editAvaBtn = document.querySelector('.profile__image-edit');

//Попап создания карточки
const createForm = document.querySelector('#addPlace');
const createBtn = document.querySelector('#create-btn');
const photoNameInput = document.querySelector('.popup__element_data_photoname');
const photoLinkInput = document.querySelector('.popup__element_data_photolink');

//Форма "Обновить аватар"
const avaInput = document.querySelector('.popup__element_data_avatar');
const profileAvatar = document.querySelector('#profileAvatar');

//Поля формы "Редактировать профиль"
const profileName = document.querySelector('.profile__name-text');
const profileDesc = document.querySelector('.profile__desc');
const profileImg = document.querySelector('.profile__image');
const profileInfo = document.querySelector('#profileInfo');
const nameInput = document.querySelector('.popup__element_data_firstname');
const jobInput = document.querySelector('.popup__element_data_about');

//Карточки
const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards');
const photoFull = document.querySelector('#photo-full');
const photoFullImage = document.querySelector('.popup__img');
const photoFullName = document.querySelector('.popup__caption');

//Экспорт
export { popups, popupEdit, popupAdd, addBtn, editBtn, editAva, editAvaBtn, avaInput, profileAvatar, createForm, createBtn, photoNameInput, photoLinkInput, profileName,
profileDesc, profileImg, profileInfo, nameInput, jobInput, cardTemplate, cards, photoFull, photoFullImage, photoFullName }
