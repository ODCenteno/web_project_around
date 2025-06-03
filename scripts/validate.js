const showInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
};

const toggleErrorDisplay = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const checkInputListValidity = (formElement, config) => {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  return inputs.every((input) => input.validity.valid);
};

const toggleSubmitBtnState = (formElement, submitButton, config) => {
  const areValidInputs = checkInputListValidity(formElement, config);

  if (areValidInputs) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  submitButton.disabled = true;
  toggleSubmitBtnState(formElement, submitButton, config);

  inputList.forEach((input) => {
    input.addEventListener("input", (e) => {
      e.stopPropagation();
      e.stopImmediatePropagation();

      toggleErrorDisplay(formElement, input, config);
      toggleSubmitBtnState(formElement, submitButton, config);
    });
  });
};

export const enableValidations = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(form, config);
  });
};
