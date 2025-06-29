export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {}

  close() {}

  _handleEscClose() {}

  // agrega un detector de eventos de click al icono para cerrar el popup. La ventana modal también debe cerrarse cuando los usuarios hacen clic en el área sombreada del formulario.
  setEventListeners() {}
}
