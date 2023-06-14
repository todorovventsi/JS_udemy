'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

// LECTURES

// 1. HOW THE DOM WORKS:
/*
-- The DOM is the interface between the JS and the browser
-- Allows the JS to interact with the browser
-- Creating, deliting, modifying elements from the DOM with JS
-- DOM tree is created from the HMTL document
-- DOM API contains many methods and properties
-- DOM note is represented in JS as an object
-- A DOM element cannot exist more than a one time in the tree, if dublication is needed we need to clone the element
*/

// 2. SELECTING, CREATING AND DELITING ELEMENTS
/*
-- node list vs. html collection -> html collection is a so called live collection, meaning that if there is a change on the DOM, this change will affect the collection
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
