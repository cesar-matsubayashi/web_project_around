function openPopupForm(popupSelector) {
  const popupContent = document.querySelector(popupSelector);

  popup.classList.add("popup_is-opened");
  popupContent.classList.add("popup-form_is-opened");
  popupContent.querySelector(".form").reset();
}

function closePopupForm(popupSelector) {
  const popupContent = document.querySelector(popupSelector);

  popup.classList.remove("popup_is-opened");
  popupContent.classList.remove("popup-form_is-opened");
}

const popup = document.querySelector(".popup");
popup.addEventListener("click", () => {
  closePopupForm(".popup-form_edit");
  closePopupForm(".popup-form_add");
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closePopupForm(".popup-form_edit");
    closePopupForm(".popup-form_add");
  }
});

const editBtn = document.querySelector(".profile__edit-btn");
editBtn.addEventListener("click", () => {
  openPopupForm(".popup-form_edit");

  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");

  const formInput = document.forms.edit.elements;
  const name = formInput["name"];
  const description = formInput["description"];

  name.value = profileName.textContent.trim();
  description.value = profileDescription.textContent;
});

const editCloseBtn = document.querySelector(".popup-form__close-icon_edit");
editCloseBtn.addEventListener("click", () => {
  closePopupForm(".popup-form_edit");
});

document.forms.edit.addEventListener("submit", handleProfileEditFormSubmit);
function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();

  const formInput = document.forms.edit.elements;
  const nameInput = formInput["name"];
  const descriptionInput = formInput["description"];

  const profileName = document.querySelector(".profile__name");
  const profileDescription = document.querySelector(".profile__description");

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopupForm(".popup-form_edit");
}

const addBtn = document.querySelector(".profile__add-btn");
addBtn.addEventListener("click", () => {
  openPopupForm(".popup-form_add");
});

const addCloseBtn = document.querySelector(".popup-form__close-icon_add");
addCloseBtn.addEventListener("click", () => {
  closePopupForm(".popup-form_add");
});

document.forms.add.addEventListener("submit", handleProfileEditFormSubmit);
function handleProfileAddFormSubmit(evt) {
  evt.preventDefault();

  const formInput = document.forms.add.elements;
  const title = formInput["title"];
  const url = formInput["url"];

  const card = new Card(title.value, url.value, "#card-template");
  const cardElement = card.generateCard();

  gallery.prepend(cardElement);
  closePopupForm(".popup-form_add");
}
