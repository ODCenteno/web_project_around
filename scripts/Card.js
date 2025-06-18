class Card {
  constructor(article) {
    this._title = article.title;
    this._imageUrl = article.imageUrl;
    this._imageAlt = article.imageAlt;
    this._iconUrl = article.iconUrl;
    this._likedIconUrl = article.likedIconUrl;
    this._isLiked = article.isLiked;
  }

  _getCardFromTemplate() {
    const cardTemplate = document.querySelector("#card-template").content;
    this._cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  }

  _setCardInformation() {
    const cardTitle = this._cardElement.querySelector(".card__place-title");
    cardTitle.textContent = this._title;

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this._imageUrl;
    this._cardImage.alt = this._imageAlt ?? this._title;

    const cardLikeIcon = this._cardElement.querySelector(".card__like-icon");
    cardLikeIcon.src = this._iconUrl ?? "./images/heart.svg";
    cardLikeIcon.alt = "like icon";
    cardLikeIcon.dataset.isLiked = this._isLiked;

    const cardDeleteIcon = this._cardElement.querySelector(".card__delete-icon");
    cardDeleteIcon.src = "./images/delete.svg";
    cardDeleteIcon.alt = "Delete icon";
    cardDeleteIcon.dataset.isLiked = this._isLiked;
  }

  _defineImageOrientation() {
    this._cardImage.onload = () => {
      this._imgOrientation = this._cardImage.naturalWidth > this._cardImage.naturalHeight ? "horizontal" : "vertical";
      this._cardImage.dataset.orientation = this._imgOrientation;
      console.log(this._imgOrientation);
    };
  }

  create() {
    this._getCardFromTemplate();
    this._setCardInformation();
    this._defineImageOrientation();
    return this._cardElement;
  }
}

export default Card;
