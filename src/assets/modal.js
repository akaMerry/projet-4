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

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCross = document.querySelectorAll(".close");

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// close modal event
modalCross.forEach((span) => span.addEventListener("click", closeModal));
