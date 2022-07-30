export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector, serverName, serverAbout, serverAvatar) {
    this.nameSelector = nameSelector;
    this.aboutSelector = aboutSelector;
    this.avatarSelector = avatarSelector;
    this.serverName = serverName;
    this.serverAbout = serverAbout;
    this.serverAvatar = serverAvatar;
  }

  getUserInfo() {
    return {
      name: this.serverName,
      about: this.serverAbout,
      avatar: this.serverAvatar
    };
  }


  setUserInfo() {
    this.nameSelector.textContent = this.getUserInfo().name;
    this.aboutSelector.textContent = this.getUserInfo().about;
    this.avatarSelector.style.backgroundImage = `url(${this.getUserInfo().avatar}`;
  }
}
