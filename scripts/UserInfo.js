export default class UserInfo {
  constructor(data) {
    this._name = document.querySelector(data.nameSelector);
    this._description = document.querySelector(data.descriptionSelector);
  }

  getUserInfo() {
    const info = {};
    info.name = this._name.textContent.trim();
    info.description = this._description.textContent;

    return info;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._description.textContent = data.description;
  }
}
