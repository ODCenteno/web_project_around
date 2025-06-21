import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { articlesContent, config, updateDetails, toggleModal, controlProfileForm, manageModals, manageCardController } from "./utils.js";

function controlAddPlaceForm(e) {
  e.preventDefault();

  config.placeDetails.title = config.placeInputTitle.value;
  config.placeDetails.imageSrc = config.formInputSource.value;

  config.articlesSection.prepend(new Card(config.placeDetails).create());
  toggleModal(config.addPlacePopup);
}

articlesContent.forEach((article) => {
  config.articlesSection.prepend(new Card(article).create());
});

(function validateForms() {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => new FormValidator(form, config).enableValidations());
})();

(function setPageEventListeners() {
  window.addEventListener("load", updateDetails);
  config.articlesSection.addEventListener("click", manageCardController);
  document.addEventListener("click", manageModals);
  config.profileForm.addEventListener("submit", controlProfileForm);
  config.addPlaceForm.addEventListener("submit", controlAddPlaceForm);
  config.popups.forEach((popup) => {
    popup.addEventListener("click", (e) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
      manageModals(e, popup);
    });
  });
})();
