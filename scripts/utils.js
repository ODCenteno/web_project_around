import { config } from "./data.js";

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

// export function toggleModal(popup) {
//   const isHidden = popup.classList.contains(config.popupIsHiddenClass);

//   if (isHidden) {
//     popup.classList.remove(config.popupIsHiddenClass);
//     popup.classList.add(config.popupIsVisibleClass);
//     document.addEventListener("keydown", escapeEventController);
//   } else {
//     popup.classList.add(config.popupIsHiddenClass);
//     popup.classList.remove(config.popupIsVisibleClass);
//     popup.querySelector(".popup__form")?.reset();
//     document.removeEventListener("keydown", escapeEventController);
//   }
// }

// export function manageModals(e, aside) {
//   const target = e.target;

//   const isProfileModalElement = config.editProfileBtnElement === target || config.formDetailsCloseBtn === target;
//   const isPlaceModalElement = config.addNewPlaceBtn === target || config.addPlaceCloseBtn === target;
//   const isImgCloseButton = config.imgPopupClose === target;
//   const isModal = aside === target;

//   if (isProfileModalElement) {
//     toggleModal(config.profilePopupElement);
//   }
//   if (isPlaceModalElement) {
//     toggleModal(config.addPlacePopup);
//   }
//   if (isImgCloseButton) {
//     toggleModal(config.imgPopup);
//   }
//   if (isModal) {
//     toggleModal(aside);
//   }
// }

export function controlProfileForm(e) {
  const details = {
    name: "",
    description: "",
  };

  details.name = e.target.querySelector("#popup-input-name").value;
  details.description = e.target.querySelector("#popup-input-description").value;
  //saveDetails(details);
  updateDetails();
  this.close();
}

function changeLikeIconState(pointClicked, isLiked) {
  if (isLiked) {
    pointClicked.src = "./images/heart.svg";
    pointClicked.setAttribute("data-isLiked", "false");
  } else {
    pointClicked.src = "./images/heart-liked.svg";
    pointClicked.setAttribute("data-isLiked", "true");
  }
}

export function manageCardController(e, PopImge) {
  const pointClicked = e.target;

  const isLikeIconClicked = pointClicked.classList[0].includes("like");
  const isLiked = "true" === pointClicked.getAttribute("data-isliked");
  const isDeleteIconClicked = pointClicked.classList[0].includes("delete");
  const isImageClicked = pointClicked.classList[0].includes("image");

  if (isLikeIconClicked) changeLikeIconState(pointClicked, isLiked);
  if (isDeleteIconClicked) pointClicked.parentElement.remove();
  if (isImageClicked) {
    PopImge.open(pointClicked);
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
