"use strict";

import API from "./Components/API.js";
import Card from "./Components/Card.js";
import FormValidator from "./Components/FormValidator.js";
import PopupWithImage from "./Components/PopupWithImage.js";
import PopupWithForm from "./Components/PopupWithForm.js";
import PopupWithConfirmation from "./Components/PopupWithConfirmation.js";
import Section from "./Components/Section.js";
import UserInfo from "./Components/UserInfo.js";
import { config } from "./data.js";
import { manageCardController } from "./utils.js";

const PopImge = new PopupWithImage(config.imgPopupSelector);

const PopupDeleteConfirmation = new PopupWithConfirmation(config.confirmPopupSelector, (cardToDelete) => {
  const cardId = PopupDeleteConfirmation.getCardId();
  API.deleteCard(cardId).then((res) => {
    cardToDelete.parentElement.remove();
    console.log(res);
  });
  PopupDeleteConfirmation.close();
});

const User = new UserInfo({ nameSelector: config.userNameSelector, descriptionSelector: config.userJobDescriptionSelector, avatarSelector: config.avatarSelector });

const UserForm = new PopupWithForm(config.popupProfileSelector, (formDetails) => {
  User.setUserInfo(formDetails);
});

const PlaceForm = new PopupWithForm(config.popupPlaceSelector, (formDetails) => {
  controlAddPlaceForm(formDetails);
});

const avatarForm = new PopupWithForm(config.avatarPopupSelector, (avatarLink) => {
  API.saveAvatar({
    avatar: avatarLink.link,
  }).then((userDetails) => {
    User.updateAvatar(userDetails);
  });
});

function createCard(item, imgPopupInstance) {
  const card = new Card(
    {
      article: item,
      handleCardClick: (pointClicked, cardId) => {
        const isImageClicked = manageCardController(pointClicked, PopupDeleteConfirmation, cardId);
        if (isImageClicked) imgPopupInstance.open(pointClicked);
      },
    },
    config.cardTemplateSelector
  );

  return card.create();
}

const renderedCards = API.getCards()
  .then((cardsData) => {
    const cardsSection = new Section(
      {
        items: cardsData,
        renderer: (item) => {
          return createCard(item, PopImge);
        },
      },
      config.cardsSectionSelector
    );

    cardsSection.renderItems();
    return cardsSection;
  })
  .catch((error) => {
    console.error("Cards loading error: ", error);
  });

const controlAddPlaceForm = (formDetails) => {
  API.postNewCard({ name: formDetails.title, link: formDetails.link }).then((newCard) => {
    const newCardElement = createCard(newCard, PopImge);
    renderedCards.then((section) => section.addItem(newCardElement));
  });
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
    const avatarElement = document.querySelector(config.avatarSelector);
    avatarElement.addEventListener("click", () => avatarForm.open());
  });
})();
