import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._src = data.src;
    this._caption = data.caption;
  }

  open() {
    this._popup.querySelector(".popup__image").src = this._src;
    this._popup.querySelector(".popup__caption").textContent = this._caption;
    super.open();
  }
}
