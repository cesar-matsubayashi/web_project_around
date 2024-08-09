export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._title = data.name;
    this._imageUrl = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._createdAt = data.createdAt;
    this._owner = data.owner;
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
    this._card.querySelector(".gallery__like-count").textContent =
      this._likes.length;

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
  }

  _handleDelete() {
    this._card.remove();
  }

  _handleLike() {
    const likeImage = new URL("../images/like.svg", import.meta.url);
    const likeActiveImage = new URL(
      "../images/like-active.svg",
      import.meta.url
    );
    const like = this._card.querySelector(".gallery__like-btn");
    like.src = like.classList.contains("gallery__like-btn_active")
      ? likeImage
      : likeActiveImage;

    like.classList.toggle("gallery__like-btn_active");
  }
}
