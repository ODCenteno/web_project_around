import Card from "./Components/Card.js";
import FormValidator from "./Components/FormValidator.js";
import PopupWithImage from "./Components/PopupWithImage.js";
import PopupWithForm from "./Components/PopupWithForm.js";
import Section from "./Components/Section.js";
import { articlesContent, config } from "./data.js";
import { updateDetails, controlProfileForm, manageCardController } from "./utils.js";

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
      const card = new Card({
        article: item,
        handleCardClick: (evt) => {
          manageCardController(evt, PopImge);
        },
      }).create();
      cardsSection.addItem(card);
    },
  },
  config.cardsSectionSelector
);
cardsSection.renderItems();

const PopImge = new PopupWithImage(config.imgPopupSelector);
const UserForm = new PopupWithForm(config.popupProfileSelector, (e) => {
  controlProfileForm(e);
});

config.editProfileBtnElement.addEventListener("click", () => {
  UserForm.open();
});

(function validateForms() {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => new FormValidator(form, config).enableValidations());
})();

(function setPageEventListeners() {
  window.addEventListener("load", updateDetails);
  //document.addEventListener("click", manageModals);
  config.addPlaceForm.addEventListener("submit", controlAddPlaceForm);
})();
