class FormValidator {
  constructor(config) {
    this._config = config;
  }

  _showInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  _toggleErrorDisplay(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _checkInputListValidity(formElement) {
    const inputs = Array.from(formElement.querySelectorAll(this._config.inputSelector));
    return inputs.every((input) => input.validity.valid);
  }

  _toggleSubmitBtnState(formElement, submitButton) {
    const areValidInputs = this._checkInputListValidity(formElement, this._config);

    if (areValidInputs) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._config.inputSelector));
    const submitButton = formElement.querySelector(this._config.submitButtonSelector);
    submitButton.disabled = true;
    this._toggleSubmitBtnState(formElement, submitButton);

    inputList.forEach((input) => {
      input.addEventListener("input", (e) => {
        e.stopPropagation();
        e.stopImmediatePropagation();

        this._toggleErrorDisplay(formElement, input);
        this._toggleSubmitBtnState(formElement, submitButton);
      });
    });
  }

  _getForms() {
    this._formList = Array.from(document.querySelectorAll(this._config.formSelector));
    console.log("Form list: ", this._formList);
  }

  enableValidations() {
    this._getForms();
    this._formList.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      this._setEventListeners(form);
    });
  }
}

export default FormValidator;
