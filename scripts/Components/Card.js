class Card {
  // TODO: Conecta la clase Card al popup
  // TODO: Hace que Card lleve la función handleCardClick() al constructor.
  // TODO Cuando el usuario haga clic en la tarjeta, esta función abrirá el popup con una imagen.
  constructor(article, templateSelector) {
    this._title = article.title;
    this._imageUrl = article.imageUrl || article.imageSrc;
    this._imageAlt = article.imageAlt || article.title;
    this._iconUrl = article.iconUrl || "../images/heart.svg";
    this._likedIconUrl = article.likedIconUrl || "../images/heart-liked.svg";
    this._isLiked = article.isLiked || false;
    this._templateSelector = templateSelector || "#card-template";
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
      this._cardEvent = e;
      e.stopPropagation();
      e.stopImmediatePropagation();
      this._manageCardController(this._cardEvent);
    });
  }

  _manageCardController(e) {
    const pointClicked = e.target;

    console.log(`Target: ${e.target}`);
    console.log(`Current Target: ${e.currenTarget}`);

    const isImageClicked = pointClicked.classList[0].includes("image");
    const isLikeIconClicked = pointClicked.classList[0].includes("like");
    const isLiked = "true" === pointClicked.getAttribute("data-isliked");
    const isDeleteIcon = pointClicked.classList[0].includes("delete");

    if (isLikeIconClicked && isLiked) {
      pointClicked.src = "./images/heart.svg";
      pointClicked.setAttribute("data-isLiked", "false");
    } else {
      pointClicked.src = "./images/heart-liked.svg";
      pointClicked.setAttribute("data-isLiked", "true");
    }
    if (isDeleteIcon) {
      pointClicked.parentElement.remove();
    }
    if (isImageClicked) {
      const picContainer = document.querySelector(".popup__zoom-container");

      const isHorizontal = pointClicked.dataset.orientation === "horizontal";
      const isVertical = pointClicked.dataset.orientation === "vertical";
      const isLargeScroll = document.documentElement.scrollWidth > 900;
      const isSmallHeight = window.screen.availHeight <= 800;

      if (isHorizontal && isLargeScroll) {
        picContainer.style.width = "816px";
        picContainer.style.height = "auto";
      } else if (isVertical && isSmallHeight) {
        picContainer.style.width = "262px";
      } else if (isVertical && isLargeScroll) {
        picContainer.style.width = "433px";
      }
      openImgPopup(pointClicked.src, pointClicked.alt);
    }
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
