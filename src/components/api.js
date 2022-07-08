//Импорт
import { avaInput, nameInput, jobInput, photoNameInput, photoLinkInput } from "./constants";

//Переменные для запросов
export function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12'
}

export const myHeaders = {
  authorization: 'ebed94c5-4469-48fb-a5ed-153cc27ff20d',
  'Content-Type': 'application/json'
}

//Получение исходных карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: myHeaders
  })
    .then(res => {
      getResponseData(res);
      return res.json();
    });
}

//Получение данных о пользователе
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: myHeaders
  })
    .then(res => {
      getResponseData(res);
      return res.json();
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
    getResponseData(res);
      return res.json();
  });
}

//Обновление аватара пользователя
export const sendUserAvatar = () => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: myHeaders,
    body: JSON.stringify({
      avatar: avaInput.value
    })
  })
  .then(res => {
    getResponseData(res);
      return res.json();
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
    getResponseData(res);
      return res.json();
  });
}

//Получение данных о карточках и о пользователе
export const getCardsAndUser = Promise.all([getInitialCards(), getUserInfo()]);

//Постановка и удаление лайка
export const addLikeToCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: myHeaders
  })
    .then(res => {
      getResponseData(res);
      return res.json();
    });
}

export const removeLikefromCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: myHeaders
  })
    .then(res => {
      getResponseData(res);
      return res.json();
    });
}

//Удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: myHeaders
  })
    .then(res => {
      getResponseData(res);
      return res.json();
    });
}
