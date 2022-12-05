// const btn = document.querySelector("button.mobile-menu-button");
const btn = document.getElementById("mobile-menu-button")
// const menu = document.querySelector(".mobile-menu");
const menu = document.getElementById("mobile-menu")

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});
