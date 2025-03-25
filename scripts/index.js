const editButton = document.querySelector("#button-edit");
const popup = document.querySelector(".popup");
const formDetailsResetBtn = document.querySelector("#popup-button-close");
const formInputName = document.querySelector("#form-name");
const formInputDescription = document.querySelector("#form-description");
const formDetailsSubmitBtn = document.querySelector("#popup-button-close");

editButton.addEventListener("click", (e) => {
  popup.classList.remove("popup_hidden");
});

formDetailsResetBtn.addEventListener("click", (e) => {
  popup.classList.add("popup_hidden");
});
