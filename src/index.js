import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import API from "./components/API.js";
import "./pages/index.css";

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

const api = new API({
  baseUrl: "https://around.nomoreparties.co/v1/group-42",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json",
  },
});

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
        popupImage.open(inputValues);
      },
    },
    "#card-template"
  );
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}, ".popup_form_add");
popupFormAdd.setEventListeners();

const popupFormEditAvatar = new PopupWithForm((inputValue) => {
  api
    .updateProfileAvatar({ avatar: inputValue.link })
    .then((result) => {
      const avatar = document.querySelector(".profile__photo");
      avatar.src = result.avatar;
    })
    .catch((err) => {
      console.log(err);
    });
}, ".popup_form_edit-avatar");
popupFormEditAvatar.setEventListeners();

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

const editAvatarBtn = document.querySelector(".profile__edit-photo");
editAvatarBtn.addEventListener("click", () => {
  popupFormEditAvatar.open();
});
