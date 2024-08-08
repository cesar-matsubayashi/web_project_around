import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(formSubmit, popupSelector) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._form = this._popup.querySelector(".form");
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmit();
      this.close();
    });
  }
}
