const editBtn = document.querySelector(".profile__edit-btn");
editBtn.addEventListener("click", toggleEditPopup);

const editCloseBtn = document.querySelector(".popup-content__close-icon_edit");
editCloseBtn.addEventListener("click", toggleEditPopup);

function toggleEditPopup() {
  const popup = document.querySelector(".popup");
  const popupContent = document.querySelector(".popup-content_edit");

  popup.classList.toggle("popup_opened");
  popupContent.classList.toggle("popup-content_opened");

  if (popup.classList.contains("popup")) {
    const profileName = document.querySelector(".profile__name");
    const profileDescription = document.querySelector(".profile__description");

    const name = popupContent.querySelector(".form__input_el_name");
    const description = popupContent.querySelector(
      ".form__input_el_description"
    );

    name.value = profileName.textContent.trim();
    description.value = profileDescription.textContent;
  }
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

const addCloseBtn = document.querySelector(".popup-content__close-icon_add");
addCloseBtn.addEventListener("click", toggleAddPopup);

function toggleAddPopup() {
  const popup = document.querySelector(".popup");
  const popupContent = document.querySelector(".popup-content_add");

  popup.classList.toggle("popup_opened");
  popupContent.classList.toggle("popup-content_opened");
}

const gallery = document.querySelector(".gallery");
const addForm = document.querySelector(".form_add");
addForm.addEventListener("submit", handleProfileAddFormSubmit);

function handleProfileAddFormSubmit(evt) {
  evt.preventDefault();

  const title = document.querySelector(".form__input_el_title");
  const url = document.querySelector(".form__input_el_url");

  addCard(title.value, url.value);
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

const likeBtn = document.querySelector(".gallery__like-btn");
likeBtn.addEventListener("click", toggleLike);

function toggleLike() {
  if (likeBtn.classList.contains("gallery__like-btn_active")) {
    likeBtn.src = " ../images/like.svg";
  } else {
    likeBtn.src = " ../images/like-active.svg";
  }

  likeBtn.classList.toggle("gallery__like-btn_active");
}
