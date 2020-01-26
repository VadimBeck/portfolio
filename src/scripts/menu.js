const menu = document.querySelector('.popup-menu');
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');

menuBtn.addEventListener('click', ()=> {
  menu.classList.add('is-active');
});

closeBtn.addEventListener('click', ()=> {
  menu.classList.remove('is-active');
});
