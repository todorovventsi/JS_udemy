'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements, sort = false) {
    containerMovements.innerHTML = '';

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
    movs.forEach((mov, i) => {
        const type = mov < 0 ? 'withdrawal' : 'deposit';
        const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
            i + 1
        } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}</div>
        </div>
        `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

//EVENT LISTENERS
btnLogin.addEventListener('click', handleLogin);
btnTransfer.addEventListener('click', handleTransfer);
btnClose.addEventListener('click', handleClose);

//LOGIN
let currentAccount;

function handleLogin(e) {
    e.preventDefault();

    currentAccount = accounts.find(
        acc => acc.username === inputLoginUsername.value
    );

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // display UI and welcome msg
        labelWelcome.textContent = `Welcome back, ${
            currentAccount.owner.split(' ')[0]
        }`;
        containerApp.style.opacity = 100;

        updateUI(currentAccount);

        //clear inputs
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();
    }
}

// DELETE ACC
function handleClose(e) {
    e.preventDefault();

    // get data
    const toBeDeleted = inputCloseUsername.value;
    const pin = Number(inputClosePin.value);

    if (currentAccount.username === toBeDeleted && currentAccount.pin === pin) {
        accounts.splice(
            accounts.findIndex(acc => acc.username === toBeDeleted),
            1
        );
        containerApp.style.opacity = 0;
    }
    inputCloseUsername.value = inputClosePin.value = '';
}

function updateUI(acc) {
    //display movements
    displayMovements(acc.movements);

    //display balance
    calcDisplayBalance(acc);

    //display summary
    calcDisplaySummary(acc);
}

// REQUEST LOAN
btnLoan.addEventListener('click', handleLoanRequest);

function handleLoanRequest(e) {
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);

    if (
        amount > 0 &&
        currentAccount.movements.some(mov => mov >= amount * 0.1)
    ) {
        currentAccount.movements.push(amount);
        updateUI(currentAccount);
    }

    inputLoanAmount.value = '';
}

// TRANSFER HANLDER
function handleTransfer(e) {
    e.preventDefault();

    // get data:
    const recipient = accounts.find(
        acc => acc.username === inputTransferTo.value
    );
    const amount = Number(inputTransferAmount.value);

    // check data and update users movements:
    if (amount > 0 && currentAccount.balance >= amount && recipient) {
        recipient.movements.push(amount);
        currentAccount.movements.push(-amount);
        updateUI(currentAccount);
    }

    // clear inputs:
    inputTransferTo.value = inputTransferAmount.value = '';
}

// Compute user names for all accounts, username is initials of the full name in lowercase
const createUserName = function (accs) {
    accs.forEach(acc => {
        acc.username = acc.owner
            .split(' ')
            .map(n => n.toLowerCase()[0])
            .join('');
    });
};

createUserName(accounts);

// Calculating the balance and display it:

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, value) => acc + value, 0);
    labelBalance.textContent = `${acc.balance} €`;
};

// Calculate statistics -in, out, interest

const calcDisplaySummary = function (accout) {
    let movements = accout.movements;
    const income = movements
        .filter(value => value > 0)
        .reduce((acc, value) => acc + value, 0);

    const outcome = movements
        .filter(value => value < 0)
        .reduce((acc, value) => acc + value, 0);

    const interest = movements
        .filter(value => value > 0)
        .map(value => (value * accout.interestRate) / 100)
        .reduce((acc, sum) => acc + sum, 0)
        .toFixed(2);

    labelSumInterest.textContent = `${interest} €`;
    labelSumIn.textContent = `${income} €`;
    labelSumOut.textContent = `${outcome} €`;
};

// SORT MOVEMENTS:
let sorted = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// 1. Simple array methods
/*

let arr = ['a', 'b', 'c', 'd', 'e'];

// .slice()
console.log(arr.slice(2)); // Returns new array with the extracted parts, does not mutate the original. Works similar to string.slice() method.
console.log(arr.slice()); // Create shawoll copy of the original

// .splice()
console.log(arr.splice(2)); // Returns new array with the extracted parts and remove them from the original array
console.log(arr);

// .reverse()
arr = ['a', 'b', 'c', 'd', 'e'];

let arr2 = ['j', 'i', 'h', 'g', 'f'];

arr2.reverse(); // Rerverse the array and returns a reference to the original
console.log(arr2);
*/

// 2. .at() method
/*
const arr = [23, 11, 64];
console.log(arr.at(0)); // instead of arr[0]
console.log(arr.at(-1)); // works with negative index, works with method chaining
arr.at();
*/

// 3. forEach() method
// Call the provided callback function at every element in the array, passing the element, index and the array as arguments in this exact order
// continue and break statements does not work in forEach() method
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

movements.forEach(function (value, index, arr) {
    console.log(`${value} at ${index} in ${arr}`);

    value > 0
        ? console.log(`You deposited ${value}`)
        : console.log(`You withdrawed ${Math.abs(value)}`);
});
*/

// 4. forEach() with map and sets
/*
const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map) => {
    console.log(value, key, map);
});

const currenciesUnique = new Set(['USD', 'GBT', 'EU', 'USD']);

currenciesUnique.forEach((value, key, set) => {
    console.log(value, key, set); // the sets does not have indexies or keys so value===key in this case
});
*/

// Data transformation methods:
// 5. .map() method - returns new array with the results of the applied callback functions over each element on the original array. Does not mutate the original array
// - RULE OF THUMB - We use map, when we need new array, with modified values. We use forEach, when we do not need new array, but some side-actions
/*
const euroToUsdRatio = 1.1;
const movementsEU = [200, 450, -400, 3000, -650, -130, 70, 1300];
const movementsUSD = movementsEU.map(value =>
    Math.floor(value * euroToUsdRatio)
);
console.log(movementsUSD);
*/

// 6. .filter() - returns an array with the elements of the original array which passes the condition of the callback function. The callback function must return a boolean value!
/*
const arr = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = arr.filter(function (element) {
    return element > 0;
});

const withdrawals = arr.filter(element => element < 0);

console.log(deposits, withdrawals);
 */

// 7. .reduce() method - computing all the values in the array in one single value
// arr.reduce(callback, accumulatorInitialValue)
/*
const balance = arr.reduce(function (accumulator, curr, i, arr) {
    return accumulator + curr;
}, 0);

console.log(balance);
 */

// 7. .find() method - retrieve one element of an array based on condition. Returns the first element that satisfies the condition in the callback function
/**
const arr = [200, 450, -400, 3000, -650, -130, 70, 1300];

const result = arr.find(mov => mov < 0);
console.log(result);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
 */

// 7. .findIndex() method - return the index of the element that satisfies the callback condition

// 8. .some() and .every() methods

/*
.some() - returns true if some of the array elements satisfies the condition in the callback function

.every() - returns true if every of the array elements satisfies the condition in the callback function
*/

// 9. .flat() and .flatMap() methods

// 10. Sorting arrays
/*
const owners = ['Jonas', 'Zak', 'Adam', 'Martha'];
console.log(owners.sort()); // mutetes the original array. the default sorting algo is string based (alphabeticly) and will not work properly with numbers. To sort numbers compering callback function is needed
const nums = [2, 5, 1, 30, -20, 22];
nums.sort((a, b) => a - b);
console.log(nums);
 */
// 11. More ways of creating and filling arrays

// 12. Which array method to use?

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const checkDogs = function (dataJ, dataK) {
    const dataJcleaned = dataJ.slice(1, -2);
    const allDogs = [...dataJcleaned, ...dataK];

    allDogs.forEach((age, num) => {
        const dogIs = age < 3 ? 'still a puppy' : 'an adult';
        console.log(
            `Dog number ${num + 1} is ${dogIs}, and is ${age} years old`
        );
    });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/**
const calcAverageHumanAge = function (dogsAge) {
    return dogsAge
        .map(value => (value <= 2 ? value * 2 : 16 + value * 4)) // 1. dogs to human
        .filter(value => value >= 18) // 2. exclude dogs under 18
        .reduce((acc, age, _, arr) => acc + age / arr.length, 0); // 3. calculate average
};

console.log(calcAverageHumanAge([10, 10, 10]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
 */
