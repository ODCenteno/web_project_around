import api from "./Components/API.js";

const changeLikeIconState = (pointClicked, isLiked, cardId) => {
  if (isLiked) {
    api.removeLike(cardId).then((card) => {
      pointClicked.src = "../src/images/heart.svg";
      pointClicked.setAttribute("data-isLiked", "false");
    });
  } else {
    api.addLike(cardId).then((card) => {
      pointClicked.src = "../src/images/heart-liked.svg";
      pointClicked.setAttribute("data-isLiked", "true");
    });
  }
};

export const manageCardController = (pointClicked, PopupDeleteConfirmation, cardId) => {
  const isLikeIconClicked = pointClicked.classList[0].includes("like");
  const isLiked = "true" === pointClicked.getAttribute("data-isLiked");
  const isDeleteIconClicked = pointClicked.classList[0].includes("delete");
  const isImageClicked = pointClicked.classList[0].includes("image");

  if (isLikeIconClicked) {
    changeLikeIconState(pointClicked, isLiked, cardId);
  }
  if (isDeleteIconClicked) {
    PopupDeleteConfirmation.open(cardId, pointClicked);
  }
  if (isImageClicked) {
    return true;
  }
  return false;
};
