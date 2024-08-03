export default class FormValidator {
  constructor(configObj, form) {
    this._configObj = configObj;
    this._form = form;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._configObj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._configObj.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._configObj.inputErrorClass);
    errorElement.classList.remove(this._configObj.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._configObj.inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this._configObj.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._configObj.inputSelector)
    );

    const buttonElement = this._form.querySelector(
      this._configObj.submitButtonSelector
    );

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleButtonState(inputList, buttonElement);
        this._checkInputValidity(inputElement);
      });
    });

    this._form.addEventListener("reset", () => {
      inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
        buttonElement.classList.add(this._configObj.inactiveButtonClass);
        buttonElement.setAttribute("disabled", true);
      });
    });

    this._form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
  }

  enableValidation() {
    const fieldsetList = Array.from(
      this._form.querySelectorAll(this._configObj.fieldsetSelector)
    );

    fieldsetList.forEach((fieldset) => {
      this._setEventListeners(fieldset);
    });
  }
}
