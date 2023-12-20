// 1. Creates a class with two properties
// 2. Creates a new instance of the class
// 3. Logs the value of the instance to the console

// Commands: npm i -g typescript ts-node
// Command: tsc index.ts to compile
// Command: ts-node index.ts to run without compiling
// Command: node index.jsx to run compiled js's

// 1. Create a class ComplexNumber with two properties: realPart and imaginaryPart.
class ComplexNumber {
    realPart: number = 0;
    imaginaryPart: number = 0;
    constructor(realPart: number, imaginaryPart: number) {
        this.realPart = realPart;
        this.imaginaryPart = imaginaryPart;
    }
}

// 2. Create a variable i of type ComplexNumber and assign it the value of a new instance of the ComplexNumber class.
const i: ComplexNumber = new ComplexNumber(1, 2);

// 3. Log the value of i to the console.
console.log(`${i.realPart} + ${i.imaginaryPart}i`);
