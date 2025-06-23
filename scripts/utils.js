export const articlesContent = [
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
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
  },
  {
    title: "Montañas Calvas",
    imageUrl: "./images/calvas.webp",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
  },
  {
    title: "Latemar",
    imageUrl: "./images/latemar.webp",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
  },
  {
    title: "Vanois National Park",
    imageUrl: "./images/vanois.webp",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
  },
  {
    title: "Lago di Braies",
    imageUrl: "./images/dibraies.webp",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
  },
];

export const config = {
  placeDetails: {},
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonState: "disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  popupIsVisibleClass: "popup-active",
  popupIsHiddenClass: "popup_hidden",
  editProfileBtnElement: document.querySelector("#edit-profile-btn"),
  profilePopupElement: document.querySelector("#edit-profile-popup"),
  profileForm: document.querySelector("#form-profile"),
  formDetailsCloseBtn: document.querySelector("#popup-button-close"),
  addNewPlaceBtn: document.querySelector(".nav__button-add"),
  addPlacePopup: document.querySelector("#add-place-popup"),
  addPlaceCloseBtn: document.querySelector("#popup-add-place-close"),
  addPlaceForm: document.querySelector("#form-place"),
  placeInputTitle: document.querySelector("#popup-input-title"),
  formInputSource: document.querySelector("#form-img-src"),
  formPlaceSubmitBtn: document.querySelector("#popup-button-place-submit"),
  articlesSection: document.querySelector("#articles"),
  imgPopup: document.querySelector("#popup__img-zoom"),
  imgPopupClose: document.querySelector("#popup-image-close"),
  imgZoom: document.querySelector("#zoom-img"),
  figCaption: document.querySelector(".popup__figcaption"),
  popups: document.querySelectorAll(".popup"),
};

function saveDetails(details) {
  details.name ? localStorage.setItem("name", details.name) : "";
  details.description ? localStorage.setItem("description", details.description) : "";
}

export function updateDetails() {
  const navName = document.querySelector(".nav__name");
  const navDescription = document.querySelector(".nav__job-title");

  const savedName = localStorage.getItem("name");
  const savedDescription = localStorage.getItem("description");

  navName.textContent = savedName ?? "Jacques Cousteau";
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

  const isProfileModalElement = config.editProfileBtnElement === target || config.formDetailsCloseBtn === target;
  const isPlaceModalElement = config.addNewPlaceBtn === target || config.addPlaceCloseBtn === target;
  const isImgCloseButton = config.imgPopupClose === target;
  const isModal = aside === target;

  if (isProfileModalElement) {
    toggleModal(config.profilePopupElement);
  }
  if (isPlaceModalElement) {
    toggleModal(config.addPlacePopup);
  }
  if (isImgCloseButton) {
    toggleModal(config.imgPopup);
  }
  if (isModal) {
    toggleModal(aside);
  }
}

export function controlProfileForm(e) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();

  const formInputName = e.target.querySelector("#popup-input-name");
  const formInputDescription = e.target.querySelector("#popup-input-description");
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

    const isHorizontal = pointClicked.dataset.orientation === "horizontal";
    const isVertical = pointClicked.dataset.orientation === "vertical";
    const isLargeScroll = document.documentElement.scrollWidth > 900;
    const isSmallHeight = window.screen.availHeight <= 800;

    if (isHorizontal && isLargeScroll) {
      picContainer.style.width = "816px";
      picContainer.style.height = "auto";
    } else if (isVertical && isSmallHeight) {
      picContainer.style.width = "262px";
    } else if (isVertical && isLargeScroll) {
      picContainer.style.width = "433px";
    }
    openImgPopup(pointClicked.src, pointClicked.alt);
  }
}

export function escapeEventController(e) {
  e.stopImmediatePropagation();
  e.stopPropagation();

  config.popups.forEach((popup) => {
    const isEscapeKey = e.key === "Escape";
    const isActivePopup = popup.classList.contains("popup-active");
    const isImgPopup = popup.id === "popup__img-zoom";
    const hasForm = popup.firstElementChild.classList.contains("popup__form");

    if (isEscapeKey && isActivePopup && hasForm) {
      toggleModal(popup);
    } else if (isEscapeKey && isActivePopup && isImgPopup) {
      toggleModal(popup);
    }
  });
}
