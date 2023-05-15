'use strict';

const jessica = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
};

const marriedJessica = jessica;

marriedJessica.lastName = 'Davis';

console.log(`Before: ${jessica.lastName}`);
console.log(`After: ${marriedJessica.lastName}`);

const jessica2 = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';

console.log(`Before: ${jessica2.lastName}`);
console.log(`After: ${jessicaCopy.lastName}`);
