import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = this._popup.querySelector("#zoom-img");
    this._figCaption = this._popup.querySelector(".popup__figcaption");
  }

  _defineImageOrientationProps(pointClicked) {
    this._picContainer = this._popup.querySelector(".popup__zoom-container");

    const isHorizontal = pointClicked.dataset.orientation === "horizontal";
    const isVertical = pointClicked.dataset.orientation === "vertical";
    const isLargeScroll = document.documentElement.scrollWidth > 900;
    const isSmallHeight = window.screen.availHeight <= 800;

    if (isHorizontal && isLargeScroll) {
      this._picContainer.style.width = "816px";
      this._picContainer.style.height = "auto";
    } else if (isVertical && isSmallHeight) {
      this._picContainer.style.width = "262px";
    } else if (isVertical && isLargeScroll) {
      this._picContainer.style.width = "433px";
    }
  }

  open(pointClicked) {
    this._defineImageOrientationProps(pointClicked);
    this._img.alt = pointClicked.alt;
    this._img.title = pointClicked.title;
    this._img.src = pointClicked.src;
    this._figCaption.textContent = pointClicked.title;
    super.open();
  }
}
