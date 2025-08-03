"use strict";

import Card from "./Components/Card.js";
import FormValidator from "./Components/FormValidator.js";
import PopupWithImage from "./Components/PopupWithImage.js";
import PopupWithForm from "./Components/PopupWithForm.js";
import Section from "./Components/Section.js";
import UserInfo from "./Components/UserInfo.js";
import { articlesContent, config } from "./data.js";
import { manageCardController } from "./utils.js";
import { TOKEN, BASE_URL } from "../env.js";

const PopImge = new PopupWithImage(config.imgPopupSelector);

const User = new UserInfo({ nameSelector: config.userNameSelector, descriptionSelector: config.userJobDescriptionSelector, avatarSelector: config.avatarSelector });

const UserForm = new PopupWithForm(config.popupProfileSelector, (formDetails) => {
  User.setUserInfo(formDetails);
});

const PlaceForm = new PopupWithForm(config.popupPlaceSelector, (formDetails) => {
  controlAddPlaceForm(formDetails);
});

function postNewCard(serverURL, TOKEN, body) {
  return fetch(`${serverURL}cards/`, {
    method: "POST",
    headers: {
      authorization: TOKEN,
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
  });
}

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

const renderedCards = fetchCards(BASE_URL, TOKEN)
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

function fetchCards(serverURL, TOKEN) {
  return fetch(`${serverURL}cards/`, {
    headers: {
      authorization: TOKEN,
    },
  }).then((res) => {
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
  });
}

const postCardAPI = (serverURL, TOKEN, placeContent) => {
  return fetch(`${serverURL}cards/`, {
    method: "POST",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(placeContent),
  }).then((res) => {
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
  });
};

const controlAddPlaceForm = (formDetails) => {
  postCardAPI(BASE_URL, TOKEN, { name: formDetails.title, link: formDetails.link });

  const newCardElement = createCard(formDetails, PopImge);
  renderedCards.then((section) => section.addItem(newCardElement));
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

// const getCardsFromServer = () => {
//   fetch(`${BASE_URL}cards/`).then; //
//   // lista de objetos con la información de las tarjetas
// };

// const borrarTarjeta = (cardId) => {
//   fetch(`${BASE_URL}cards/${cardId}`, {
//     method: "DELETE",
//   });
// };

// function deleteAll() {
//   // const listaIDs = () => {
//   //   return getCardsFromServer().map((card) => card._id);
//   // };
//   listaIDs.forEach((cardId) => borrarTarjeta(cardId));
// }

// addEventListener("click", () => {
//   borrarTarjeta(id);
// });
