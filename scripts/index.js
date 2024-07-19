const editBtn = document.querySelector(".profile__edit-btn");
const editCloseBtn = document.querySelector(".popup-content__close-icon_edit");

const addBtn = document.querySelector(".profile__add-btn");
const addCloseBtn = document.querySelector(".popup-content__close-icon_add");

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

function toggleAddPopup() {
  const popup = document.querySelector(".popup");
  const popupContent = document.querySelector(".popup-content_add");

  popup.classList.toggle("popup_opened");
  popupContent.classList.toggle("popup-content_opened");
}

editBtn.addEventListener("click", toggleEditPopup);
editCloseBtn.addEventListener("click", toggleEditPopup);

addBtn.addEventListener("click", toggleAddPopup);
addCloseBtn.addEventListener("click", toggleAddPopup);

const form = document.querySelector(".form");

function handleProfileFormSubmit(evt) {
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

form.addEventListener("submit", handleProfileFormSubmit);
