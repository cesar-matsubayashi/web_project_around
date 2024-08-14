export default class Card {
  constructor(
    { data, user, handleCardClick, handleDeleteClick, handleLikeClick },
    cardSelector
  ) {
    this._title = data.name;
    this._imageUrl = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._createdAt = data.createdAt;
    this._owner = data.owner;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._user = user;
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

    console.log(this._user);
    if (this._user.id !== this._owner._id) {
      this._card.querySelector(".gallery__trash").remove();
    }

    this._setEventListeners();

    this._card.id = this._id;
    this._card.querySelector(".gallery__photo").src = this._imageUrl;
    this._card.querySelector(".gallery__photo").alt = `Imagem ${this._title}`;
    this._card.querySelector(".gallery__title").textContent = this._title;

    this._card.querySelector(".gallery__like-count").textContent =
      this._likes.length;

    this._setLikeIcon();

    return this._card;
  }

  _setLikeIcon() {
    const like = this._card.querySelector(".gallery__like-btn");
    const likeInactiveImage = new URL("../images/like.svg", import.meta.url);
    const likeActiveImage = new URL(
      "../images/like-active.svg",
      import.meta.url
    );

    if (this.isUserLiked()) {
      like.src = likeActiveImage;
      like.classList.add("gallery__like-btn_active");
    } else {
      like.src = likeInactiveImage;
      like.classList.remove("gallery__like-btn_active");
    }
  }

  isUserLiked() {
    return this._likes.some((user) => user._id === this._user.id);
  }

  like(likes) {
    const likeCount = this._card.querySelector(".gallery__like-count");
    likeCount.textContent = likes.length;
    this._likes = likes;
    this._setLikeIcon();
  }

  _setEventListeners() {
    if (!this._card.querySelector(".gallery__trash")) {
      this._card
        .querySelector(".gallery__trash")
        .addEventListener("click", (evt) => {
          this._handleDeleteClick(this._card._id);
        });
    }

    this._card
      .querySelector(".gallery__like-btn")
      .addEventListener("click", (evt) => {
        this._handleLikeClick(evt.currentTarget.offsetParent.id);
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
}
