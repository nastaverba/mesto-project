//Импорт
import { nameInput, jobInput, photoNameInput, photoLinkInput } from "./constants";

//Переменные для запросов
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12'
}

export const myHeaders = {
  authorization: 'ebed94c5-4469-48fb-a5ed-153cc27ff20d',
  'Content-Type': 'application/json'
}

export const myId = 'b10a1c6c35dfac127967e93a';

//Получение исходных карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: myHeaders
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

//Получение данных о пользователе
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: myHeaders
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

//Обновление данных пользователя
export const sendUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: myHeaders,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

//Создание новой карточки
export const addNewCard = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      name: photoNameInput.value,
      link: photoLinkInput.value
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
