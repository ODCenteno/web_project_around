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

const articles = document.querySelector("#articles");
const addArticleBtn = document.querySelector(".nav__button-add");
const placeInputTitle = document.querySelector("#form-title");
const formInputSource = document.querySelector("#form-img-src");
const formPlaceSubmitBtn = document.querySelector("#place-button-submit");

const baseArticleHTML = (article) => {
  const articleNode = document.createElement("article");
  articleNode.classList.add("card", "articles__card");

  const pictureNode = document.createElement("picture");
  pictureNode.classList.add("card__picture");

  console.log(`IMG SRC: ${(article.title, article.src)}`);
  const imgNode = document.createElement("img");
  imgNode.classList.add("card__image");
  imgNode.src = article.imageUrl ?? article.src;
  imgNode.alt = article.imageAlt ?? article.title;

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

  iconContainerNode.append(iconNode);
  divNode.append(h3Node, iconContainerNode);
  articleNode.append(pictureNode, divNode);

  return articleNode;
};

articlesContent.forEach((article) => {
  articles.prepend(baseArticleHTML(article));
});

articles.addEventListener("click", (event) => {
  const iconClicked = event.target;

  if (iconClicked.classList[0].includes("icon")) {
    const isLikedIcon = "true" === iconClicked.getAttribute("data-isliked");

    if (isLikedIcon) {
      iconClicked.setAttribute("src", "./images/heart.svg");
      iconClicked.setAttribute("data-isLiked", "false");
    } else {
      iconClicked.setAttribute("src", "./images/heart-liked.svg");
      iconClicked.setAttribute("data-isLiked", "true");
    }
  }
});

addNewPlaceBtn.addEventListener("click", (e) => {
  toggleModal(addPlacePopup);
});

addPlaceCloseBtn.addEventListener("click", (e) => {
  toggleModal(addPlacePopup);
});

addPlaceForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = placeInputTitle.value;
  const imgSrc = formInputSource.value;

  // const getImg = await fetch(imgSrc, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(placeDetails),
  // });

  console.log(title, imgSrc);

  placeDetails.title = title;
  placeDetails.src = await imgSrc;
  console.log(placeDetails);

  // addPlaceToDB(place);
  articles.prepend(baseArticleHTML(placeDetails));
  toggleModal(addPlacePopup);
  addPlaceForm.reset();
});

addPlaceForm.addEventListener("input", (e) => {
  let titleIsValid = placeInputTitle.validity.valid;
  let sourceIsValid = formInputSource.validity.valid;

  formValidations(titleIsValid, sourceIsValid, formPlaceSubmitBtn);
});

// Controlador para abrir una ventana emergente con la imagen ampliada y su nombre como caption
