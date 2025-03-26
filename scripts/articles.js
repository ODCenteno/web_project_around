let articlesContent = [
  {
    articleTitle: "Valle de Yosemite",
    imageUrl: "/images/yosemite.webp",
    imageAlt: "Example of alternative description",
    iconUrl: "/images/heart.svg",
    isLiked: false,
  },
  {
    articleTitle: "Valle de Yosemite",
    imageUrl: "/images/yosemite.webp",
    imageAlt: "Example of alternative description",
    iconUrl: "/images/heart.svg",
    isLiked: false,
  },
  {
    articleTitle: "Valle de Yosemite",
    imageUrl: "/images/yosemite.webp",
    imageAlt: "Example of alternative description",
    iconUrl: "/images/heart.svg",
    isLiked: false,
  },
  {
    articleTitle: "Valle de Yosemite",
    imageUrl: "/images/yosemite.webp",
    imageAlt: "Example of alternative description",
    iconUrl: "/images/heart.svg",
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
      <div class="card__icon-container" id="like-icon">
        <img src="${article.iconUrl}" alt="like icon" class="card__like-icon">
      </div>
    </div>
  </article>
`;
};

const articles = document.querySelector("#articles");

articlesContent.forEach((article) => {
  articles.insertAdjacentHTML("beforeend", baseArticleHTML(article));
});
