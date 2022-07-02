const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12'
}

const myHeaders = {
  authorization: 'ebed94c5-4469-48fb-a5ed-153cc27ff20d',
  'Content-Type': 'application/json'
}

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


