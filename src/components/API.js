export default class API {
  constructor(options) {
    this._url = options.baseUrl;
    this._options = { headers: options.headers };
  }

  getUserInfo() {
    return fetch(`${this._url}//users/me`, this._options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateUserInfo(userInfo) {
    this._options.method = "PATCH";
    this._options.body = JSON.stringify(userInfo);

    return fetch(`${this._url}/users/me`, this._options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, this._options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addCard(cardInfo) {
    this._options.method = "POST";
    this._options.body = JSON.stringify(cardInfo);

    return fetch(`${this._url}/cards`, this._options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    this._options.method = "DELETE";

    return fetch(`${this._url}/cards/${cardId}`, this._options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  likeCard(cardId) {
    this._options.method = "PUT";

    return fetch(`${this._url}/cards/likes/${cardId}`, this._options).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      }
    );
  }

  dislikeCard(cardId) {
    this._options.method = "DELETE";

    return fetch(`${this._url}/cards/likes/${cardId}`, this._options).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      }
    );
  }

  updateProfileAvatar(avatarLink) {
    this._options.method = "PATCH";
    this._options.body = JSON.stringify(avatarLink);

    return fetch(`${this._url}/users/me`, this._options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
