const popup = document.querySelector(".popup");
const imagePopup = document.querySelector(".popup-image");
// const imagePopupClose = document.querySelector(".popup-image__close-icon");

export class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._title = data.name;
    this._imageUrl = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector(".gallery__photo").src = this._imageUrl;
    this._card.querySelector(".gallery__photo").alt = `Imagem ${this._title}`;
    this._card.querySelector(".gallery__title").textContent = this._title;

    return this._card;
  }

  _setEventListeners() {
    this._card
      .querySelector(".gallery__trash")
      .addEventListener("click", (evt) => {
        this._handleDelete();
      });

    this._card
      .querySelector(".gallery__like-btn")
      .addEventListener("click", (evt) => {
        this._handleLike();
      });

    this._card
      .querySelector(".gallery__photo")
      .addEventListener("click", (evt) => {
        this._handleCardClick(this);
      });

    // imagePopupClose.addEventListener("click", (evt) => {
    //   this._handleClosePopup();
    // });

    // popup.addEventListener("click", (evt) => {
    //   this._handleClosePopup();
    // });

    // document.addEventListener("keydown", (evt) => {
    //   if (evt.key === "Escape") {
    //     this._handleClosePopup();
    //   }
    // });
  }

  _handleDelete() {
    this._card.remove();
  }

  _handleLike() {
    const like = this._card.querySelector(".gallery__like-btn");
    like.src = like.classList.contains("gallery__like-btn_active")
      ? " ../images/like.svg"
      : " ../images/like-active.svg";

    like.classList.toggle("gallery__like-btn_active");
  }

  _handleOpenPopup() {
    imagePopup.querySelector(".popup-image__photo").src = this._imageUrl;
    imagePopup.querySelector(
      ".popup-image__photo"
    ).alt = `Imagem ${this._title}`;
    imagePopup.querySelector(".popup-image__title").textContent = this._title;

    popup.classList.add("popup_is-opened");
    imagePopup.classList.add("popup-image_is-opened");
  }

  _handleClosePopup() {
    popup.classList.remove("popup_is-opened");
    imagePopup.classList.remove("popup-image_is-opened");

    imagePopup.querySelector(".popup-image__photo").src = "";
    imagePopup.querySelector(".popup-image__photo").alt = "";
    imagePopup.querySelector(".popup-image__title").textContent = "";
  }
}
