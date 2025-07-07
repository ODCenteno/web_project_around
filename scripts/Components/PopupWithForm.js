import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
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
      this._handleSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}
