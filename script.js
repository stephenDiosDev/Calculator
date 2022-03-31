console.log("Hello, World!");

//holds the input line from the calculator display
let input = "0";


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if(b == 0) {
        return NaN;
    }
    else {
        return a / b;
    }
}

testOperators();


function testOperators() {
    console.log("Beginning test");
////////////////////////////////////////////////////////////////////
    console.log("Add operator test");
    if(add(0,0) != 0) {
        console.log("add(0,0) failed")
    }

    if(add(1,0) != 1) {
        console.log("add(1,0) failed");
    }

    if(add(100, 7) != 107) {
        console.log("add(100,7) failed");
    }
////////////////////////////////////////////////////////////////////
    console.log("Subtract operator test");
    if(subtract(0,0) != 0) {
        console.log("subtract(0,0) failed")
    }

    if(subtract(1,0) != 1) {
        console.log("subtract(1,0) failed");
    }

    if(subtract(0, 1) != -1) {
        console.log("subtract(0,1) failed");
    }

    if(subtract(100, 7) != 93) {
        console.log("subtract(100,7) failed");
    }

    if(subtract(100, 100) != 0) {
        console.log("subtract(100,100) failed");
    }

    if(subtract(-5, 5) != -10) {
        console.log("subtract(-5,5) failed");
    }

    if(subtract(-5, -5) != 0) {
        console.log("subtract(-5,-5) failed");
    }
////////////////////////////////////////////////////////////////////
    console.log("Multiply operator test");
    if(multiply(0,0) != 0) {
        console.log("multiply(0,0) failed")
    }

    if(multiply(1,0) != 0) {
        console.log("multiply(1,0) failed");
    }

    if(multiply(1,5) != 5) {
        console.log("multiply(1,5) failed");
    }

    if(multiply(100, 7) != 700) {
        console.log("multiply(100,7) failed");
    }
////////////////////////////////////////////////////////////////////
    console.log("Divide operator test");
    if(!isNaN(divide(0,0))) {
        console.log("divide(0,0) failed")
    }

    if(!isNaN(divide(1,0))) {
        console.log("divide(1,0) failed");
    }

    if(divide(0,1) != 0) {
        console.log("divide(0,1) failed");
    }

    if(divide(100, 10) != 10) {
        console.log("divide(100,10) failed");
    }

    if(divide(57, 1) != 57) {
        console.log("divide(57,1) failed");
    }
////////////////////////////////////////////////////////////////////
    console.log("All tests complete");
}