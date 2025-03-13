// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelectorAll(".close, .close-btn");
const form = document.querySelector("form");
const formComplete = document.querySelector(".form-complete");
const formData = document.querySelectorAll(".formData");
const inputs = form.querySelectorAll("input");
const x = document.getElementById("myTopnav");
const i = x.querySelector(".icon i");

// Toggle navbar and icon (responsive)
function editNav() {
  navbarIcon();
  x.classList.toggle("responsive");
}

// navbar icon
function navbarIcon() {
  if (i.classList.contains("fa-bars")) {
    i.classList.remove("fa", "fa-bars");
    i.classList.add("fa-solid", "fa-x");
  } else {
    i.classList.remove("fa-solid", "fa-x");
    i.classList.add("fa", "fa-bars");
  }
}

// Launch modal form
function launchModal() {
  modalbg.style.display = "block";
  if (x.classList.contains("responsive")) {
    navbarIcon();
    x.classList.remove("responsive");
  }
}

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
}
// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal event
modalClose.forEach((element) => element.addEventListener("click", closeModal));

// Manage custom error messages
function errorMessage(input) {
  if (input.validity.valueMissing) {
    switch (input.type) {
      case "checkbox":
        input.setCustomValidity(
          "Veuillez vérifier que vous acceptez les conditions d'utilisation."
        );
        break;
      case "radio":
        input.setCustomValidity("Veuillez choisir une option.");
        break;
      default:
        input.setCustomValidity("Veuillez renseigner ce champ.");
        break;
    }
  } else if (input.validity.tooShort) {
    input.setCustomValidity(
      "Veuillez entrer 2 caractères ou plus pour ce champ."
    );
  } else if (input.validity.tooLong) {
    input.setCustomValidity("Le texte est trop long.");
  } else if (input.validity.patternMismatch) {
    input.setCustomValidity("Le format n'est pas valide.");
  } else if (input.validity.rangeUnderflow) {
    input.setCustomValidity("La valeur est trop petite.");
  } else if (input.validity.rangeOverflow) {
    input.setCustomValidity("La valeur est trop grande.");
  } else if (input.validity.stepMismatch) {
    input.setCustomValidity("La valeur est incorrecte.");
  } else if (input.validity.badInput) {
    input.setCustomValidity("La saisie est incorrecte.");
  } else if (input.validity.typeMismatch) {
    switch (input.type) {
      case "email":
        input.setCustomValidity(
          "L'adresse e-mail doit contenir les caractères suivants : @ et ."
        );
        break;
      case "url":
        input.setCustomValidity("L'URL n'est pas valide.");
        break;
      default:
        input.setCustomValidity("Le format est incorrect.");
        break;
    }
  } else if (input.validity.customError) {
    input.setCustomValidity("Une erreur est survenue.");
  } else {
    input.setCustomValidity("");
  }
}

// Display custom error messages
inputs.forEach((input) => {
  input.addEventListener("input", function () {
    errorMessage(input);
    if (!input.checkValidity()) {
      input.closest(".formData").setAttribute("data-error-visible", "true");
      input
        .closest(".formData")
        .setAttribute("data-error", input.validationMessage);
    } else {
      input.setCustomValidity("");
      input.closest(".formData").removeAttribute("data-error-visible");
      input.closest(".formData").removeAttribute("data-error");
    }
  });
});

// Check every input validity
function validate() {
  let valid = true;

  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      valid = false;
    }
  });

  return valid;
}

// Submit form
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validate()) {
    if (formComplete) {
      form.style.display = "none";
      formComplete.style.display = "block";
    }
    // creation of an object containing valid user data
    const data = new FormData(form);
    const userData = Object.fromEntries(data.entries());
    console.log(userData);
  }
});
