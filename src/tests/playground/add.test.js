const add = (a, b) => a + b; // function to test

test('should add two numbers', () => {
    const result = add(3,4);
    expect(result).toBe(7); // toBe works like ===
});

const generateGreeting = (name='Anonymous') => `Hello ${name}!`;
test('should generate greeting', () => {
    const result = generateGreeting('Hajira');
    expect(result).toBe('Hello Hajira!');
});

test('should generate greeting no name', () => {
    const result = generateGreeting();
    expect(result).toBe('Hello Anonymous!');
});