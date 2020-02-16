const menu = document.querySelector(".popup-menu");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");

menu.addEventListener("transitionend", () => {
  if(!menu.classList.contains("is-active")) {
    menu.style.visibility = 'hidden';
  } 
});

menuBtn.addEventListener("click", () => {
  menu.style.visibility = 'visible';
  menu.classList.add("is-active");
});

closeBtn.addEventListener("click", () => {
  menu.classList.remove("is-active");
});

document.addEventListener("scroll", () => {
  menu.classList.remove("is-active");
});