import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submit, loadingText }, popupSelector) {
    super(popupSelector);
    this._submit = submit;
    this._form = this._popup.querySelector(".form");
    this._loadingText = loadingText;
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    const inputs = Array.from(this._form.elements);
    inputs.filter((element) => {
      return element.nodeName !== "BUTTON";
    });

    this._formValues = {};
    inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._form.elements.submit.value = loadingText;
      this._submit(this._getInputValues());
      this.close();
    });
  }
}
