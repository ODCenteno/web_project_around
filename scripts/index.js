import Card from "./Components/Card.js";
import FormValidator from "./Components/FormValidator.js";
import PopupWithImage from "./Components/PopupWithImage.js";
import PopupWithForm from "./Components/PopupWithForm.js";
import Section from "./Components/Section.js";
import UserInfo from "./Components/UserInfo.js";
import { articlesContent, config } from "./data.js";
import { manageCardController } from "./utils.js";

const User = new UserInfo({ nameSelector: config.userNameSelector, descriptionSelector: config.userJobDescriptionSelector });

const PopImge = new PopupWithImage(config.imgPopupSelector);

const UserForm = new PopupWithForm(config.popupProfileSelector, (formDetails) => {
  User.setUserInfo(formDetails);
});

const PlaceForm = new PopupWithForm(config.popupPlaceSelector, (formDetails) => {
  controlAddPlaceForm(formDetails);
});

function createCard(item, imgPopupInstance) {
  const card = new Card(
    {
      article: item,
      handleCardClick: (pointClicked) => {
        const isImageClicked = manageCardController(pointClicked);
        if (isImageClicked) imgPopupInstance.open(pointClicked);
      },
    },
    config.cardTemplateSelector
  );

  return card.create();
}

const cardsSection = new Section(
  {
    items: articlesContent,
    renderer: (item) => {
      return createCard(item, PopImge);
    },
  },
  config.cardsSectionSelector
);
cardsSection.renderItems();

const controlAddPlaceForm = (formDetails) => {
  const newCardElement = createCard(formDetails, PopImge);
  cardsSection.addItem(newCardElement);
};

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
  window.addEventListener("load", () => {
    User.setUserInfo();
  });
})();
