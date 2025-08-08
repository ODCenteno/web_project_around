import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._submitButtonElmt = document.querySelector(".popup__button-submit");
    this._handleSubmit = handleSubmit;
  }

  _getInputValues() {
    this._inputList = Array.from(this._form.querySelectorAll("input"));
    this._formDetails = {};

    this._inputList.forEach((input) => {
      this._formDetails[input.name] = input.value;
    });

    return this._formDetails;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      const formDetails = this._getInputValues();
      this._submitButtonElmt.textContent = "Guardando...";
      this._handleSubmit(formDetails);
      this.close();
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}
