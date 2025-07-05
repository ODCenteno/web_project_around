import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    console.log(this._form);
    this._handleSubmit = handleSubmit;
  }

  _getInputValues() {}

  _setEventListeners = () => {
    // debe agregar al formulario un controlador de eventos submit
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      console.log(e.target);
      this._handleSubmit(e);
    });
    super._setEventListeners();
  };

  close() {
    // limpia el formulario.
    this._form.reset();
    super.close();
  }
}
