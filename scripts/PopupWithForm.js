import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
  }

  _getInputValues() {}

  setEventListeners() {
    super();
    // debe agregar al formulario un controlador de eventos submit y el detector de eventos click en el icono para cerrar.
  }

  close() {
    super();
    // limpia el formulario.
  }
}
