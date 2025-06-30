import { config } from "../data.js";

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(this._popupSelector);
    this._popupCloseButton = this._popup.querySelector(config.popupCloseButtonSelector);
  }

  open() {
    this._popup.classList.remove(config.popupIsHiddenClass);
    this._popup.classList.add(config.popupIsVisibleClass);
    this.setEventListeners();
  }

  close() {
    this._popup.classList.add(config.popupIsHiddenClass);
    this._popup.classList.remove(config.popupIsVisibleClass);
  }

  _handleEscClose(e) {
    console.log(e.key);
    const isEscapeKey = e.key === "Escape";
    const isActivePopup = this._popup.classList.contains("popup-active");
    // TODO: Check Escape execution, currently only in input
    if (isEscapeKey && isActivePopup) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("keydown", (e) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
      this._handleEscClose(e);
    });
    this._popupCloseButton.addEventListener("click", (e) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
      this.close();
    });
    this._popupCloseButton.addEventListener("click", (e) => {
      const isModal = this._popup === e.target;
      if (isModal) this.close();
    });
  }
}
