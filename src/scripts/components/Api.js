class Api {
  constructor(data) {
    this.baseUrl = data.baseUrl;
    this.headers = data.headers;
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

  sendUserInfo (data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.firstname,
        about:data.about
      })
    })
    .then(res => {
      return this.getResponseData(res);
    });
  }

  sendUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avaLink
      })
    })
    .then(res => {
      return this.getResponseData(res);
    });
  }

  addNewCard (data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.photoName,
        link: data.photoLink

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






