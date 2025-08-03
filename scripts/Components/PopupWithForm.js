import Popup from "./Popup.js";
import { BASE_URL, TOKEN } from "../../env.js";

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
      e.stopPropagation();
      e.stopImmediatePropagation();

      const formDetails = this._getInputValues();
      this._handleSubmit(formDetails);
      this.close();
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}
