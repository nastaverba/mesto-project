import {profileName, profileDesc, profileImg} from './constants.js';

export function renderProfile(name, about, avatar) {
  profileName.textContent = name;
  profileDesc.textContent = about;
  profileImg.style.backgroundImage = `url(${avatar}`;
}

export function renderLoading(isLoading, formButton) {
  if (isLoading) {
    formButton.textContent = "Сохранение...";
  } else {
    formButton.textContent = "Сохранить";
  }
}

export function renderLoadingForCard(isLoading, formButton) {
  if (isLoading) {
    formButton.textContent = "Сохранение...";
  } else {
    formButton.textContent = "Создать";
  }
}
