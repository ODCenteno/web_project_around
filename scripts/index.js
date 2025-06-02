import { enableValidations } from "./validate.js";

let articlesContent = [
  {
    title: "Valle de Yosemite",
    imageUrl: "./images/yosemite.webp",
    imageAlt: "Example of alternative description",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
  },
  {
    title: "Lago Louise",
    imageUrl: "./images/lake.webp",
    imageAlt: "Example of alternative description",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
  },
  {
    title: "Montañas Calvas",
    imageUrl: "./images/calvas.webp",
    imageAlt: "Example of alternative description",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
  },
  {
    title: "Latemar",
    imageUrl: "./images/latemar.webp",
    imageAlt: "Example of alternative description",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
  },
  {
    title: "Vanois National Park",
    imageUrl: "./images/vanois.webp",
    imageAlt: "Example of alternative description",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
  },
  {
    title: "Lago di Braies",
    imageUrl: "./images/dibraies.webp",
    imageAlt: "Example of alternative description",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
  },
];

const profilePopup = document.querySelector("#edit-profile-popup");
const editCloseButton = document.querySelector("#button-edit");
const profileForm = document.querySelector("#form-profile");
const formDetailsCloseBtn = document.querySelector("#popup-button-close");
const formInputName = document.querySelector("#form-name");
const formInputDescription = document.querySelector("#form-description");
const formDetailsSubmitBtn = document.querySelector("#popup-button-submit");

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
const addArticleBtn = document.querySelector(".nav__button-add");
const placeInputTitle = document.querySelector("#form-title");
const formInputSource = document.querySelector("#form-img-src");
const formPlaceSubmitBtn = document.querySelector("#place-button-submit");
const deleteIcon = document.querySelectorAll(".card__delete-icon");
const cardImage = document.querySelector("#card__picture");
const imgPopup = document.querySelector("#popup__img-zoom");
const imgZoom = document.querySelector("#zoom-img");
const imgPopupClose = document.querySelector("#popup-image-close");
const figCaption = document.querySelector(".popup__figcaption");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonState: "disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidations(config);

let details = {
  name: "",
  description: "",
};

let placeDetails = {};

function toggleModal(popup) {
  const isHidden = popup.classList.contains("popup_hidden");

  if (isHidden) {
    popup.classList.remove("popup_hidden");
    popup.classList.add("popup-active");
  } else {
    popup.classList.add("popup_hidden");
    popup.classList.remove("popup-active");
  }
}

editCloseButton.addEventListener("click", (e) => {
  e.stopPropagation();
  e.stopImmediatePropagation();
  toggleModal(profilePopup);
});

formDetailsCloseBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  e.stopImmediatePropagation();
  toggleModal(profilePopup);
});

function saveDetails(details) {
  details.name ? localStorage.setItem("name", details.name) : "";

  details.description ? localStorage.setItem("description", details.description) : "";
}

function updateDetails() {
  const savedName = localStorage.getItem("name");
  const savedDescription = localStorage.getItem("description");

  navName.innerText = savedName ?? "Jacques Cousteau";
  navDescription.innerText = savedDescription;
}

function formValidations(mainField, contentField, itemToActivate) {
  if (mainField && contentField) {
    itemToActivate.removeAttribute("disabled");
  }
}

profileForm.addEventListener("input", (event) => {
  // refactorizar la validación de campos
  let nameIsValid = formInputName.validity.valid;
  let descriptionIsValid = formInputDescription.validity.valid;

  formValidations(nameIsValid, descriptionIsValid, formDetailsSubmitBtn);
});

profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();

  details.name = formInputName.value;
  details.description = formInputDescription.value;
  saveDetails(details);
  updateDetails();
  toggleModal(profilePopup);
});

// Articles
const baseArticleHTML = (article) => {
  const articleNode = document.createElement("article");
  articleNode.classList.add("card", "articles__card");

  const pictureNode = document.createElement("picture");
  pictureNode.classList.add("card__picture");

  const imgNode = document.createElement("img");
  imgNode.classList.add("card__image");
  imgNode.src = article.imageUrl ?? article.src;
  imgNode.alt = article.imageAlt ?? article.title;

  let imgOrientation = "";

  imgNode.onload = function () {
    imgOrientation = this.naturalWidth > this.naturalHeight ? "horizontal" : "vertical";
    this.dataset.orientation = imgOrientation;
  };

  pictureNode.append(imgNode);

  const divNode = document.createElement("div");
  divNode.classList.add("card__place-info");
  const h3Node = document.createElement("h3");
  h3Node.classList.add("card__place-title");
  h3Node.innerText = article.title;
  const iconContainerNode = document.createElement("div");
  iconContainerNode.classList.add("card__icon-container");

  const iconNode = document.createElement("img");
  iconNode.classList.add("card__like-icon");
  iconNode.src = article.iconUrl ?? "./images/heart.svg";
  iconNode.alt = "like icon";
  iconNode.dataset.isLiked = article.isLiked;

  const deleteNode = document.createElement("img");
  deleteNode.classList.add("card__delete-icon");
  deleteNode.src = "./images/delete.svg";
  deleteNode.alt = "delete icon";
  deleteNode.id = "delete";

  articleNode.append(deleteNode);

  iconContainerNode.append(iconNode);
  divNode.append(h3Node, iconContainerNode);
  articleNode.append(pictureNode, divNode);

  return articleNode;
};

function openImgPopup(imgSrc, imgAlt) {
  imgZoom.alt = imgAlt;
  imgZoom.title = imgAlt;
  imgZoom.src = imgSrc;
  figCaption.innerText = imgAlt;

  toggleModal(imgPopup);
}

articlesContent.forEach((article) => {
  articles.prepend(baseArticleHTML(article));
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
      picContainer.style.width = "282px";
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
  toggleModal(addPlacePopup);
});

imgPopupClose.addEventListener("click", (e) => {
  e.stopPropagation();
  e.stopImmediatePropagation();
  toggleModal(imgPopup);
});

addPlaceForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = placeInputTitle.value;
  const imgSrc = formInputSource.value;

  placeDetails.title = title;
  placeDetails.src = await imgSrc;

  articles.prepend(baseArticleHTML(placeDetails));
  toggleModal(addPlacePopup);
  addPlaceForm.reset();
});

// New Place Form validation + create
addPlaceForm.addEventListener("input", (e) => {
  let titleIsValid = placeInputTitle.validity.valid;
  let sourceIsValid = formInputSource.validity.valid;

  formValidations(titleIsValid, sourceIsValid, formPlaceSubmitBtn);
});

// Toggle popups/asides clicking area
popups.forEach((aside) => {
  aside.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    e.stopPropagation();
    if (e.target === aside) {
      toggleModal(aside);
    }
  });
});

// Close Popups using Escape
window.addEventListener("keydown", (e) => {
  e.stopImmediatePropagation();
  e.stopPropagation();
  popups.forEach((popup) => {
    if (e.key === "Escape" && popup.classList.contains("popup-active")) {
      toggleModal(popup);
    }
  });
});
