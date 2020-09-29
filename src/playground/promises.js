const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            message: 'This is my resolved data',
            code: 786
        });
       // reject('something went wrong!');
    }, 5000);
    
});

console.log('before');

promise.then((data) => { // then is called only if data is resolved and not rejected.
    console.log(1,data);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                message: 'This is my other promise',
            });
        }, 5000);
        
    });
}).then((str) => { // Promise chaining
    console.log('Chained Then:', str);
}).catch((error) => { // catch can also be used as the second argument for then in promise }, (error) => {
    console.log(error);
});

console.log('after');