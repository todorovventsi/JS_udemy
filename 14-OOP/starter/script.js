'use strict';

// Examples:
// Function constructor:
/*
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create a method in a construction function!!! To do this we will use prototypes and prototype inheritance!!!
  //   this.calcAge = function () {
  //     console.log(2023 - this.birthYear);
  //   };
};

Person.hey = function () {console.log('Hey); // defining static method on the Person constructor function
}

const ventsi = new Person('Ventsi', 1992); // see p.3 in lectures!
const plamen = new Person('Plamen', 1970);
const ani = new Person('Ani', 1972);
console.log(ani instanceof Person); // this objects are instances of the Person construction function

Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
}; // Assigning a method to a construction function using its prototype

Person.prototype.species = 'Homo Sapiens'; // setting up a common property

console.log(ventsi.species, plamen.species);

console.log(ventsi.__proto__);
console.log(ventsi.__proto__.__proto__);
console.log(ventsi.__proto__.__proto__.__proto__);

console.log(Person.prototype.constructor);

const arr = [1, 2, 3];
console.log(arr.__proto__ === Array.prototype);
*/

// Examples:
// ES6 Classes:
// class expression
/*
const PersonCl = class {};

// class declaration
class PersonClass {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  calcAge() {
    console.log(2023 - this.birthYear);
  } // All the methods declared in the class body will be attached to the prototype object, and will not be copied to every instance of the class!!!

  get age() {
    return 2023 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert('Given name not valid!');
    }
  }

  get fullName() {
    return this._fullName;
  }

  // Static methods
  static hey() {
    console.log('hey');
  }
}

const jessica = new PersonClass('Jessica Adams', 1995);
const tommy = new PersonClass('TommyAdams', 1995); // Setter will prevent this name to be assigned to the object
console.log(jessica.__proto__ === PersonClass.prototype); // true
*/

// Examples:
// Getters and setters:
/*
const account = {
  owner: 'Ventsi',
  movements: [100, 100, 200, -300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest); // Don't call the method, but used as a property
account.latest = 50;
console.log(account.latest);

console.log(jessica.age);
*/

// Examples:

class Account {
  // Public fields -- attached to the class instances, not the prototype
  locale = navigator.language;

  // Private fields -- attached to the class instances, not the prototype
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    // this._movements = []; // Property not based on input || Protected property
    // this.locale = navigator.language;
  }

  // Public interface of the class:
  deposit(value) {
    this.#movements.push(value);
  }

  withdrawal(value) {
    this.#movements.push(-value);
  }

  requestLoan(value) {
    if (this.#approveLoan(value)) {
      this.deposit(value);
      console.log('Loan APPROVED!');
    }
  }

  get movements() {
    return this.#movements;
  }

  // Private methods -- used internally in the class
  #approveLoan(value) {
    return true;
  }
}

const account1 = new Account('Ventsi', 'EUR', 1111);

// Bad way to interact with properties, use methods instead!!!
// account1.movements.push(250);
// account1.movements.push(-100);
account1.deposit(100);
account1.withdrawal(10);
account1.requestLoan(1000);
console.log(account1);
console.log(account1.movements);

// LECTURES:
// 1. What is OOP
// -- Programming paradigm based on the concept of objects
// -- Objects are used to model a real-world or abstract features
// -- Objects can contain data (properties) and code (methods). By using objects we pack data and the corresponding behavior into one block.
// -- Self contained pieces of code
// -- Objects are building blocks of applications and interact with one another
// -- This interactions happen through a public interface (API): methods that the code outside of the object can access and use to communicate and manipulate object.
// -- PROS -> OOP helps organize and structure the code, makes it easy to maintain, adding new features etc.

// 1.1. Classes and Instances (traditional OOP)
// -- A class is a blue print for creating objects, based on the rules defined in it
// -- An instance is an real object, which was created from a class, in general we can initiate as many as we want instances from a class.

// 1.2. OOP Principles
// -- Abstraction - To ignore or hide details that don't matter, allowing us to get an overview perspective of the thing we are implementing, insead of messing with details that do not really matter to our implementation. This allows us to use the code in different places or even a completely different app. Abstracting the low-level details.
// -- Encapsulation - Keep some properties and methods private inside the class. Some methods can be exposed as a public interface. Private property is accessible inside the class but not from the outside. It prevents external code from accidentally manipulating internal properties/state. Allows to change internal implementation without risk of breaking external code.
// -- Inheritance - with inheritance we can avoid dublicating code when two classes have a lot of common properties and methods, one can inherit from the other (parent and child classes). Child class extends parents class. Inheritance makes all properties and methods of a certain class available to a child class, forming a hierarchical relationship between them - allows reusing common logic and to model real-world relationships. The child class can have its own properties and methods, diferent from the parent class.
// -- Polimorphism - Literally 'many shapes'. A child class can override a method it inherited from a parent class.

// 2. OOP in JS
// -- Prototypes
//      ---- All objects in JS is linked to a certain prototype objects.
//      ---- Any prototype object has methods and properties that any object linked to it can access and use. (Prototypal inheritance)
//      ---- Objects deligate behaviour to the linked prototypes objects
// -- Implemating prototypal inheritance in JS
//      ---- Construction function -> creating object from a function. This method is used for the build-in objects (Arrays, Maps, Sets etc)
//      ---- Object.create()
//      ---- ES6 classes - new 'sugar syntax', behind the scenes works just like construction functions

// 3. Construction function and the 'new' operator
// -- building an objects using functions
// -- calling a function with 'new' keyword
//      ---- 1. new empty object is created
//      ---- 2. function is called and 'this' keyword is set to this new object
//      ---- 3. the newly created object is linked to a prototype (sets __proto__ property)
//      ---- 4. returning the new object

// 4. Prototypes
// -- In JS every new declared function automatically has its own prototype object
// -- By assigning methods to a construction function prototype we put the function in only one place, instead of copying it to every new instances
// -- As the prototype is just an object, we can also set a common properties for all instances on it (For example all persons are from the Homo Sapiens spicies)

// 5. Prototypal inheritance and the prototype chain!!!

// 6. Prototypal inheritance on the Built-in objects

// 7. ES6 Classes
// -- Classes in JS do not work as in other traditinal languages, ES6 classes are just syntaxis sugar over function constructors
// -- Classes declarations and expressions are not hoisted!!!
// -- Classes are first-class citizens, meaning that can be passed and returned from functions!!!
// -- The body of a class is only executed in strict mode, even if not activated for the script!!!

// 8. Setters and getters
// -- every object in JS can have getter and setters properties
// -- functions that gets and sets values from/on the objects
// -- very useful for data validation
// -- getters
//      ---- used when we want to get value out of the object, which requires some calculation
// -- setters
//      ---- accepts only one parameter
//      ---- used like property
//      ---- if setter has a same name as a property in the constructor, its logic will be executed when the constructor try to assign the property, this way we can implement data validation before assigning a property. Using this technique we must mask the new property with _ and then use a getter to get access to it!

// 9. Static methods:
// -- Methods that are attached to the construction functions (for example Array.from(), this cannot be used on an instance like [1,2,3].from())
// -- Static methods are not inherited, because its on the construction function, not on the prototype property

// 10. Object.create() method
// -- Manually setting the prototype of the object, to any other object we want
/*
const PersonProto = {
  calculateAge() {
    console.log(2023 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const ivan = Object.create(PersonProto);
ivan.name = 'Ivan Todorov';
ivan.birthYear = 2000;
ivan.calculateAge();

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 2005);
sarah.calculateAge();
*/

// 11. Inheritance between Classes: Constructor functions
/*
const Person = function (firstName, brithYear) {
  this.firstName = firstName;
  this.brithYear = brithYear;
};

Person.prototype.calcAge = function () {
  console.log(2023 - this.brithYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`Hello, I am ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2002, 'CS');
mike.introduce();
mike.calcAge();
*/

// 12. Inheritance between objects: ES6 Classes syntax:
/*
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  calcAge() {
    console.log(2023 - this.birthYear);
  } // All the methods declared in the class body will be attached to the prototype object, and will not be copied to every instance of the class!!!

  get age() {
    return 2023 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert('Given name not valid!');
    }
  }

  get fullName() {
    return this._fullName;
  }

  // Static methods
  static hey() {
    console.log('hey');
  }
}

// 'extends' keyword links the prototypes in the background
// 'super()' is basically the construction function of the super class
// if there are no additional properties in the new class, construction function can be dropped

class Student extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear); // Always must happen first, because the super() is also responsible for setting the 'this' keyword
    this.course = course;
  }

  introduce() {
    console.log(`Hello, I am ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log('Overridden!');
  }
}

const martha = new Student('Martha Jones', 2012, 'CS');

martha.introduce(); // own method
console.log(martha.fullName); // inherited getter
martha.calcAge(); // overridden method
*/

// 12. Inheritance between objects: Object.create():

// 13. Encapsulation
// -- Preventing code outside the class to accidentally change and manipulate data inside it
// -- When only the neccesary methods are exposed and make avaibale outside the class (public) we can more confidentally change other methods in the class minimalizing the risk to breaking the code outside the class

// Coding Challenge #1
/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
/*
const Car = function (model, speed) {
  this.model = model;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`This ${this.model} is driving at ${this.speed}`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`This ${this.model} is driving at ${this.speed}`);
};

const carOne = new Car('BMW', 120);
carOne.accelerate();
carOne.accelerate();
carOne.accelerate();
carOne.brake();
*/

// Coding Challenge #2
/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
/*
class CarCl {
  constructor(model, speed) {
    this.model = model;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
  }

  get speedUS() {
    console.log(this.speed / 1.6);
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const bmw = new CarCl('bmw', 90);
bmw.speedUS = 50;
bmw.brake();
*/
