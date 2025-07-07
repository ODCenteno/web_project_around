import { config } from "./data.js";

function saveDetails(details) {
  details["edit-name"] ? localStorage.setItem("name", details["edit-name"]) : "";
  details["edit-description"] ? localStorage.setItem("description", details["edit-description"]) : "";
}

export function updateDetails() {
  const navName = document.querySelector(".nav__name");
  const navDescription = document.querySelector(".nav__job-title");

  const savedName = localStorage.getItem("name");
  const savedDescription = localStorage.getItem("description");

  navName.textContent = savedName ?? "Jacques Cousteau";
  navDescription.textContent = savedDescription ?? "Edita el perfil para agregar una descripción";
}

export const controlProfileForm = (formDetails) => {
  saveDetails(formDetails);
  updateDetails();
};

const changeLikeIconState = (pointClicked, isLiked) => {
  if (isLiked) {
    pointClicked.src = "./images/heart.svg";
    pointClicked.setAttribute("data-isLiked", "false");
  } else {
    pointClicked.src = "./images/heart-liked.svg";
    pointClicked.setAttribute("data-isLiked", "true");
  }
};

export const manageCardController = (pointClicked) => {
  const isLikeIconClicked = pointClicked.classList[0].includes("like");
  const isLiked = "true" === pointClicked.getAttribute("data-isliked");
  const isDeleteIconClicked = pointClicked.classList[0].includes("delete");
  const isImageClicked = pointClicked.classList[0].includes("image");

  if (isLikeIconClicked) changeLikeIconState(pointClicked, isLiked);
  if (isDeleteIconClicked) pointClicked.parentElement.remove();
  if (isImageClicked) {
    return true;
  }
};
