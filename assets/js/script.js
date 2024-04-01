"use strict";

// preload * loading will be end after document is loaded
const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

// add evenet listener on multiple elements

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
};

// nabvar

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);
// end navbar

// header
// top button

const header = document.querySelector("[data-header]");
const backtopbtn = document.querySelector("[backtop]");
let lastScrollPos = 0;

const hideheader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backtopbtn.classList.add("active");
    hideheader();
  } else {
    header.classList.remove("active");
    backtopbtn.classList.remove("active");
  }
});
// end header

// hero

const heroslider = document.querySelector("[data-hero-slider]");
const heroslideritems = document.querySelectorAll("[data-hero-slider-item]");
const herosliderprevbtn = document.querySelector("[data-prev-btn]");
const heroslidernextbtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let LastActiveSliderItem = heroslideritems[0];

const updateSliderPos = function () {
  LastActiveSliderItem.classList.remove("active");
  heroslideritems[currentSlidePos].classList.add("active");
  LastActiveSliderItem = heroslideritems[currentSlidePos];
};

const slidenext = function () {
  if (currentSlidePos >= heroslideritems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }
  updateSliderPos();
};

heroslidernextbtn.addEventListener("click", slidenext);

const slidprev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroslideritems.length - 1;
  } else {
    currentSlidePos--;
  }
  updateSliderPos();
};

herosliderprevbtn.addEventListener("click", slidprev);

// auto slide

let autoslideinterveal;

const autoslide = function () {
  autoslideinterveal = setInterval(function () {
    slidenext();
  }, 7000);
};

addEventOnElements(
  [heroslidernextbtn, herosliderprevbtn],
  "mouseover",
  function () {
    clearInterval(autoslideinterveal);
  }
);

addEventOnElements(
  [heroslidernextbtn, herosliderprevbtn],
  "mouseout",
  autoslide
);

window.addEventListener("load", autoslide);
// end hero

// about
// parallax effect  data-parallax-item  data-parallax-speed

const parallaxitem = document.querySelectorAll("[data-parallax-item]");

let x, y;

window,
  addEventListener("mousemove", function (eventt) {
    x = (eventt.clientX / window.innerWidth) * 10 - 5;
    y = (eventt.clientY / window.innerHeight) * 10 - 5;

    // reverse the number eg.20 -> 20 , -5 -> 5

    x = x - x * 2;
    y - y - y * 2;

    for (let i = 0, len = parallaxitem.length; i < len; i++) {
      x = x * Number(parallaxitem[i].dataset.parallaxSpeed);
      y = y * Number(parallaxitem[i].dataset.parallaxSpeed);

      parallaxitem[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    }
  });
// end about
