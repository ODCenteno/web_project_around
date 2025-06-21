import { config } from "./data.js";

function saveDetails(details) {
  details.name ? localStorage.setItem("name", details.name) : "";

  details.description ? localStorage.setItem("description", details.description) : "";
}

export async function updateDetails() {
  const navName = document.querySelector(".nav__name");
  const navDescription = document.querySelector(".nav__job-title");

  const savedName = localStorage.getItem("name");
  const savedDescription = localStorage.getItem("description");

  navName.textContent = (await savedName) ?? "Jacques Cousteau";
  navDescription.textContent = savedDescription ?? "Edita el perfil para agregar una descripción";
}

export function toggleModal(popup) {
  const isHidden = popup.classList.contains(config.popupIsHiddenClass);

  if (isHidden) {
    popup.classList.remove(config.popupIsHiddenClass);
    popup.classList.add(config.popupIsVisibleClass);
    document.addEventListener("keydown", escapeEventController);
  } else {
    popup.classList.add(config.popupIsHiddenClass);
    popup.classList.remove(config.popupIsVisibleClass);
    popup.querySelector(".popup__form")?.reset();
    document.removeEventListener("keydown", escapeEventController);
  }
}

export function manageModals(e, aside) {
  e.stopPropagation();
  e.stopImmediatePropagation();
  const target = e.target;

  if (config.editProfileBtnElement === target || config.formDetailsCloseBtn === target) {
    toggleModal(config.profilePopupElement);
  }
  if (config.addNewPlaceBtn === target || config.addPlaceCloseBtn === target) {
    toggleModal(config.addPlacePopup);
  }
  if (config.imgPopupClose === target) {
    toggleModal(config.imgPopup);
  }
  if (aside === target) {
    toggleModal(aside);
  }
}

export function controlProfileForm(e) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();

  const formInputName = e.target.querySelector("#popup-input-name");
  const formInputDescription = e.target.querySelector("#popup-input-description");
  const submitButton = e.target.querySelector(config.submitButtonSelector);

  const details = {
    name: "",
    description: "",
  };

  details.name = formInputName.value;
  details.description = formInputDescription.value;
  saveDetails(details);
  updateDetails();
  toggleModal(e.target.parentElement);
}

function openImgPopup(imgSrc, imgAlt) {
  config.imgZoom.alt = imgAlt;
  config.imgZoom.title = imgAlt;
  config.imgZoom.src = imgSrc;
  config.figCaption.innerText = imgAlt;

  toggleModal(config.imgPopup);
}

export function manageCardController(e) {
  const pointClicked = e.target;

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
}

export function escapeEventController(e) {
  e.stopImmediatePropagation();
  e.stopPropagation();

  config.popups.forEach((popup) => {
    if (e.key === "Escape" && popup.classList.contains("popup-active") && popup.firstElementChild.classList.contains("popup__form")) {
      toggleModal(popup);
    } else if (e.key === "Escape" && popup.classList.contains("popup-active") && popup.id === "popup__img-zoom") {
      toggleModal(popup);
    }
  });
}
