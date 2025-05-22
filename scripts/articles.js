let articlesContent = [
  {
    articleTitle: "Valle de Yosemite",
    imageUrl: "./images/yosemite.webp",
    imageAlt: "Example of alternative description",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
  },
  {
    articleTitle: "Lago Louise",
    imageUrl: "./images/lake.webp",
    imageAlt: "Example of alternative description",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
  },
  {
    articleTitle: "Montañas Calvas",
    imageUrl: "./images/calvas.webp",
    imageAlt: "Example of alternative description",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
  },
  {
    articleTitle: "Latemar",
    imageUrl: "./images/latemar.webp",
    imageAlt: "Example of alternative description",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
  },
  {
    articleTitle: "Vanois National Park",
    imageUrl: "./images/vanois.webp",
    imageAlt: "Example of alternative description",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
  },
  {
    articleTitle: "Lago di Braies",
    imageUrl: "./images/dibraies.webp",
    imageAlt: "Example of alternative description",
    iconUrl: "./images/heart.svg",
    likedIconUrl: "./images/heart-liked.svg",
    isLiked: false,
  },
];

const baseArticleHTML = (article) => {
  const articleNode = document.createElement("article");
  articleNode.classList.add("card", "articles__card");
  const pictureNode = document.createElement("picture");
  pictureNode.classList.add("card__picture");
  const imgNode = document.createElement("img");
  imgNode.classList.add("card__image");

  imgNode.setAttribute("src", `${article.imageUrl}`);
  imgNode.setAttribute("alt", `${article.imageAlt}`);

  pictureNode.append(imgNode);

  const divNode = document.createElement("div");
  divNode.classList.add("card__place-info");
  const h3Node = document.createElement("h3");
  h3Node.classList.add("card__place-title");
  h3Node.textContent = article.articleTitle;
  const iconContainerNode = document.createElement("div");
  iconContainerNode.classList.add("card__icon-container");

  const iconNode = document.createElement("img");
  iconNode.classList.add("card__like-icon");
  iconNode.setAttribute("src", article.iconUrl);
  iconNode.setAttribute("alt", "like icon");
  iconNode.setAttribute("data-isLiked", article.isLiked);
  iconContainerNode.append(iconNode);

  divNode.append(h3Node);
  divNode.append(iconContainerNode);

  articleNode.append(pictureNode);
  articleNode.append(divNode);

  return articleNode;
};

const articles = document.querySelector("#articles");

// Actualizar los métodos para agregar una nueva tarjeta y quirar insertAdjacentHTML
articlesContent.forEach((article) => {
  articles.prepend(baseArticleHTML(article));
});

articles.addEventListener("click", (event) => {
  const iconClicked = event.target;
  console.log(iconClicked.classList);
  if (iconClicked.classList[0].includes("icon")) {
    const isLikedIcon = "true" === iconClicked.getAttribute("data-isliked");
    console.log(isLikedIcon);
    if (isLikedIcon) {
      iconClicked.setAttribute("src", "./images/heart.svg");
      iconClicked.setAttribute("data-isLiked", "false");
    } else {
      iconClicked.setAttribute("src", "./images/heart-liked.svg");
      iconClicked.setAttribute("data-isLiked", "true");
    }
  }
});

// Agregar nuevo controlador para el botón de abrir modal Add New Place

// Lógica para el manejo de formulario Add New place y agregar nueva tarjeta

// Agregar controlador para eliminar una tarjeta

// Controlador para abrir una ventana emergente con la imagen ampliada y su nombre como caption
