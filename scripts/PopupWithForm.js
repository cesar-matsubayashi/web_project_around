import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(renderer, popupSelector) {
    super(popupSelector);
    this._renderer = renderer;
    this._form = this._popup.querySelector(".form");
  }

  close() {
    super.close();
    this._form.reset();
  }

  _getInputValues() {
    const inputs = this._form.elements.filter((element) => {
      return element.nodeName === "INPUT";
    });

    return inputs.map((input) => {
      return input.value;
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }
}
