export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.nameSelector);
    this._description = document.querySelector(data.descriptionSelector);
    this._avatar = document.querySelector(data.avatarSelector);
  }

  getUserInfo() {
    const info = {};
    info.name = this._name.textContent.trim();
    info.description = this._description.textContent;
    info.avatar = this._avatar.src;
    info._id = this._id;
    info.cohort = this._cohort;

    return info;
  }

  setUserInfo(data) {
    if (data.name) {
      this._name.textContent = data.name;
    }

    if (data.description) {
      this._description.textContent = data.description;
    }
    if (data.avatar) {
      this._avatar.src = data.avatar;
    }

    if (data.id) {
      this._id = data._id;
    }

    if (data.cohort) {
      this._cohort = data.cohort;
    }
  }
}
