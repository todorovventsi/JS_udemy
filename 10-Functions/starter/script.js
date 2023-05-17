'use strict';

// 1. Default Parameters
/*
If the functions is invoked without a given parameter, the default value will be set. It can be any expression.
*/
/*
const bookings = [];

const createBooking = function (
  flightNumber,
  passengersNumber = 1, // ES6 default params
  price = 199 // ES6 default params
) {
  //ES5 old
  //   passengersNumber = passengersNumber || 1; Old way to set default params
  //   price = price || 199;
  const booking = {
    flightNumber,
    passengersNumber,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('A2212');
createBooking('LH2121', undefined, 1000); // Skipping the default param
*/

// 2. Passing arguments: value vs reference
// -- In JS there is only passing by value
// -- Passing by reference is simply passign by value which contains a memory address to the HEAP
/*
const flight = 'LH2323';
const ventsi = {
    name: 'ventsislav todorov',
    passportNum: 12121123123,
};

const checkIn = function (flightNum, passenger) {
    flightNum = 'L9922'; // BAD PRACTICE!!!
    passenger.name = `Mr. ${passenger.name}`;

    if (passenger.passportNum === 12121123123) {
        return alert('Check in');
    }

    alert('wrong passport');
};

checkIn(flight, ventsi);
console.log(flight); // Primitive type, so 'flightNum' in the function is a copy of 'flight', so the original flight doesn't change
console.log(ventsi); // When we pass a reference type to a function what is copied is the reference to the object in the HEAP, so the origin object is manipulated

const newPassport = function (person) {
    person.passportNum = Math.trunc(Math.random() * 1000000);
}; // Be cereful when manipulating objects in a functions, because it can afect other parts of the code! As demonstrated below: Invoking newPassport changes the passport number of the original object

newPassport(ventsi);
checkIn(flight, ventsi);
*/

// 3. First-Class and Higher-Order Functions:
/*
-- FIRST CLASS FUNCTIONS -> JS feature because of which functions are simpy treated as values, we can store them in variables, object properties, pass them as arguments to other functions (callback), return them from other functions. Functions are type of objects in JS, so they have theirs own methods such as .call() .bind() etc. THIS IS NOT A SPECIFIC FUNCTION, BUT FEATURE OF ALL FUNCTIONS IN JS
-- HIGHER ORDER FUNCTIONS -> Either a function that recives another function as an argument, that return function or both. Possible because the JS supports 'first-class functions'. 
*/

// 3.1. Functions accepting other functions as arguments:
/*
const oneWord = function (str) {
    return str.replaceAll(' ', '').toLowerCase();
};

const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
};

const transformer = function (str, callback) {
    const result = callback(str);
    return result;
}; // Example of higher order function, that takes a function as a parameter

console.log(transformer('JavaScript is the best', oneWord)); // Passing other function as an argument (callback)

console.log(transformer('JavaScript is the best', upperFirstWord)); // Passing other function as an argument (callback)
*/

// 3.2. Functions returning functions:
/*
Functions returning functions are extremely important when using functional programming!
 
// const great = function (greeting) {
//     return function (name) {
//         console.log(`${greeting}, ${name}`);
//     };
// };
const great = greeting => name => console.log(`${greeting}, ${name}`);

const greeterHey = great('Hey');
greeterHey('Ventsi');
great('Hello')('Ventsi');
*/

// 4. The .call() and .apply() methods:
/*
Manually setting the context (this keyword)
*/

const lufthansa = {
    airline: 'Lufthanse',
    iataCode: 'LH',
    bookings: [],

    book(flightNum, name) {
        console.log(
            `${name} booked a seat on flight ${this.iataCode}${flightNum}`
        );
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    },
};

const book = lufthansa.book;

lufthansa.book(1212, 'Ventsi');
lufthansa.book(1213, 'John');
console.log(lufthansa);

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
};

// Instead of coping the book method from 'lufthansa' object into the new 'eurowings' object in order to use it, we can call it using .call(eurowings) method, passing the new object as an argument and this way change the context of the method:

book.call(eurowings, 3322, 'Vicktoria Todorova'); // Method borrowing
book.apply(eurowings, [3411, 'Ivan Todorov']); // The differance between call and apply is the way the rest arguments are passed, one by one and in an array, respectively
const data = [3434, 'Ani Todorova'];
book.call(eurowings, ...data); // SAME AS USING APPLY
console.log(lufthansa);
console.log(eurowings);

// We can also define a function outside any object and than invoke it using call and apply on different objects:
/*
const dog = {
    voice: 'Bay',
};

const cat = {
    voice: 'May',
};

const petVoice = function (obj) {
    console.log(`${this.voice}`);
    console.log(`Called on ${obj} object `);
};

petVoice.call(dog, 'Dog');
petVoice.call(cat, 'Cat');
*/

// 4. The .bind() method:
/*
-- This method RETURNS a function with preset 'this keyword' as well as arguments!
-- Binding some of the arguments to a function is a common pattern called "Partian application"
-- Using bind() in the event listener callback function, to set 'this keyword'
*/

const bookEW = book.bind(eurowings); // preset this keyword
bookEW(5566, 'Plamen Todorov');

const bookEW1111 = book.bind(eurowings, 1111); // preset this keyword and the first argoment
bookEW1111('Ivo Ivanov');

// EXAMPLE: Using .bind() with objects and event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    this.planes++;
    console.log(this.planes);
    console.log(this);
};

const btn = document.querySelector('.buy');
// btn.addEventListener('click', lufthansa.buyPlane); // this.plane is Nan here, because this points to the btn element! this points to the object from which the function is called - in this case that object is 'btn'

btn.addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // Fix to the problem above. In this scenario call and apply cannot be used, because the event handler should be refferance to a function, not function call!!!

// EXAMPLE: Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.2); // Preseting arguments where 'this keyword' is not important
console.log(addVAT(100));

// Challenge - .bind() alternative with higher-order function:
function setTaxRate(rate) {
    return function (value) {
        console.log(value + value * rate);
    };
}

const addDOD = setTaxRate(0.1);
addDOD(1000);
