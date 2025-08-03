class Card {
  constructor({ article, handleCardClick }, templateSelector) {
    this._title = article.name || article.title;
    this._imageUrl = article.link;
    this._imageAlt = `Image name: ${article.name}`;
    this._iconUrl = article.iconUrl || "../images/heart.svg";
    this._likedIconUrl = article.likedIconUrl || "../images/heart-liked.svg";
    this._isLiked = article.isLiked || false;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector || "#card-template";
    this._id = article._id;
    this._owner = article.owner;
    this._cretedAt = article.createdAt;
  }

  _getCardFromTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  }

  _setCardInformation() {
    this._cardElement.querySelector(".card__place-title").textContent = this._title;

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._imageUrl;
    this._cardImage.alt = this._imageAlt ?? this._title;
    this._cardImage.title = this._title;

    const cardLikeIcon = this._cardElement.querySelector(".card__like-icon");
    cardLikeIcon.src = this._iconUrl ?? "./images/heart.svg";
    cardLikeIcon.alt = "like icon";
    cardLikeIcon.dataset.isLiked = this._isLiked;
    cardLikeIcon.title = "Da click para marcarla o desmarcar como favorita";

    const cardDeleteIcon = this._cardElement.querySelector(".card__delete-icon");
    cardDeleteIcon.src = "./images/delete.svg";
    cardDeleteIcon.alt = "Delete icon";
    cardDeleteIcon.dataset.isLiked = this._isLiked;
    cardDeleteIcon.title = "Da click para eliminar esta tarjeta";
  }

  _defineImageOrientation() {
    this._cardImage.onload = () => {
      this._imgOrientation = this._cardImage.naturalWidth > this._cardImage.naturalHeight ? "horizontal" : "vertical";
      this._cardImage.dataset.orientation = this._imgOrientation;
    };
  }

  _setEventListeners() {
    this._cardElement.addEventListener("click", (e) => {
      const pointClicked = e.target;
      this._handleCardClick(pointClicked);
    });
  }

  create() {
    this._getCardFromTemplate();
    this._setCardInformation();
    this._defineImageOrientation();
    this._setEventListeners();
    return this._cardElement;
  }
}

export default Card;
