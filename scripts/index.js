import Card from "./Components/Card.js";
import FormValidator from "./Components/FormValidator.js";
import PopupWithImage from "./Components/PopupWithImage.js";
import PopupWithForm from "./Components/PopupWithForm.js";
import Section from "./Components/Section.js";
import { articlesContent, config } from "./data.js";
import { updateDetails, controlProfileForm, manageCardController } from "./utils.js";

const cardsSection = new Section(
  {
    items: articlesContent,
    renderer: (item) => {
      const card = new Card(
        {
          article: item,
          handleCardClick: (pointClicked) => {
            const isImageClicked = manageCardController(pointClicked);
            isImageClicked ? PopImge.open(pointClicked) : "";
          },
        },
        config.cardTemplateSelector
      ).create();
      return card;
    },
  },
  config.cardsSectionSelector
);
cardsSection.renderItems();

const controlAddPlaceForm = (formDetails) => {
  cardsSection.addItem(
    new Card(
      {
        article: formDetails,
        handleCardClick: (pointClicked) => {
          const isImageClicked = manageCardController(pointClicked);
          isImageClicked ? PopImge.open(pointClicked) : "";
        },
      },
      config.cardTemplateSelector
    ).create()
  );
};

const PopImge = new PopupWithImage(config.imgPopupSelector);
const UserForm = new PopupWithForm(config.popupProfileSelector, (formDetails) => {
  controlProfileForm(formDetails);
});
const PlaceForm = new PopupWithForm(config.popupPlaceSelector, (formDetails) => {
  controlAddPlaceForm(formDetails);
});

config.editProfileBtnElement.addEventListener("click", () => {
  UserForm.open();
});
config.addNewPlaceBtn.addEventListener("click", () => {
  PlaceForm.open();
});

(function validateForms() {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => new FormValidator(form, config).enableValidations());
})();

(function setPageEventListeners() {
  window.addEventListener("load", updateDetails);
})();
