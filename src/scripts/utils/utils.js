import {profileName, profileDesc, profileImg} from './constants.js';

export function renderProfile(name, about, avatar) {
  profileName.textContent = name;
  profileDesc.textContent = about;
  profileImg.style.backgroundImage = `url(${avatar}`;
}

export function renderLoading(formButton, textButton) {
  formButton.textContent = textButton;
}
