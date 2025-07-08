import { config } from "./data.js";

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
  return false;
};
