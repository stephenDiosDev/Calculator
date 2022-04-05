console.log("Hello, World!");

//holds the input line from the calculator display
let input = "";

updateDisplay("0");
applyListeners();


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


function operate(op, a, b) {
    if(op == "+") {
        return add(a,b);
    }
    else if(op == "-") {
        return subtract(a,b);
    }
    else if(op == "*") {
        return multiply(a,b);
    }
    else if(op == "/") {
        return divide(a,b);
    }
}

function updateDisplay(newChar) {
    let display = document.querySelector(".display-text");
    if(newChar == "C") {
        input = "0";
        newChar = "";
    }
    else if(input == "0") {
        input = newChar;
        newChar = "";
    }
    input += newChar;

    const pairWithOp = /^[0-9]+[.]?[0-9]*[+\-*\/]{1}[0-9]+[.]?[0-9]*[+\-*\/=]{1}$/gm;
    if(input.match(pairWithOp)) {
        let ops = input.match(/[+\-*\/=]/gm);   //both ops in calculator
        let pair = input.substring(0, input.lastIndexOf(ops[1]));
        let currentOperator = ops[0];
        let arr = pair.split(currentOperator);

        let result = operate(currentOperator, +arr[0], +arr[1]);
        result = roundNumber(result);
        console.log("Result: " + result);

        input = result.toString();
    }

    display.textContent = input;
}

//caps precision to 6, returns the result but does not add precision
function roundNumber(num) {
    return parseFloat(num.toFixed(6));
}

function applyListeners() {
    let keypad = document.querySelector(".keypad");
    let rows = keypad.getElementsByClassName("row");

    //apply a listener that console logs the button text
    for(let i = 0; i < rows.length; i++) {
        let row = rows[i].childNodes;
        
        row.forEach(node => {
            if(node.localName == "button") {
                node.addEventListener("mousedown", function(e) {
                    node.style.backgroundColor = "#999999";
                    updateDisplay(node.textContent);
                });

                node.addEventListener("mouseup", function(e) {
                    node.style.backgroundColor = "#E5E5E5";
                });

            }
        })
    }

}


function testOperators() {
    console.log("Beginning test");
////////////////////////////////////////////////////////////////////
    console.log("Add operator test");
    if(operate("+",0,0) != 0) {
        console.log("add(0,0) failed")
    }

    if(operate("+",1,0) != 1) {
        console.log("add(1,0) failed");
    }

    if(operate("+",100, 7) != 107) {
        console.log("add(100,7) failed");
    }
////////////////////////////////////////////////////////////////////
    console.log("Subtract operator test");
    if(operate("-",0,0) != 0) {
        console.log("subtract(0,0) failed")
    }

    if(operate("-",1,0) != 1) {
        console.log("subtract(1,0) failed");
    }

    if(operate("-",0, 1) != -1) {
        console.log("subtract(0,1) failed");
    }

    if(operate("-",100, 7) != 93) {
        console.log("subtract(100,7) failed");
    }

    if(operate("-",100, 100) != 0) {
        console.log("subtract(100,100) failed");
    }

    if(operate("-",-5, 5) != -10) {
        console.log("subtract(-5,5) failed");
    }

    if(operate("-",-5, -5) != 0) {
        console.log("subtract(-5,-5) failed");
    }
////////////////////////////////////////////////////////////////////
    console.log("Multiply operator test");
    if(operate("*",0,0) != 0) {
        console.log("multiply(0,0) failed")
    }

    if(operate("*",1,0) != 0) {
        console.log("multiply(1,0) failed");
    }

    if(operate("*",1,5) != 5) {
        console.log("multiply(1,5) failed");
    }

    if(operate("*",100, 7) != 700) {
        console.log("multiply(100,7) failed");
    }
////////////////////////////////////////////////////////////////////
    console.log("Divide operator test");
    if(!isNaN(operate("/",0,0))) {
        console.log("divide(0,0) failed")
    }

    if(!isNaN(operate("/",1,0))) {
        console.log("divide(1,0) failed");
    }

    if(operate("/",0,1) != 0) {
        console.log("divide(0,1) failed");
    }

    if(operate("/",100, 10) != 10) {
        console.log("divide(100,10) failed");
    }

    if(operate("/",57, 1) != 57) {
        console.log("divide(57,1) failed");
    }
////////////////////////////////////////////////////////////////////
    console.log("All tests complete");
}