import { enableValidation, checkInputValidity } from "./validate.js";

const popup = document.querySelector(".popup");
popup.addEventListener("click", closePopupHandler);

function closePopupHandler() {
  const formPopups = Array.from(document.querySelectorAll(".popup-form"));

  formPopups.forEach((form) => {
    form.classList.remove("popup-form_opened");
    popup.classList.remove("popup_opened");
  });

  const popupImage = document.querySelector(".popup-image");
  if (popupImage) {
    popupImage.remove();
  }
}

document.addEventListener("keydown", function (evt) {
  console.log(evt.key);
  if (evt.key === "Escape") {
    closePopupHandler();
  }
});

const editBtn = document.querySelector(".profile__edit-btn");
editBtn.addEventListener("click", toggleEditPopup);

const editCloseBtn = document.querySelector(".popup-form__close-icon_edit");
editCloseBtn.addEventListener("click", toggleEditPopup);

function toggleEditPopup() {
  const popupContent = document.querySelector(".popup-form_edit");

  popup.classList.toggle("popup_opened");
  popupContent.classList.toggle("popup-form_opened");

  if (popup.classList.contains("popup")) {
    const profileName = document.querySelector(".profile__name");
    const profileDescription = document.querySelector(".profile__description");

    const name = popupContent.querySelector(".form__input_el_name");
    const description = popupContent.querySelector(
      ".form__input_el_description"
    );

    name.value = profileName.textContent.trim();
    description.value = profileDescription.textContent;
    checkInputValidity(document.forms.edit, name);
    checkInputValidity(document.forms.edit, description);
  }
  enableValidation();
}

const editForm = document.querySelector(".form_edit");
editForm.addEventListener("submit", handleProfileEditFormSubmit);

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector(".form__input_el_name");
  const descriptionInput = document.querySelector(
    ".form__input_el_description"
  );

  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  toggleEditPopup();
}

const addBtn = document.querySelector(".profile__add-btn");
addBtn.addEventListener("click", toggleAddPopup);

const addCloseBtn = document.querySelector(".popup-form__close-icon_add");
addCloseBtn.addEventListener("click", toggleAddPopup);

function toggleAddPopup() {
  const popupContent = document.querySelector(".popup-form_add");

  popup.classList.toggle("popup_opened");
  popupContent.classList.toggle("popup-form_opened");
  enableValidation();
}

const addForm = document.querySelector(".form_add");
addForm.addEventListener("submit", handleProfileAddFormSubmit);

function handleProfileAddFormSubmit(evt) {
  evt.preventDefault();

  const title = document.querySelector(".form__input_el_title");
  const url = document.querySelector(".form__input_el_url");

  addCard(title.value, url.value);

  title.value = "";
  url.value = "";
  toggleAddPopup();
}

function addCard(title, url) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".gallery__card")
    .cloneNode(true);

  cardElement.querySelector(".gallery__photo").src = url;
  cardElement.querySelector(".gallery__photo").alt = `Imagem ${title}`;
  cardElement.querySelector(".gallery__title").textContent = title;

  gallery.prepend(cardElement);
}

const gallery = document.querySelector(".gallery");
gallery.addEventListener("click", (evt) => {
  const targetClass = evt.target.classList[0];
  const card = evt.target.closest(".gallery__card");

  switch (targetClass) {
    case "gallery__trash":
      card.remove();
      break;

    case "gallery__photo":
      const imageUrl = evt.target.src;
      const imageTitle = card.querySelector(".gallery__title").textContent;
      popup.classList.toggle("popup_opened");
      createImagePopup(imageUrl, imageTitle);
      break;

    case "gallery__like-btn":
      const like = evt.target;

      if (like.classList.contains("gallery__like-btn_active")) {
        like.src = " ../images/like.svg";
      } else {
        like.src = " ../images/like-active.svg";
      }

      like.classList.toggle("gallery__like-btn_active");
      break;

    default:
      console.log(`Classe inesperada: ${targetClass}`);
      break;
  }
});

function createImagePopup(url, title) {
  const imagePopupTemplate = document.querySelector(
    "#popup-image-template"
  ).content;
  const imagePopupElement = imagePopupTemplate
    .querySelector(".popup-image")
    .cloneNode(true);
  const imagePopupClose = imagePopupElement.querySelector(
    ".popup-image__close-icon"
  );

  imagePopupClose.addEventListener("click", (evt) => {
    imagePopupElement.remove();
    popup.classList.toggle("popup_opened");
  });

  imagePopupElement.querySelector(".popup-image__photo").src = url;
  imagePopupElement.querySelector(
    ".popup-image__photo"
  ).alt = `Imagem ${title}`;
  imagePopupElement.querySelector(".popup-image__title").textContent = title;

  popup.after(imagePopupElement);
}

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

initialCards.forEach((card) => addCard(card.name, card.link));
