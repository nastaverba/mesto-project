//Импорт
import { avaInput, nameInput, jobInput, photoNameInput, photoLinkInput } from "./constants";


class Api {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  };

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then(res => {
        return this.getResponseData(res);
      });
  }

  getUserInfo() {
  return fetch(`${this.baseUrl}/users/me`, {
    headers: this.headers
  })
    .then(res => {
      return this.getResponseData(res);
    });
  }

  sendUserInfo () {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: nameInput.value,
        about: jobInput.value
      })
    })
    .then(res => {
      return this.getResponseData(res);
    });
  }

  sendUserAvatar() {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avaInput.value
      })
    })
    .then(res => {
      return this.getResponseData(res);
    });
  }

  addNewCard () {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: photoNameInput.value,
        link: photoLinkInput.value
      })
    })
    .then(res => {
      return this.getResponseData(res);
    });
  }

  addLikeToCard(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(res => {
        return this.getResponseData(res);
      });
  }

  removeLikefromCard(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => {
        return this.getResponseData(res);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => {
        return this.getResponseData(res);
      });
  }

}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: 'ebed94c5-4469-48fb-a5ed-153cc27ff20d',
    'Content-Type': 'application/json'
  }
});






//Переменные для запросов
// export function getResponseData(res) {
//   if (!res.ok) {
//     return Promise.reject(`Ошибка: ${res.status}`);
//   }
//   return res.json();
// };

// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12'
// }

// export const myHeaders = {
//   authorization: 'ebed94c5-4469-48fb-a5ed-153cc27ff20d',
//   'Content-Type': 'application/json'
// }

// //Получение исходных карточек
// export const getInitialCards = () => {
//   return fetch(`${config.baseUrl}/cards`, {
//     headers: myHeaders
//   })
//     .then(res => {
//       return getResponseData(res);
//     });
// }

// //Получение данных о пользователе
// export const getUserInfo = () => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     headers: myHeaders
//   })
//     .then(res => {
//       return getResponseData(res);
//     });
// }

// //Обновление данных пользователя
// export const sendUserInfo = () => {
//   return fetch(`${config.baseUrl}/users/me`, {
//     method: 'PATCH',
//     headers: myHeaders,
//     body: JSON.stringify({
//       name: nameInput.value,
//       about: jobInput.value
//     })
//   })
//   .then(res => {
//     return getResponseData(res);
//   });
// }

// //Обновление аватара пользователя
// export const sendUserAvatar = () => {
//   return fetch(`${config.baseUrl}/users/me/avatar`, {
//     method: 'PATCH',
//     headers: myHeaders,
//     body: JSON.stringify({
//       avatar: avaInput.value
//     })
//   })
//   .then(res => {
//     return getResponseData(res);
//   });
// }

// //Создание новой карточки
// export const addNewCard = () => {
//   return fetch(`${config.baseUrl}/cards`, {
//     method: 'POST',
//     headers: myHeaders,
//     body: JSON.stringify({
//       name: photoNameInput.value,
//       link: photoLinkInput.value
//     })
//   })
//   .then(res => {
//     return getResponseData(res);
//   });
// }

// //Постановка и удаление лайка
// export const addLikeToCard = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//     method: 'PUT',
//     headers: myHeaders
//   })
//     .then(res => {
//       return getResponseData(res);
//     });
// }

// export const removeLikefromCard = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//     method: 'DELETE',
//     headers: myHeaders
//   })
//     .then(res => {
//       return getResponseData(res);
//     });
// }

// //Удаление карточки
// export const deleteCard = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/${cardId}`, {
//     method: 'DELETE',
//     headers: myHeaders
//   })
//     .then(res => {
//       return getResponseData(res);
//     });
// }
