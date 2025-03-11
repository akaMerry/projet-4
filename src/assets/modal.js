// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelectorAll(".close, .close-btn");
const form = document.querySelector("form");
const formComplete = document.querySelector(".form-complete");
const formData = document.querySelectorAll(".formData");
const inputs = form.querySelectorAll("input");

// Toggle navbar and icon (responsive)
function editNav() {
  var x = document.getElementById("myTopnav");
  var i = document.querySelector(".icon i");

  x.classList.toggle("responsive");

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
}

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// Close modal event
modalClose.forEach((element) => element.addEventListener("click", closeModal));

// Manage custom error messages
function errorMessage(input) {
  if (input.validity.valueMissing) {
    if (input.type === "checkbox") {
      input.setCustomValidity(
        "Veuillez vérifier que vous acceptez les conditions d'utilisation."
      );
    } else if (input.type === "radio") {
      input.setCustomValidity("Veuillez choisir une option.");
    } else {
      input.setCustomValidity("Veuillez renseigner ce champ.");
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
