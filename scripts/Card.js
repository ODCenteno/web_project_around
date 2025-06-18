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

    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.src = this._imageUrl;
    cardImage.alt = this._imageAlt ?? this._title;

    const cardLikeIcon = this._cardElement.querySelector(".card__like-icon");
    cardLikeIcon.src = this._iconUrl ?? "./images/heart.svg";
    cardLikeIcon.alt = "like icon";
    cardLikeIcon.dataset.isLiked = this._isLiked;

    const cardDeleteIcon = this._cardElement.querySelector(".card__delete-icon");
    cardDeleteIcon.src = "./images/delete.svg";
    cardDeleteIcon.alt = "Delete icon";
    cardDeleteIcon.dataset.isLiked = this._isLiked;
  }

  createCard() {
    this._getCardFromTemplate();
    this._setCardInformation();
    return this._cardElement;
  }
}

export default Card;
