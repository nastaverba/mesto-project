// export default class UserInfo {
//   constructor(nameSelector, aboutSelector, avatarSelector, serverName, serverAbout, serverAvatar) {
//     this.nameSelector = nameSelector;
//     this.aboutSelector = aboutSelector;
//     this.avatarSelector = avatarSelector;
//     this.serverName = serverName;
//     this.serverAbout = serverAbout;
//     this.serverAvatar = serverAvatar;
//   }

//   getUserInfo() {
//     return {
//       name: this.serverName,
//       about: this.serverAbout,
//       avatar: this.serverAvatar
//     };
//   }


//   setUserInfo() {
//     this.nameSelector.textContent = this.getUserInfo().name;
//     this.aboutSelector.textContent = this.getUserInfo().about;
//     this.avatarSelector.style.backgroundImage = `url(${this.getUserInfo().avatar}`;
//   }
// }

export default class UserInfo {
  constructor({ username, job, avatar }) {
    this._username = document.querySelector(username);
    this._job = document.querySelector(job);
    this._avatar = document.querySelector(avatar);
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      username: this._username.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src
    }

    return userInfo;
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._username.textContent = data.name;
    this._job.textContent = data.about;
    this._avatar.style.backgroundImage = `url(${data.avatar}`;
    console.log(data);
  }
}
