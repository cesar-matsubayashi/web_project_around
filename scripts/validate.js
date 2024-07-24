export const configObj = {
  formSelector: ".form",
  fieldsetSelector: ".form__fieldset",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configObj.errorClass);
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configObj.inputErrorClass);
  errorElement.classList.remove(configObj.errorClass);
  errorElement.textContent = "";
}

export function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(configObj.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(configObj.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(configObj.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    configObj.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

export function enableValidation(obj) {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(
      formElement.querySelectorAll(configObj.fieldsetSelector)
    );

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
}

enableValidation(configObj);
