const editBtn = document.querySelector(".profile__edit-btn");
const closeBtn = document.querySelector(".popup-content__close-icon");

function toggleEditPopup() {
  const popup = document.querySelector(".popup");
  const popupContent = document.querySelector(".popup-content");

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

editBtn.addEventListener("click", toggleEditPopup);
closeBtn.addEventListener("click", toggleEditPopup);

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
