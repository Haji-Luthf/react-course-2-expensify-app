//
// Object Destructuring
//

const person = {
    name: 'Hajira',
    age: 32,
    location: {
        city: 'Bengaluru',
        temp: 28
    }
};

//const name = person.name;
//const age = person.age;
//console.log(`${person.name} is ${person.age}`);
const {name='Anonymous', age} = person; // destructuring for reusability, default in destructuring
console.log(`${name} is ${age}`);

const {city, temp: temperature = 26} = person.location; // rename and default in destructuring
if(city && temperature) {
  console.log(`It's ${temperature} in ${city}`);
}

const book = {
    title: 'Ego is the enemy',
    author: 'Ryan Holiday',
    publisher: {
      //  name: 'Penguin'
    }
};

const {name: publisherName = 'Self-Published'} = book.publisher;
console.log(publisherName);

//
// Array Destructuring
//

const address = ['15', '12th A Cross', 'BTM Stage 1', 'Bengaluru', 'Karnataka', '560029']
const [buildingNo, street, area, capital, state, zip, extra = 'some more info'] = address; // sorted ordered list with default if not present in array
//console.log(`You are in ${address[3]} ${address[4]}`);
console.log(`You are in ${capital} ${state}`);

const item = ['Coffee (hot)', '$2.0', '$4.0', '$5.0']
const [itemName,,mediumRate] = item; // No need to name the element that we don't need
console.log(`A medium ${itemName} costs ${mediumRate}`);