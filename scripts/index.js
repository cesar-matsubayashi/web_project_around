import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";

const configObj = {
  formSelector: ".form",
  fieldsetSelector: ".form__fieldset",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  gallerySelector: ".gallery",
  cardTemplateSelector: "#card-template",
};

const formList = Array.from(document.querySelectorAll(".form"));
formList.forEach((form) => {
  const validator = new FormValidator(configObj, form);
  validator.enableValidation();
});

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

const popupImage = new PopupWithImage(".popup_image");
popupImage.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          data: item,
          handleCardClick: () => {
            popupImage.open(item);
          },
        },
        "#card-template"
      );
      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
    },
  },
  configObj.gallerySelector
);

cardList.renderItems();

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

const popupFormEdit = new PopupWithForm((inputValues) => {
  userInfo.setUserInfo({
    name: inputValues.name,
    description: inputValues.description,
  });
}, ".popup_form_edit");
popupFormEdit.setEventListeners();

const popupFormAdd = new PopupWithForm((inputValues) => {
  const card = new Card(
    {
      data: inputValues,
      handleCardClick: () => {
        popupImage.open(item);
      },
    },
    "#card-template"
  );
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}, ".popup_form_add");
popupFormAdd.setEventListeners();

const editBtn = document.querySelector(".profile__edit-btn");
editBtn.addEventListener("click", () => {
  const info = userInfo.getUserInfo();

  const formInput = document.forms.edit.elements;
  const name = formInput["name"];
  const description = formInput["description"];

  name.value = info.name;
  description.value = info.description;

  popupFormEdit.open();
});

const addBtn = document.querySelector(".profile__add-btn");
addBtn.addEventListener("click", () => {
  popupFormAdd.open();
});
