'use strict';

///////////////////////////////////////
// Selections
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');

const sections = document.querySelectorAll('.section');
const sectionOne = document.querySelector('#section--1');

const nav = document.querySelector('.nav');

const header = document.querySelector('.header');

const images = document.querySelectorAll('.features__img');

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

[...btnsOpenModal].forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// PAGE NAVIGATION

// document.querySelectorAll('.nav__link').forEach(link =>
//   link.addEventListener('click', function (e) {
//     e.preventDefault();
//     const section = document.querySelector(link.getAttribute('href'));
//     section.scrollIntoView({ behavior: 'smooth' });
//   })
// ); // This adds the callback function on each of the elements, better way is to use event delegation on a parent element (AS BELOW)!!!

// linking
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('btn--show-modal')) return;
  const section = document.querySelector(e.target.getAttribute('href'));
  section.scrollIntoView({ behavior: 'smooth' });
}); // This delegation strategy applies the callback function at only one place (common parent element)

// manu fade animation
const handleHover = function (e) {
  if (!e.target.classList.contains('nav__link')) return;

  const opacity = this; // Just for clarifucation (see the event listener callback!)
  const link = e.target;
  const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('.nav__logo');

  [...siblings, logo].forEach(el => {
    if (el !== link) el.style.opacity = opacity;
  });
};

// sticky navigation
// option 1 - scroll event on the window object -- BAD PERFORMANCE!!!
/*
const coords = sectionOne.getBoundingClientRect().top;
window.addEventListener('scroll', function (e) {
  if (this.window.scrollY >= coords) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
*/
// option 2 - using intersection observer API
const applyStickyNav = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`, // height of the navigation
};

const headerObserver = new IntersectionObserver(applyStickyNav, options);
headerObserver.observe(header);

// const handleMouseOver = function (e) {
//   if (!e.target.classList.contains('nav__link')) return;

//   const link = e.target;
//   const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//   const logo = link.closest('.nav').querySelector('.nav__logo');

//   [...siblings, logo].forEach(el => {
//     if (el !== link) el.style.opacity = 0.5;
//   });
// };

// const handleMouseOut = function (e) {
//   if (!e.target.classList.contains('nav__link')) return;

//   const link = e.target;
//   const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//   const logo = link.closest('.nav').querySelector('.nav__logo');

//   [...siblings, logo].forEach(el => (el.style.opacity = 1));
// };

nav.addEventListener('mouseover', handleHover.bind(0.5)); // changing the 'this' keywords with the opacity value
nav.addEventListener('mouseout', handleHover.bind(1));

// SMOOTH SCROLING

// Old way - manually calculationg positions:
/*
btnScrollTo.addEventListener('click', e => {
  const sectionOneCoords = sectionOne.getBoundingClientRect(); // Getting the coordinates and the size of an element relative to the viewport of the page!

  // window.scrollTo(
  //   sectionOneCoords.left + window.scrollX,
  //   sectionOneCoords.top + window.scrollY
  // );

  window.scrollTo({
    left: sectionOneCoords.left + window.scrollX,
    top: sectionOneCoords.top + window.scrollY,
    behavior: 'smooth',
  });
});
*/
// Better way!: - the calculations are done by the scrollIntoView() functon
btnScrollTo.addEventListener('click', e => {
  sectionOne.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// TABBED COMPONENT

const handleOperationsTabChange = function (e) {
  const clickedTab = e.target.closest('.operations__tab');

  if (!clickedTab) return; // Gueard clause

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clickedTab.classList.add('operations__tab--active');

  // activate the content area:
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clickedTab.dataset.tab}`)
    .classList.add('operations__content--active');
};

tabsContainer.addEventListener('click', handleOperationsTabChange);

// REVEALING SECTION ON SCROLL
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// LAZY LOADING IMAGES - optimize perfotmance
const revealImage = function (entries, observer) {
  const [entry] = entries;
  const img = entry.target;

  if (!entry.isIntersecting) return;

  img.src = img.dataset.src;
  img.addEventListener('load', e => img.classList.remove('lazy-img'));
  observer.unobserve(img);
};

const imageObserver = new IntersectionObserver(revealImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

images.forEach(image => imageObserver.observe(image));

// SLIDER COMPONENT
let currentSlideNumber = 0;
const maxSlide = slides.length;
const minSlide = 0;

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};

// 1. Moving all the slides side by side
goToSlide(0);

// 2. Next slide
const nextSlide = function () {
  currentSlideNumber =
    currentSlideNumber === maxSlide - 1 ? 0 : currentSlideNumber + 1;

  goToSlide(currentSlideNumber);
};

btnRight.addEventListener('click', nextSlide);

// 3. Previeous slide
const previousSlide = function () {
  currentSlideNumber =
    currentSlideNumber === minSlide ? maxSlide - 1 : currentSlideNumber - 1;

  goToSlide(currentSlideNumber);
};

btnLeft.addEventListener('click', previousSlide);
// 4. Keyboard events:
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') previousSlide();
});

// 5. Dots slide navigation
const dotsContainer = document.querySelector('.dots');

const createDots = function (slide) {
  const dot = document.createElement('button');
  dot.classList.add('dots__dot');
  dot.setAttribute('data-slide', slide);
  return dot;
};

slides.forEach((_, i) => {
  dotsContainer.appendChild(createDots(i));
});

dotsContainer.addEventListener('click', e => {
  if (!e.target.classList.contains('dots__dot')) return;
  goToSlide(Number(e.target.dataset.slide));
});
///////////////////////////////////////
///////////////////////////////////////
// LECTURES

// 1. HOW THE DOM WORKS:
/*
-- The DOM is an interface between the JS and the browser
-- Allows the JS to interact with the browser
-- Creating, deliting, modifying elements from the DOM with JS
-- DOM tree is created from the HMTL document
-- DOM API contains many methods and properties
-- DOM note is represented in JS as an object
-- A DOM element cannot exist more than a one time in the tree, if dublication is needed we need to clone the element
*/

// 2. SELECTING, CREATING AND DELITING ELEMENTS
/*
-- node list vs. html collection -> html collection is a so called live collection, meaning that if there is a change on the DOM, this change will affect the collection, node list on the other hand is static and once its stored in a variable it does not change
*/

/*
console.log(document.documentElement); // Selecting the entire html document
console.log(document.head); // Selecting the head of the html document
console.log(document.body); // Selecting the body of the html document

console.log(document.querySelector('.header')); // Selecting the element with the class of 'header' | Returns the first element
console.log(document.querySelectorAll('.section')); // Selecting the elements with the class of 'section' | Returns a node list with all the elements
*/

// Creating, modifying and inserting elements:
/*
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies to improve functionality and analytics';
message.innerHTML = `We use cookies to improve functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>`;
const header = document.querySelector('.header');
header.prepend(message);
console.log(message);
*/

// 3. STYLES, ATTRIBUTES AND CLASSES
// -- Styles -> element.style.property = value || setting an inline style
//           -> getComputedStyle(element).property || reading the styles applied on element
// -- Attributes -> we can access and change elements attributes via JS
//               -> element.attributeName || reading attribute value || returns absolute URL value for 'src' and 'href'
//               -> non-standart attributes are not set as properties automaticly
//               -> element.attributeName = value || setting value to an attribute
//               -> element.getAttribute('attName); element.setAttribute('attName) || get and set attributes || using getAttribute() returns the relative URL value of 'src' and 'href'
//               -> Data Attributes - special attributes, safed in element.dataset.attName
// -- Classes -> classList (.add, .remove, .toggle, .contains)

// 4. TYPES OF EVENTS AND EVENT HANDLERS:
// -- https://developer.mozilla.org/en-US/docs/Web/Events
// -- An event is a signal generated by a DOM node - a JS object
// -- PROS of using 'addEventListener' insted of 'onevent' property:
//    -> Allows us to add multiple event listeners to the same element;
//    -> We can remove an event handler if its no more needed
// -- We can handle events using html attributes
// 4.1 Mouse enter event: - Triggered whenever a mouse enter a certain element, similar to hover in CSS
/*
const h1 = document.querySelector('h1');
const alertH1 = e => {
  console.log('ENTERED');

  h1.removeEventListener('mouseenter', alertH1); // Removing and event listener from the h1 element
};
h1.addEventListener('mouseenter', alertH1);
*/

// 4.2 Using onEvent property directly on the element | legacy method
// h1.onmouseenter = e => {
//   console.log('ENTERED');
// };

// 5. EVENT PROPAGATION: BUBBLING AND CAPTURING !!!
// -- Capturing phase - When event occurs, its captured and an event object is genereted on the document element, after that it reaches the target element, passing through all its parent elements
// -- Target phase - Starts when event reaches its target element. Event listeners waits to a certain event to happen and call the callback function.
// -- Bubbling phase - After reaches its target, the event travels back to the document element, againg passing through all the parent elements.
// -- As an event bubbles through the parents elements it is as if it happent on those elements themselfs.

//EXAMPLE EVENT BUBBLING:
/*
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(
    0,
    255
  )})`;

document.querySelector('.nav__link').addEventListener(
  'click',
  function (e) {
    setTimeout(() => {
      this.style.backgroundColor = randomColor(); // 'this' keyword in an event handler points to the element on which it si attached!
      console.log('LINK', e.target); // event target is the element on which an event occurs
      console.log(this === e.target);
    }, 1000);

    // Stop propagation
    // e.stopPropagation();
  },
  true
);

document.querySelector('.nav__links').addEventListener(
  'click',
  function (e) {
    setTimeout(() => {
      this.style.backgroundColor = randomColor();
      console.log('COINTAINER', e.target);
      console.log(this === e.target);
    }, 2000);
  },
  true
);

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    setTimeout(() => {
      this.style.backgroundColor = randomColor();
      console.log('NAV', e.target);
      console.log(this === e.target);
    }, 3000);
  },
  true
); // allows capturing phase

//TODO - On the above example use setTimeou() function to clearly visualize the difference between the capturing and bubbling phase!!!
*/

// 6. DOM TRAVERSING
/*
const h1 = document.querySelector('h1');

// downwards
console.log(h1.querySelectorAll('.highlight')); // child element
console.log(h1.childNodes); // all direct children
console.log(h1.children); // all direct children
console.log(h1.firstElementChild);
console.log(h1.lastElementChild);

// upwards
console.log(h1.parentNode); // direct parent
console.log(h1.parentElement); // direct parent
console.log(h1.closest('.header')); // closest parent element with the specified class || used for event delegation

// sideways, selecting siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
*/

// 7. PASSING ARGUMENTS TO A EVENT HANDLER

// 8. INTERSACTION OBSERVING API - the callback function is called when the target element intersect the root element!!!
/*
const observerCallback = function (entries, observer) {
  entries.forEach(entry => console.log(entry));
};

const observerOpts = {
  root: null,
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(observerCallback, observerOpts);
observer.observe(sectionOne);
 */
