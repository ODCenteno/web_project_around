import { config } from "../data.js";

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector(config.popupCloseButtonSelector);
    this._setEventListeners();
  }

  open() {
    this._popup.classList.remove(config.popupIsHiddenClass);
    this._popup.classList.add(config.popupIsVisibleClass);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove(config.popupIsVisibleClass);
    this._popup.classList.add(config.popupIsHiddenClass);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (e) => {
    const isEscapeKey = e.key === "Escape";
    if (isEscapeKey) {
      this.close();
    }
  };

  _setEventListeners = () => {
    this._popupCloseButton.addEventListener("click", (e) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
      this.close();
    });
    this._popup.addEventListener("click", (e) => {
      const isModal = this._popup === e.target;
      if (isModal) this.close();
    });
  };
}
