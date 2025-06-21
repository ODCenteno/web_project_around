import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { articlesContent, config } from "./data.js";
import { updateDetails, toggleModal, controlProfileForm, manageModals, manageCardController } from "./utils.js";

// TODO: En cada método,debes referirte al campo de la clase, y no pasarlo a cada método, como se implementó anteriormente

// TODO: Investigar el Reset() de AddPlace Form

function controlAddPlaceForm(e) {
  e.preventDefault();
  const placeDetails = {};
  placeDetails.title = config.placeInputTitle.value;
  placeDetails.imageSrc = config.formInputSource.value;

  config.articlesSection.prepend(new Card(placeDetails).create());
  toggleModal(config.addPlacePopup);
}

function setPageEventListeners() {
  window.addEventListener("load", updateDetails);
  config.articlesSection.addEventListener("click", manageCardController);
  document.addEventListener("click", manageModals);
  config.profileForm.addEventListener("submit", controlProfileForm);
  config.addPlaceForm.addEventListener("submit", controlAddPlaceForm);
}

(function () {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => new FormValidator(form).enableValidations());
})();

articlesContent.forEach((article) => {
  config.articlesSection.prepend(new Card(article).create());
});

setPageEventListeners();

config.popups.forEach((aside) => {
  aside.addEventListener("click", (e) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    manageModals(e, aside);
  });
});

// new FormValidator(config).enableValidations();
