
document.addEventListener("DOMContentLoaded", () => {
  let menu = document.querySelector('#menu-icon');
  let navbar = document.querySelector('.navbar');

  menu.onclick = () =>{
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
  }

  document.addEventListener('scroll', () =>{
    const header = document.querySelector('header');

    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});

// loader 
var loader = document.getElementById('preloader');
window.addEventListener('load', function(){
  loader.style.display = 'none';
})