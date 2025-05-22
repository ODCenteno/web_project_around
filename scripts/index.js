const profilePopup = document.querySelector("#edit-profile-popup");
const editButton = document.querySelector("#button-edit");
const form = document.querySelector("#form-profile");
const formDetailsResetBtn = document.querySelector("#popup-button-close");
const formInputName = document.querySelector("#form-name");
const formInputDescription = document.querySelector("#form-description");
const formDetailsSubmitBtn = document.querySelector("#popup-button-submit");

const navName = document.querySelector(".nav__name");
const navDescription = document.querySelector(".nav__job-title");

const addNewPlaceBtn = document.querySelector(".nav__button-add");
const addPlacePopup = document.querySelector("#add-place-popup");
const addPlaceCloseBtn = document.querySelector("#popup-add-place-close");
const addPlaceForm = document.querySelector("#form-place");

let details = {
  name: "",
  description: "",
};

function toggleModal(popup) {
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

editButton.addEventListener("click", (e) => {
  toggleModal(profilePopup);
});

formDetailsResetBtn.addEventListener("click", (e) => {
  toggleModal(profilePopup);
});

form.addEventListener("input", (event) => {
  // refactorizar la validación de campos
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
  toggleModal(profilePopup);
});

addNewPlaceBtn.addEventListener("click", (e) => {
  toggleModal(addPlacePopup);
});

addPlaceCloseBtn.addEventListener("click", (e) => {
  toggleModal(addPlacePopup);
});

addPlaceForm.addEventListener("submit", (e) => {
  e.preventDefault();

  details.name = formInputName.value;
  details.description = formInputDescription.value;
  console.log(details);
  // addPlaceToDB(place);
  // updatePlaces(place);
  toggleModal(addPlacePopup);
});

// Lógica para el manejo de formulario Add New place y agregar nueva tarjeta

// Agregar controlador para eliminar una tarjeta

// Controlador para abrir una ventana emergente con la imagen ampliada y su nombre como caption
