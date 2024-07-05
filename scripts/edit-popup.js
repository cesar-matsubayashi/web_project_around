let editBtn = document.querySelector(".profile__edit-btn");
let closeBtn = document.querySelector(".popup-content__close-icon");

function toggleEditPopup() {
  let popup = document.querySelector(".popup");
  let popupContent = document.querySelector(".popup-content");

  popup.classList.toggle("popup_opened");
  popupContent.classList.toggle("popup-content_opened");

  if (popup.classList.contains("popup")) {
    let profileName = document.querySelector(".profile__name");
    let profileDescription = document.querySelector(".profile__description");

    let name = popupContent.querySelector(".form__input_el_name");
    let description = popupContent.querySelector(".form__input_el_description");

    name.value = profileName.textContent.trim();
    description.value = profileDescription.textContent;
  }
}

editBtn.addEventListener("click", toggleEditPopup);
closeBtn.addEventListener("click", toggleEditPopup);

let form = document.querySelector(".form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector(".form__input_el_name");
  let descriptionInput = document.querySelector(".form__input_el_description");

  let profileName = document.querySelector(".profile__name");
  let profileDescription = document.querySelector(".profile__description");

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  toggleEditPopup();
}

form.addEventListener("submit", handleProfileFormSubmit);
