import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleDelete) {
    super(popupSelector);
    this._button = this._popup.querySelector("#popup-delete-place-close");
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._button.addEventListener("click", (e) => {
      e.preventDefault();

      this._handleDelete(this._cardToDelete);
    });
  }

  open(cardId, cardClicked) {
    super.open();
    this._cardId = cardId;
    this._cardToDelete = cardClicked;
  }

  getCardId() {
    return this._cardId;
  }
}
