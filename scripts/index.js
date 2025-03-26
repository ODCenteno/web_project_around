const popup = document.querySelector(".popup");
const editButton = document.querySelector("#button-edit");
const form = document.querySelector("#form-profile");
const formDetailsResetBtn = document.querySelector("#popup-button-close");
const formInputName = document.querySelector("#form-name");
const formInputDescription = document.querySelector("#form-description");
const formDetailsSubmitBtn = document.querySelector("#popup-button-close");

const navName = document.querySelector(".nav__name");
const navDescription = document.querySelector(".nav__job-title");

let details = {
  name: "",
  description: "",
};

function toggleModal() {
  const isHidden = popup.classList.contains("popup_hidden");

  isHidden ? popup.classList.remove("popup_hidden") : popup.classList.add("popup_hidden");
}

function saveDetails(details) {
  console.log(`Form Details: ${details}`);
  details.name ? sessionStorage.setItem("name", details.name) : "";

  details.description ? sessionStorage.setItem("description", details.description) : "";
}

function updateDetails() {
  const name = sessionStorage.getItem("name");
  const description = sessionStorage.getItem("description");

  navName.innerText = name;
  navDescription.innerText = description;
}

editButton.addEventListener("click", toggleModal);

formDetailsResetBtn.addEventListener("click", toggleModal);

formDetailsResetBtn.addEventListener("click", toggleModal);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  details.name = formInputName.value;
  details.description = formInputDescription.value;
  saveDetails(details);
  updateDetails();
  toggleModal();
});
