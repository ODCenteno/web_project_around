import { articlesContent, config } from "./data.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const profilePopup = document.querySelector("#edit-profile-popup");
const editProfileButton = document.querySelector("#button-edit");
const profileForm = document.querySelector("#form-profile");
const formDetailsCloseBtn = document.querySelector("#popup-button-close");
const formInputName = document.querySelector("#popup-input-name");
const formInputDescription = document.querySelector("#popup-input-description");

const navName = document.querySelector(".nav__name");
const navDescription = document.querySelector(".nav__job-title");

// Popups
const popups = document.querySelectorAll(".popup");
const addNewPlaceBtn = document.querySelector(".nav__button-add");
const addPlacePopup = document.querySelector("#add-place-popup");
const addPlaceCloseBtn = document.querySelector("#popup-add-place-close");
const addPlaceForm = document.querySelector("#form-place");

// Articles
const articles = document.querySelector("#articles");
const placeInputTitle = document.querySelector("#popup-input-title");
const formInputSource = document.querySelector("#form-img-src");
const formPlaceSubmitBtn = document.querySelector("#popup-button-place-submit");
const imgPopup = document.querySelector("#popup__img-zoom");
const imgZoom = document.querySelector("#zoom-img");
const imgPopupClose = document.querySelector("#popup-image-close");
const figCaption = document.querySelector(".popup__figcaption");

// TODO: Agregar el removeEventListener al cerrar el modal cuando se cierra con Escape

// TODO: mover listener de card a la clase

// TODO: En cada método,debes referirte al campo de la clase, y no pasarlo a cada método, como se implementó anteriormente

function toggleModal(popup) {
  const isHidden = popup.classList.contains(config.popupIsHiddenClass);

  if (isHidden) {
    popup.classList.remove(config.popupIsHiddenClass);
    popup.classList.add(config.popupIsVisibleClass);
  } else {
    popup.classList.add(config.popupIsHiddenClass);
    popup.classList.remove(config.popupIsVisibleClass);
  }
}

editProfileButton.addEventListener("click", (e) => {
  e.stopPropagation();
  e.stopImmediatePropagation();
  toggleModal(profilePopup);
});

formDetailsCloseBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  e.stopImmediatePropagation();
  const submitButton = e.target.parentElement.querySelector(config.submitButtonSelector);
  submitButton.disabled = true;
  toggleModal(profilePopup);
});

function saveDetails(details) {
  details.name ? localStorage.setItem("name", details.name) : "";

  details.description ? localStorage.setItem("description", details.description) : "";
}

function updateDetails() {
  const savedName = localStorage.getItem("name");
  const savedDescription = localStorage.getItem("description");

  navName.textContent = savedName ?? "Jacques Cousteau";
  navDescription.textContent = savedDescription ?? "Edita el perfil para agregar una descripción";
}

window.addEventListener("load", () => {
  updateDetails();
});

profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();

  const submitButton = e.target.querySelector(config.submitButtonSelector);

  const details = {
    name: "",
    description: "",
  };

  details.name = formInputName.value;
  details.description = formInputDescription.value;
  saveDetails(details);
  updateDetails();
  toggleModal(profilePopup);
  submitButton.disabled = true;
  profileForm.reset();
});

function openImgPopup(imgSrc, imgAlt) {
  imgZoom.alt = imgAlt;
  imgZoom.title = imgAlt;
  imgZoom.src = imgSrc;
  figCaption.innerText = imgAlt;

  toggleModal(imgPopup);
}

articlesContent.forEach((article) => {
  articles.prepend(new Card(article).create());
});

articles.addEventListener("click", (event) => {
  const pointClicked = event.target;

  if (pointClicked.classList[0].includes("like")) {
    const isLikedIcon = "true" === pointClicked.getAttribute("data-isliked");

    if (isLikedIcon) {
      pointClicked.src = "./images/heart.svg";
      pointClicked.setAttribute("data-isLiked", "false");
    } else {
      pointClicked.src = "./images/heart-liked.svg";
      pointClicked.setAttribute("data-isLiked", "true");
    }
  } else if (pointClicked.classList[0].includes("delete")) {
    pointClicked.parentElement.remove();
  } else if (pointClicked.classList[0].includes("image")) {
    const picContainer = document.querySelector(".popup__zoom-container");

    if (pointClicked.dataset.orientation === "horizontal" && document.documentElement.scrollWidth > 900) {
      picContainer.style.width = "816px";
      picContainer.style.height = "auto";
    } else if (pointClicked.dataset.orientation === "vertical" && window.screen.availHeight <= 800) {
      picContainer.style.width = "262px";
    } else if (pointClicked.dataset.orientation === "vertical" && document.documentElement.scrollWidth > 900) {
      picContainer.style.width = "433px";
    }
    openImgPopup(pointClicked.src, pointClicked.alt);
  }
});

addNewPlaceBtn.addEventListener("click", (e) => {
  toggleModal(addPlacePopup);
});

addPlaceCloseBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  e.stopImmediatePropagation();
  const submitButton = e.target.parentElement.querySelector(config.submitButtonSelector);
  submitButton.disabled = true;

  toggleModal(addPlacePopup);
  addPlaceCloseBtn.parentElement.reset();
});

addPlaceForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const placeDetails = {};
  placeDetails.title = placeInputTitle.value;
  placeDetails.imageSrc = formInputSource.value;

  articles.prepend(new Card(placeDetails).create());
  toggleModal(addPlacePopup);
  addPlaceForm.reset();

  const submitButton = e.target.querySelector(config.submitButtonSelector);
  submitButton.disabled = true;
});

// Close Popups
// Close with exit button
imgPopupClose.addEventListener("click", (e) => {
  e.stopPropagation();
  e.stopImmediatePropagation();
  toggleModal(imgPopup);
});

// Close clicking aside
popups.forEach((aside) => {
  aside.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    e.stopPropagation();
    if (e.target === aside) {
      toggleModal(aside);
    }
  });
});

// Close popups with Escape key
document.addEventListener("keydown", (e) => {
  e.stopImmediatePropagation();
  e.stopPropagation();

  popups.forEach((popup) => {
    if (e.key === "Escape" && popup.classList.contains("popup-active") && popup.firstElementChild.classList.contains("popup__form")) {
      popup.firstElementChild.reset();
      toggleModal(popup);
    } else if (e.key === "Escape" && popup.classList.contains("popup-active") && popup.id === "popup__img-zoom") {
      toggleModal(popup);
    }
  });
});

// enableValidations(config);
new FormValidator(config).enableValidation();
