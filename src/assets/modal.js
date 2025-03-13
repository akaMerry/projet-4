// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelectorAll(".close, .close-btn");
const form = document.querySelector("form");
const formComplete = document.querySelector(".form-complete");
const formData = document.querySelectorAll(".formData");
const inputs = document.querySelectorAll(".formData input");
const x = document.getElementById("myTopnav");
const i = x.querySelector(".icon i");

// Toggle navbar and icon (responsive)
i.addEventListener("click", function () {
  navbarIcon();
  x.classList.toggle("responsive");
});

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

// Submit form
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let valid = true;
  // checking the validity of each input and displaying a message in case of error
  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      input.closest(".formData").setAttribute("data-error-visible", "true");
      input
        .closest(".formData")
        .setAttribute("data-error", input.validationMessage);
      valid = false;
      // removing error messages in case of valid data
    } else {
      input.setCustomValidity("");
      input.closest(".formData").removeAttribute("data-error-visible");
      input.closest(".formData").removeAttribute("data-error");
    }
  });
  // when all data are valid
  if (valid) {
    // creation of an object containing valid user data
    const data = new FormData(form);
    const userData = Object.fromEntries(data.entries());
    console.log(userData);
    // hiding form and displaying a message regarding completed form
    if (formComplete) {
      form.style.display = "none";
      formComplete.style.display = "block";
    }
  }
});
