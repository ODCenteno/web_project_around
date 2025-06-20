class FormValidator {
  constructor(config) {
    this._config = config;
  }

  _showInputError(input, form) {
    const errorElement = form.querySelector(`#${input.id}-error`);

    input.classList.add(this._config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(input, form) {
    const errorElement = form.querySelector(`#${input.id}-error`);

    input.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  _toggleErrorDisplay(input, form) {
    console.log(input.validity.valid);
    if (!input.validity.valid) {
      this._showInputError(input, form);
    } else {
      this._hideInputError(input, form);
    }
  }

  _checkInputListValidity(inputList) {
    return inputList.every((input) => input.validity.valid);
  }

  _toggleSubmitBtnState(inputList, submitButton) {
    const areValidInputs = this._checkInputListValidity(inputList);

    submitButton.disabled = !areValidInputs;
  }

  _getInputs(form) {
    return Array.from(form.querySelectorAll(this._config.inputSelector));
    console.log("INPUTS: ", inputList);
  }

  _setEventListeners(form, inputList, submitButton) {
    inputList.forEach((input) => {
      input.addEventListener("input", (e) => {
        e.stopPropagation();
        e.stopImmediatePropagation();

        this._toggleErrorDisplay(input, form);
        this._toggleSubmitBtnState(inputList, submitButton);
      });
    });
  }

  _getForms() {
    return Array.from(document.querySelectorAll(this._config.formSelector));
  }

  enableValidation() {
    const forms = this._getForms();

    forms.forEach((form) => {
      const inputList = this._getInputs(form);
      const submitButton = form.querySelector(this._config.submitButtonSelector);
      submitButton.disabled = true;

      this._setEventListeners(form, inputList, submitButton);
    });
  }
}

export default FormValidator;
