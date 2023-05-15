'use strict';

// Data needed for a later exercise
const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section

const openingHours = {
    thu: {
        open: 12,
        close: 22,
    },
    fri: {
        open: 11,
        close: 23,
    },
    sat: {
        open: 0, // Open 24 hours
        close: 24,
    },
};

const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    openingHours, //ES6 enhanced object literals

    order(starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    }, // ESE method syntax

    // Direct destructuring an object in the function parameters
    orderDelivery({ starterIndex, mainIndex, time, address }) {
        console.log(
            `Order recived! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} at ${time} to ${address}`
        );
    },

    orderPasta(ing1, ing2, ing3) {
        console.log(`Here is your pasta with ${ing1}, ${ing2}, ${ing3}`);
    },

    orderPizza(mainIng, ...otherIng) {
        console.log(mainIng, otherIng);
    },
};

restaurant.orderDelivery({
    time: '22:30',
    address: 'Vidin, 21',
    mainIndex: 2,
    starterIndex: 1,
});

console.log(restaurant);

// 1. ARRAY DESCRUCTURING:
/*
  const arr = [2, 3, 4];

  const [a, b, c] = arr;
  console.log(a, b, c);

  let [main, secondary] = restaurant.categories;

  const [firstC, , thirdC] = restaurant.categories;
  console.log(firstC, thirdC);

  [main, secondary] = [secondary, main]; // switching values between variables
  console.log(main, secondary);
  const [starter, mainCourse] = restaurant.order(2, 0);
  console.log(starter, mainCourse);

  const nested = [2, 4, [5, 6]];
  const [i, , [j, k]] = nested;

  console.log(i, j, k);

  const [p = 1, q = 1, r = 1] = [8, 9]; // Setting default values
  console.log(p, q, r);
  */

// 2. OBJECTS DESCTUCTURING:
/*
  const { name, categories, openingHours } = restaurant; // use the exact properties names
  console.log(name, categories, openingHours);

  const { name: restaurantName, openingHours: hours } = restaurant; // change the desctructured variables names, make them different from the object's properties
  console.log(restaurant, hours);

  const { menu = [], starterMenu: starters = [] } = restaurant; // Setting default values
  console.log(menu, starters);

  let a = 111;
  let b = 999;
  const obj = { a: 27, b: 13, c: 24 };
  ({ a, b } = obj); // Mutating variables, this line won't work without the parentheses ()
  console.log(a, b);

  const {
      fri: { open, close },
  } = openingHours; // Desctructure properties from nasted objects
  console.log(open, close);
  */

// 3. THE SPREAD OPERATOR (...):
/** 
  // The spread operator takes all the values from an array and itarables an give them comma separated. You can not assign the result from spread operation into new variables.
  const data = [7, 8, 9];
  const spreadedData = [1, 2, ...data];
  console.log(spreadedData);
  console.log(...spreadedData);

  const newMenu = [...restaurant.mainMenu, 'Gnocci'];
  console.log(newMenu);

  const mainMeNuCopy = [...restaurant.mainMenu]; // Shawoll copy of the mainManu array

  const menu = [...restaurant.starterMenu, ...restaurant.mainMenu]; // Joinging two arrays

  const ingrediants = [
      prompt("Let's make pasta I1:"),
      prompt("Let's make pasta I2:"),
      prompt("Let's make pasta I3:"),
  ];

  console.log(ingrediants);

  restaurant.orderPasta(...ingrediants);
*/

// 4. REST PATTERN AND PARAMETERS:
// - same symbol as spread operator, but used on the left side
// - used to pack values into an array
/* 
  const [a, b, ...others] = [1, 2, 3, 4, 5];
  console.log(others);

  const [pizza, , risotto, ...otherFood] = [
      ...restaurant.mainMenu,
      ...restaurant.starterMenu,
  ];
  console.log(pizza, risotto, otherFood);

  const add = function (...params) {
      return params.reduce((a, b) => a + b);
  }; // Using rest operator to pack unknown numbers of arguments

  console.log(add(2, 3));
  console.log(add(2, 3, 5));
  console.log(add(1, 6, 3, 8, 1));

  restaurant.orderPizza('Mushrooms', 'Onion', 'Olives');
*/

// 5. SHORT CIRCUITING && and ||:
/** 
  //  - Use any data type, return any data type, short-circuiting
  //|| Short-Circuing
  console.log(3 || 'Ventsi'); // - || if the first value is a truthy value it will return it (returns the first truthy value or just the last one if there is no truthy)

  console.log('' || 'Ventsi');
  console.log(true || 0);
  console.log(undefined || null);

  const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;
  console.log(guest1);

  const guest2 = restaurant.numGuests || 13; // Practical use of short-circuiting - assigning value to a variable, replacing ternary operator and if-else statements
  console.log(guest2);

  //&& Short-Circuing
  console.log(0 && 'Ventsi'); // - && works exactly the oposite way of || - it returns the first falsy value in the expression
  console.log(true && false);
  console.log('Hello' && 23 && null && 'Ventsi');

  if (restaurant.orderPizza) {
      restaurant.orderPizza('musherooms', 'spinach');
  }

  restaurant.orderPizza && restaurant.orderPizza('musherooms', 'spinach'); // - Calling the function only if orderPizza exist, again replacing the if statement
*/

// 6. THE NULLISH COALESCING OPERATOR ??
/**
  restaurant.numGuests = 0;
  const guest = restaurant.numGuests || 10;
  console.log(guest);

  const guestCorrect = restaurant.numGuests ?? 10; // Works with nullish values, meaning that 0 or '' are not included
  console.log(guestCorrect);
 */

// 7. LOGICAL ASSIGNMENT OPERATORS - ||= &&= ??=
/* 
    const rest1 = {
        name: 'Capri',
        numGuests: 0,
    };

    const rest2 = {
        name: 'La Piaza',
        owner: 'Jiovanni',
    };

    // Repcale typing the whole expression rest1.numGuests = rest1.numGuests ?? 10;
    rest1.numGuests ??= 10;
    rest2.numGuests ??= 10;

    console.log(rest1.numGuests);
    console.log(rest2.numGuests);

    // rest1.owner = rest1.owner && '<ANONYMOUS>';
    rest2.owner &&= '<ANONYMOUS>'; // assign a value to a variable of it is currently truthy
    rest1.owner &&= '<ANONYMOUS>';

    console.log(rest1.owner);
    console.log(rest2.owner);
*/

// 8. LOOPING ARRAYS: FOR-OF
/*
    const manu = [...restaurant.starterMenu, ...restaurant.mainMenu];

    for (const item of manu) console.log(item); // code block is not needed for a single line code

    for (const item of manu.entries()) {
        console.log(item);
    } // 'item' is an array in the format [index, value]

    for (const [index, value] of manu.entries()) {
        console.log(`Idnex: ${index} || Value: ${value}`);
    } // decunstructing the array from 'manu.entries()' in the for expression
 */

// 9. ENHANCED OBJECT LITERALS
/*
- setting property with only variable name
- methods without function keyword
- computable property names
 */

// 10. OPTIONAL CHAINING (?.):
/*
    console.log(restaurant.openingHours.mon?.open); // .open property will be read only if .mon exist, otherwise 'undefined is returned'

    optional chaining works on methods and properties and even on arrays
*/

// 11. LOOPING OBJECTS: Object keys, values, entries
// - Using the for-of loop to iterate over the array returned from the methods: Object.keys(), Object.values(), Object.entries()
/*
    for (const day of Object.keys(openingHours)) {
        console.log(day);
    }

    for (const [day, { open, close }] of Object.entries(openingHours)) {
        console.log(day, open, close);
    }
*/

// 12. SETS:
// - Collection of unique values
// - Unordered collection
// - Iterables
/*
    const ordersSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Rissoto']);
    console.log(ordersSet);
    console.log(ordersSet.size);
    console.log(ordersSet.has('Pizza')); // checks for element in the set
    ordersSet.add('Bread'); // adding element, ignored of present already
    ordersSet.delete('Rissoto'); // deliting item
    console.log(ordersSet);
    console.log(ordersSet[0]); // dont work, no indexes

    for (const order of ordersSet) console.log(order);

    const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
    const positions = Array.from(new Set(staff)); // - Common usecase is to remove dublicate values from arrays
    const positionsDesctructed = [...new Set(staff)];

    console.log(positions);
    console.log(positionsDesctructed);
 */

// 13. MAPS: FUNDAMENTALS:
// - Data structure we can use to map data to keys
// - The keys can have any type possible
/*
    const restMap = new Map();
    restMap.set('name', 'Classico Italiano'); // set method returns the updated map!!!
    restMap.set(1, 'Florance, Italy');
    restMap.set(2, 'Lisbon, Portugal');

    // - The fact that set method returns the updated map allows us to chain them one after another!!!
    restMap
        .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
        .set('open', 11)
        .set('close', 20)
        .set(true, 'We are open :D')
        .set(false, 'We are closed');

    console.log(restMap.get('name')); // Retrieve property with get method

    const time = 8;
    console.log(
        restMap.get(time > restMap.get('open') && time < restMap.get('close'))
    );

    console.log(restMap);
*/
// 14. MAPS: ITERATION:
/*
    const question = new Map([
        ['question', 'What is the best programming language?'],
        [1, 'C'],
        [2, 'Java'],
        [3, 'JavaScript'],
        ['correct', 3],
        [true, 'Correct!'],
        [false, 'Try again'],
    ]); // Creating map with nasted arrays

    const hoursMap = new Map(Object.entries(openingHours)); // Creating map from object

    console.log(hoursMap);
    console.log(question);

    console.log(question.get('question'));
    for (const [key, value] of question) {
        if (typeof key === 'number') console.log(`Asnwer ${key}: ${value}`);
    }
    const answer = Number(prompt('Which one?'));
    console.log(question.get(answer === question.get('correct')));
*/

// 15. WHICH DATA STRUCTURE TO USE:
/*
Sources of data - from the source code, from the UI, external sources APIs
Data flow: Collection of data --> Data structure (arrays, sets, object or maps)
Data from APIs usually comes in JSON format
Non-build in structures - stacks, quees, hash tables, trees, et cetera

ARRAYS - ordered list of values and when you need to manipulate data

SETS - when work with unique values is required, when high performance is important, remove duplicates in arrays

OBJECTS - traditional kay-value data structure, easier to write and access values with . and [], when methods are needed, when working with JSON

MAPS - better performance, keys can have any type, easy to iterate, easy to compute size, when you simply need to map keys to values, when you need non string keys
*/
