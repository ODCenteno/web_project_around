const popup = document.querySelector(".popup");
const editButton = document.querySelector("#button-edit");
const formDetailsResetBtn = document.querySelector("#popup-button-close");
const formInputName = document.querySelector("#form-name");
const formInputDescription = document.querySelector("#form-description");
const formDetailsSubmitBtn = document.querySelector("#popup-button-close");

editButton.addEventListener("click", (e) => {
  popup.classList.remove("popup_hidden");
});

formDetailsResetBtn.addEventListener("click", (e) => {
  try {
    popup.classList.add("popup_hidden");
  } catch (e) {
    console.error(e);
  }
});
