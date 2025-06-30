import Card from "./Components/Card.js";
import FormValidator from "./Components/FormValidator.js";
import Section from "./Components/Section.js";
import { articlesContent, config } from "./data.js";
import { updateDetails, toggleModal, controlProfileForm, manageModals } from "./utils.js";

function controlAddPlaceForm(e) {
  e.preventDefault();

  config.placeDetails.title = config.placeInputTitle.value;
  config.placeDetails.imageSrc = config.formInputSource.value;

  config.articlesSection.prepend(new Card(config.placeDetails).create());
  toggleModal(config.addPlacePopup);
}

const cardsSection = new Section(
  {
    items: articlesContent,
    renderer: (item) => {
      const card = new Card(item).create();
      cardsSection.add(card);
    },
  },
  config.cardsSectionSelector
);

cardsSection.renderItems();

(function validateForms() {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => new FormValidator(form, config).enableValidations());
})();

(function setPageEventListeners() {
  window.addEventListener("load", updateDetails);
  // config.articlesSection.addEventListener("click", manageCardController);
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

// TODO: crear instancia de cada popup
