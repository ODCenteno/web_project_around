const popup = document.querySelector(".popup");
const editButton = document.querySelector("#button-edit");
const form = document.querySelector("#form-profile");
const formDetailsResetBtn = document.querySelector("#popup-button-close");
const formInputName = document.querySelector("#form-name");
const formInputDescription = document.querySelector("#form-description");
const formDetailsSubmitBtn = document.querySelector("#popup-button-submit");

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
  details.name ? localStorage.setItem("name", details.name) : "";

  details.description ? localStorage.setItem("description", details.description) : "";
}

function updateDetails() {
  const savedName = localStorage.getItem("name");
  const savedDescription = localStorage.getItem("description");

  navName.innerText = savedName ?? "Jacques Cousteau";
  navDescription.innerText = savedDescription;
}

editButton.addEventListener("click", toggleModal);

formDetailsResetBtn.addEventListener("click", toggleModal);

form.addEventListener("input", (event) => {
  let nameIsValid = formInputName.validity.valid;
  let descriptionIsValid = formInputDescription.validity.valid;

  if (nameIsValid && descriptionIsValid) {
    formDetailsSubmitBtn.removeAttribute("disabled");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  details.name = formInputName.value;
  details.description = formInputDescription.value;
  saveDetails(details);
  updateDetails();
  toggleModal();
});
