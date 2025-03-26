let articlesContent = [
  {
    articleTitle: "Valle de Yosemite",
    imageUrl: "/images/yosemite.webp",
    imageAlt: "Example of alternative description",
    iconUrl: "/images/heart.svg",
    likedIconUrl: "/images/heart-liked.svg",
    isLiked: false,
  },
  {
    articleTitle: "Valle de Yosemite",
    imageUrl: "/images/yosemite.webp",
    imageAlt: "Example of alternative description",
    iconUrl: "/images/heart.svg",
    likedIconUrl: "/images/heart-liked.svg",
    isLiked: false,
  },
  {
    articleTitle: "Valle de Yosemite",
    imageUrl: "/images/yosemite.webp",
    imageAlt: "Example of alternative description",
    iconUrl: "/images/heart.svg",
    likedIconUrl: "/images/heart-liked.svg",
    isLiked: false,
  },
  {
    articleTitle: "Valle de Yosemite",
    imageUrl: "/images/yosemite.webp",
    imageAlt: "Example of alternative description",
    iconUrl: "/images/heart.svg",
    likedIconUrl: "/images/heart-liked.svg",
    isLiked: false,
  },
];

const baseArticleHTML = (article) => {
  return `
  <article class="card articles__card">
    <picture class="card__picture">
      <img src="${article.imageUrl}" alt="${article.imageAlt}" class="card__image">
    </picture>
    <div class="card__place-info">
      <h3 class="card__place-title">${article.articleTitle}</h3>
      <div class="card__icon-container">
        <img src="${article.iconUrl}" alt="like icon" data-isLiked=${article.isLiked} class="card__like-icon">
      </div>
    </div>
  </article>
`;
};

const articles = document.querySelector("#articles");

articlesContent.forEach((article) => {
  articles.insertAdjacentHTML("beforeend", baseArticleHTML(article));
});

articles.addEventListener("click", (event) => {
  const iconClicked = event.target;
  const isLikedIcon = "true" === iconClicked.getAttribute("data-isliked");
  console.log(isLikedIcon);

  if (isLikedIcon) {
    iconClicked.setAttribute("src", "./images/heart.svg");
    iconClicked.setAttribute("data-isLiked", "false");
    console.log("Turning off", iconClicked);
  } else {
    iconClicked.setAttribute("src", "./images/heart-liked.svg");
    iconClicked.setAttribute("data-isLiked", "true");
    console.log("Turning on", iconClicked);
  }
});
