'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const daysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  console.log(acc.movements);

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const day = `${date.getDate()}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const year = date.getFullYear();
    const displayDate = `${day}/${month}/${year}`;

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>      
        <div class="movements__value">${mov.toFixed(0)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${out.toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// FAKE LOGIN - TO BE DELETED AFTER
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, '0');
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const year = now.getFullYear();
    labelDate.textContent = `${day}/${month}/${year}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Add date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// Base 10: 0-9
// Binary Base 2: 0 1

// Parsing
/*
console.log(Number.parseInt('30px', 10)); // parse the string to decimal number 30
console.log(Number.parseInt('e23', 10)); // doesn't work (NaN)
console.log(Number.parseInt('0101010', 2)); // parse the binary number
console.log(Number.parseFloat('2.5rem')); // parse the floating point number
*/

// checks if a value is NaN
/*
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN(20 / 0)); // false
console.log(Number.isNaN(+'20X')); // true
*/

// checks if a value is number
/*
console.log(Number.isFinite(20)); // true
console.log(isFinite('20')); // true (Converts the value to a number before evaluating)
console.log(Number.isFinite('20')); // false (Does not converts the value to a number before evaluating)
*/

// 1. MATH AND ROUNDING
/*
console.log(Math.sqrt(25)); // 5
console.log(Math.max(5, 16, '89')); // 89 (Does type converstion, but not parsing)
console.log(Math.max(5, 16, '89', '100p')); // Nan (Does type converstion, but not parsing)
*/

// Random number between 2 values
/*
const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;

console.log(randomInt(10, 20));
*/

// Rounding integers - all the methods does type conversion
/*
console.log(Math.trunc(1.21321331)); // 1 (Removes any decilamal part)
console.log(Math.round(23.3)); // 23 (Rounds to the nearest integer)
console.log(Math.round(23.9)); // 24 (Rounds to the nearest integer)
console.log(Math.ceil(23.3)); // 24 (Rounds to the highest integer)
console.log(Math.floor(23.3)); // 23 (Rounds to the lowest integer)
*/

// Rounding decimals
/*
console.log((2.3).toFixed(0)); // '2'
console.log((2.3241414).toFixed(1)); // '2.3'
console.log((2.3241414).toFixed(2)); // '2.32'
console.log((2.3).toFixed(3)); // '2.300'
*/

// Remainder operator %
// console.log(5 % 2); // 1

// Set every even row backgraund color:
// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
//     if (i % 2 === 0) {
//       row.style.backgroundColor = 'orangered';
//     }
//   });
// });

// Numeric separetors
/*
const diameter = 287_640_000_000;
console.log(diameter);
*/

// Work with BIGINT - used to work with number biggest from MAX_SAFE_INTEGERS, BigInt and regular numbers are not compatible
/*
console.log(2 ** 53 - 1); // the biggest number with which is safely to work in JS
console.log(Number.MAX_SAFE_INTEGER); // the biggest number with which is safely to work in JS
console.log(9292929292929292929922132131231n);
console.log(BigInt(9292929292929292929922132131231n));
*/

// Creating dates
/*
const now = new Date();
console.log(now);

console.log(new Date('Mon Jun 12 2023 15:19:39')); // Parsing from a string
console.log(new Date('December 24, 2015')); // Parsing from a string
console.log(new Date(account1.movementsDates[0])); // Parsing from an object property
console.log(new Date(2037, 10, 19, 15, 23, 5)); // Parsing from an numbers (month is zero-based)

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Timestamp for day number 3!!!
 */

// Date object methods
/*
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); // Retrieve the year out of the date object
console.log(future.getMonth()); // Retrieve the month out of the date object
console.log(future.getDate()); // Retrieve the date out of the date object
console.log(future.getDay()); // Retrieve the day of the week out of the date object
console.log(future.getTime()); // Retrieve the time stamp

console.log(new Date(future.getTime())); // Creating date from the timestamp!!!
 */

// Operations with dates
/*
const future = new Date(2037, 10, 19, 15, 23);
console.log(Number(future)); // 'future' date's timestamp

const daysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24); // Coverting mileseconds to days

console.log(daysPassed(new Date(2022, 3, 14), new Date(2022, 3, 10)));
*/
