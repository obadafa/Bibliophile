"use strict";

const signupmodal = document.querySelector(".signupmodal");
const signinmodal = document.querySelector(".signinmodal");
const signupoverlay = document.querySelector(".signupoverlay");
const signinoverlay = document.querySelector(".signinoverlay");

const btnCloseSignupModal = document.querySelector(".btn--close-signupmodal");
const btnsOpenSignupModal = document.querySelectorAll(".btn--show-signupmodal");
const btnCloseSigninModal = document.querySelector(".btn--close-signinmodal");
const btnsOpenSigninModal = document.querySelectorAll(".btn--show-signinmodal");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();

  section1.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////
// Modal window

// Sign up model
const openSignupModal = function (e) {
  e.preventDefault();
  signupmodal.classList.remove("hidden");
  signupoverlay.classList.remove("hidden");
};

// Sign in window
const closeSignupModal = function () {
  signupmodal.classList.add("hidden");
  signupoverlay.classList.add("hidden");
};

btnsOpenSignupModal.forEach((btn) =>
  btn.addEventListener("click", openSignupModal)
);

btnCloseSignupModal.addEventListener("click", closeSignupModal);
signupoverlay.addEventListener("click", closeSignupModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !signupmodal.classList.contains("hidden")) {
    closeSignupModal();
  }
});

const openSigninModal = function (e) {
  e.preventDefault();
  signinmodal.classList.remove("hidden");
  signinoverlay.classList.remove("hidden");
};

const closeSigninModal = function () {
  signinmodal.classList.add("hidden");
  signinoverlay.classList.add("hidden");
};

btnsOpenSigninModal.forEach((btn) =>
  btn.addEventListener("click", openSigninModal)
);

btnCloseSigninModal.addEventListener("click", closeSigninModal);
signinoverlay.addEventListener("click", closeSigninModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !signinmodal.classList.contains("hidden")) {
    closeSigninModal();
  }
});

///////////////////////////////////////
// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

// Passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

///////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// const bookViewer = () => {
//   location.replace("/book-viewer");
// }
