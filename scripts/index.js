import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const configObj = {
  formSelector: ".form",
  fieldsetSelector: ".form__fieldset",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const formList = Array.from(document.querySelectorAll(".form"));
formList.forEach((form) => {
  const validator = new FormValidator(configObj, form);
  validator.enableValidation();
});

// const editBtn = document.querySelector(".profile__edit-btn");
// editBtn.addEventListener("click", toggleEditPopup);

// const editCloseBtn = document.querySelector(".popup-form__close-icon_edit");
// editCloseBtn.addEventListener("click", toggleEditPopup);

// function toggleEditPopup() {
//   const popupContent = document.querySelector(".popup-form_edit");

//   popup.classList.toggle("popup_is-opened");
//   popupContent.classList.toggle("popup-form_is-opened");
//   document.forms.edit.reset();

//   if (popup.classList.contains("popup")) {
//     const profileName = document.querySelector(".profile__name");
//     const profileDescription = document.querySelector(".profile__description");

//     const name = popupContent.querySelector(".form__input_el_name");
//     const description = popupContent.querySelector(
//       ".form__input_el_description"
//     );

//     name.value = profileName.textContent.trim();
//     description.value = profileDescription.textContent;
//   }
// }

// const editForm = document.querySelector(".form_edit");
// editForm.addEventListener("submit", handleProfileEditFormSubmit);

// function handleProfileEditFormSubmit(evt) {
//   evt.preventDefault();

//   const nameInput = document.querySelector(".form__input_el_name");
//   const descriptionInput = document.querySelector(
//     ".form__input_el_description"
//   );

//   const profileName = document.querySelector(".profile__name");
//   const profileDescription = document.querySelector(".profile__description");

//   profileName.textContent = nameInput.value;
//   profileDescription.textContent = descriptionInput.value;

//   toggleEditPopup();
// }

// const addBtn = document.querySelector(".profile__add-btn");
// addBtn.addEventListener("click", toggleAddPopup);

// const addCloseBtn = document.querySelector(".popup-form__close-icon_add");
// addCloseBtn.addEventListener("click", toggleAddPopup);

// function toggleAddPopup() {
//   const popupContent = document.querySelector(".popup-form_add");

//   popup.classList.toggle("popup_is-opened");
//   popupContent.classList.toggle("popup-form_is-opened");
//   document.forms.add.reset();
// }

// const addForm = document.querySelector(".form_add");
// addForm.addEventListener("submit", handleProfileAddFormSubmit);

// function handleProfileAddFormSubmit(evt) {
//   evt.preventDefault();

//   const title = document.querySelector(".form__input_el_title");
//   const url = document.querySelector(".form__input_el_url");

//   const card = new Card(title.value, url.value, "#card-template");
//   const cardElement = card.generateCard();

//   gallery.prepend(cardElement);

//   title.value = "";
//   url.value = "";
//   toggleAddPopup();
// }

const gallery = document.querySelector(".gallery");
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach((cardInfo) => {
  const card = new Card(cardInfo.name, cardInfo.link, "#card-template");
  const cardElement = card.generateCard();
  gallery.prepend(cardElement);
});
