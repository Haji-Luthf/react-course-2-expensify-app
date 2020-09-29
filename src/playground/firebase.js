import * as firebase from 'firebase'; //all named exports of 'firebase' are dumped into the variable as firebase

const firebaseConfig = {
    apiKey: "AIzaSyAsXgk4EQy5OEayELULxKmgvZZRqcRumTc",
    authDomain: "expensify-9807d.firebaseapp.com",
    databaseURL: "https://expensify-9807d.firebaseio.com",
    projectId: "expensify-9807d",
    storageBucket: "expensify-9807d.appspot.com",
    messagingSenderId: "62240610581",
    appId: "1:62240610581:web:6a0b08355ec1a23131711c",
    measurementId: "G-X3RFJ6MTT7"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// ref for firebase is similar to collection in mongodb.
database.ref().set({  //set will override the data completely if ref has no arguments. set returns a promise.
    name: "Hajira Raheem",
    age: 22,
    isMarried: true,
    location: {
        city: "Bengaluru",
        country: "India"
    }
}).then(() => { // firebase promise take no arguments (resolve/reject are always undefined)
    console.log('Data is saved!');
}).catch((error) => {
    console.log('This failed. Error:', error);
});

database.ref('age').set(32); // overriding parent element
database.ref('location/city').set('New York'); // overriding child element

// adding new properties
database.ref('attributes').set({ height: 5.3, weight: 53 }).then(() => {
    console.log('Second set worked!');
}).catch((error) => {
    console.log('Things did not work for the second set. Error:', error);
});; 

console.log('I made a request to change data');

database.ref('age').remove()
  .then(() => {
    console.log("Remove succeeded.")
  })
  .catch((error) => {
    console.log("Remove failed: " + error.message)
  });

database.ref('age').set(null);

//database.ref().remove() // Wipe out the database
  //.then(() => {
    //console.log("Remove All suceeded succeeded.")
  //})
  //.catch((error) => {
    //console.log("Remove All failed: " + error.message)
  //});

//database.ref().set(null);

database.ref().update({
    name: 'Mohammed', // updating
    age: 1, // updating
    job: { // adding
        title: 'CEO',
        company: 'Amazon'
    }, 
    isMarried: null, // removing
    'location/country': 'USA' // updating nested property
});

// fetching data once
database.ref().once('value')
.then((snapshot) => {
    const val = snapshot.val();
    console.log(val);
  })
  .catch((error) => {
    console.log("Error fetching data: " + error.message)
  });

  database.ref('location').once('value')
.then((snapshot) => {
    const val = snapshot.val();
    console.log(val);
  })
  .catch((error) => {
    console.log("Error fetching data: " + error.message);
  });

  // Subscribing to data changes
  const onValueChange = database.ref().on('value', (snapshot) => {
    const val = snapshot.val();
    console.log(val);
  });

setTimeout(() => {
    database.ref('age').set(2);
}, 3500);

setTimeout(() => {
    database.ref().off(onValueChange); //Unsubscribing onValueChange. off() - unsubscribe for all subscriptions
}, 7000);

setTimeout(() => {
    database.ref('age').set(3);
}, 10500);

// Using template String to print customized message
database.ref().on('value', (snapshot) => {
    const val = snapshot.val();
    console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
  });

  database.ref('expenses').push(
    {
        description: 'Gum',
        note: '',
        amount: 195,
        createdAt: 0
    }
);

database.ref('expenses').push(
    {
        description: 'Rent',
        note: '',
        amount: 109500,
        createdAt: 4543534543
    }
);

database.ref('expenses').push(
    {
        description: 'Credit Card',
        note: '',
        amount: 4500,
        createdAt: 4234234325
    }
);

// database.ref('expenses').once('value')
// .then((snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({ // this push is for adding elements to array
//             id: childSnapshot.key, // unique key of the expense object
//             ...childSnapshot.val() // takes properties key-value pairs from the object
//         });
//     });
//     console.log(expenses);
// });

// //subscribing to change in values (new child, or edit old child) 
// database.ref('expenses').on(('value'), (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({ // this push is for adding elements to array
//             id: childSnapshot.key, // unique key of the expense object
//             ...childSnapshot.val() // takes properties key-value pairs from the object
//         });
//     });
//     console.log(expenses);
// });

//subscribing to child_removed
// database.ref('expenses').on(('child_removed'), (snapshot) => {
//     console.log(snapshot.key, snapshot.val()); // printing the removed expense
// });

//subscribing to child_changed
// database.ref('expenses').on(('child_changed'), (snapshot) => {
//     console.log(snapshot.key, snapshot.val()); // printing the changed expense
// });

//subscribing to child_added
database.ref('expenses').on(('child_added'), (snapshot) => {
    console.log(snapshot.key, snapshot.val()); // printing the added expense
});