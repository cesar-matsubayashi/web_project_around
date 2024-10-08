import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import API from "../components/API.js";
import "./index.css";

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
  baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-14",
  headers: {
    authorization: "e255bcaf-9aa3-4e45-a23a-da684d7fa67f",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__photo",
});
let cardList;

api
  .getUserInfo()
  .then((response) => {
    userInfo.setUserInfo({
      name: response.name,
      about: response.about,
      avatar: response.avatar,
      id: response._id,
      cohort: response.cohort,
    });
  })
  .then(() => {
    api
      .getInitialCards()
      .then((response) => {
        cardList = new Section(
          {
            items: response,
            renderer: (item) => {
              addCard(item);
            },
          },
          configObj.gallerySelector
        );

        cardList.renderItems();
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

function addCard(data) {
  const card = new Card(
    {
      data: data,
      user: userInfo.getUserInfo(),
      handleCardClick: () => {
        popupImage.open(data);
      },
      handleDeleteClick: (cardId) => {
        const input = document.forms.confirm.elements;
        input["id"].value = cardId;
        popupFormConfirm.open();
      },
      handleLikeClick: (cardId) => {
        const method = card.isUserLiked() ? "DELETE" : "PUT";

        api
          .likeCard(cardId, method)
          .then((response) => {
            card.like(response.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    "#card-template"
  );

  const cardElement = card.generateCard();
  cardList.addItem(cardElement);

  return card;
}

const formList = Array.from(document.querySelectorAll(".form")).filter(
  (form) => form.name !== "confirm"
);

formList.forEach((form) => {
  const validator = new FormValidator(configObj, form);
  validator.enableValidation();
});

const popupImage = new PopupWithImage(".popup_image");
popupImage.setEventListeners();

const popupFormConfirm = new PopupWithForm(
  {
    submit: (inputValue) => {
      api
        .deleteCard(inputValue.id)
        .then(() => {
          cardList.removeItem(inputValue.id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadingText: "Salvar...",
  },
  ".popup_form_confirm"
);
popupFormConfirm.setEventListeners();

const popupFormEdit = new PopupWithForm(
  {
    submit: (inputValues) => {
      api
        .updateUserInfo(inputValues)
        .then((response) => {
          userInfo.setUserInfo({
            name: response.name,
            about: response.about,
          });
        })
        .catch((err) => console.log(err));
    },
    loadingText: "Salvar...",
  },
  ".popup_form_edit"
);
popupFormEdit.setEventListeners();

const popupFormAdd = new PopupWithForm(
  {
    submit: (inputValues) => {
      api
        .addCard(inputValues)
        .then((response) => {
          addCard(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadingText: "Crie",
  },
  ".popup_form_add"
);
popupFormAdd.setEventListeners();

const popupFormEditAvatar = new PopupWithForm(
  {
    submit: (inputValue) => {
      api
        .updateProfileAvatar({ avatar: inputValue.link })
        .then((result) => {
          userInfo.setUserInfo({ avatar: result.avatar });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadingText: "Salvar...",
  },
  ".popup_form_edit-avatar"
);
popupFormEditAvatar.setEventListeners();

const editBtn = document.querySelector(".profile__edit-btn");
editBtn.addEventListener("click", () => {
  const info = userInfo.getUserInfo();

  const formInput = document.forms.edit.elements;
  const name = formInput["name"];
  const about = formInput["about"];

  name.value = info.name;
  about.value = info.about;

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
