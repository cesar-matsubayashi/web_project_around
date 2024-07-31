export default class UserInfo {
  constructor(data) {
    this._name = data.name;
    this._description = data.description;
  }

  getUserInfo() {
    const info = {};
    info.name = this._name;
    info.description = this._description;

    return info;
  }

  setUserInfo(data) {
    this._name = data.name;
    this._description = data.description;
  }
}
