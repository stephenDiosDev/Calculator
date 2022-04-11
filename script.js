console.log("Hello, World!");

//holds the input line from the calculator display
let input = "";

let currentOperator = "";

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
    if (b == 0) {
        return NaN;
    }
    else {
        return a / b;
    }
}


function operate(op, a, b) {
    if (op == "+") {
        return add(a, b);
    }
    else if (op == "-") {
        return subtract(a, b);
    }
    else if (op == "*") {
        return multiply(a, b);
    }
    else if (op == "/") {
        return divide(a, b);
    }
}

/*
        TODO
            First get the display working in the iOS style where its one
            number, then when we click an operator the display is cleared
            so we only ever show one number!


    When we click a number we set it to the leftNum
        leftNum should be always set to 0 for default
    When we click an operator, we store the current operator
        The "input" is now leftNum and currentOperator, but we never display
            the currentOperator
    When we click a new button, we must ensure it is valid (cannot do another operator)
    Now with the new operator, we enter a number and it stores this number in
        rightNum, the display should be cleared and only display rightNum
    When we click either a new operator or equals, we evaluate leftNum currentOp rightNum
        and display the results, but this is now considered leftNum, and rightNum
        and currentOperator are cleared


    Can we do a thing with input where we only display one half of the input?


    1. Enter first number
    2. Clicking the operator makes the operator button glow, but original number
        is still visible on calculator
    3. If an operator is clicked, the operator simply switches function. If
        a number is pressed, the display clears and the next number may be entered
    4. Clicking any new operator will perform the calculation and display
        the result. If we instead click a new number, it will throw out the 
        result and essentially clear the inputs.
    5. If at any point we only enter a number and operator and click a new op,
        we take the number currently displayed (maybe next number should always
            default to the displayed num)

*/
function updateDisplay(newChar) {
    let display = document.querySelector(".display-text");
    if (newChar == "C") {   //clear input
        input = "0";
        newChar = "";
    }
    //if display has 0 in it and newChar is num, overwrite 0
    else if (input == "0" && newChar.match(/[1-9]/)) {
        input = newChar;
        newChar = "";
    }

    //block longer than 8 digits
    if (input.length == 8) {
        console.log("8 CHARACTER LIMIT ON DISPLAY REACHED!");
    }

    else if (input.length < 8) {
        //decimal rules check
        if (newChar == ".") {
            if (input.includes(".")) {   //only want one decimal on display
                newChar = "";
            }

            //only want to add decimal if there is a number at the end of
            //the input, otherwise we can add a 0 with the decimal
        }


        input += newChar;

        const pairWithOp = /^[0-9]+[.]?[0-9]*[+\-*\/]{1}[0-9]+[.]?[0-9]*[+\-*\/=]{1}$/gm;
        if (input.match(pairWithOp)) {
            let ops = input.match(/[+\-*\/=]/gm);   //both ops in calculator
            let pair = input.substring(0, input.lastIndexOf(ops[1]));
            let op = ops[0];
            let arr = pair.split(op);

            let result = operate(op, +arr[0], +arr[1]);
            result = roundNumber(result);
            console.log("Result: " + result);

            input = result.toString();
        }

        display.textContent = input;
    }
}


//caps precision to 6, returns the result but does not add precision
function roundNumber(num) {
    return parseFloat(num.toFixed(8));
}

function clearOperatorColours(rows) {
    //go through all other operator nodes and 
    //turn their colour to normal
    for (let j = 0; j < rows.length; j++) {
        let jRow = rows[j].childNodes;
        jRow.forEach(jNode => {
            if (jNode.textContent.match(/[/*\-+=]/)) {
                jNode.style.backgroundColor = "#E5E5E5";
            }
        });
    }
}

function applyListeners() {
    let keypad = document.querySelector(".keypad");
    let rows = keypad.getElementsByClassName("row");

    //apply a listener that console logs the button text
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i].childNodes;

        // Apply listener to each operator
        row.forEach(node => {
            if (node.localName == "button") {
                if (node.textContent.match(/[/*\-+=]/)) {
                    node.addEventListener("mousedown", function (e) {
                        clearOperatorColours(rows);

                        //set colour for currently active operator
                        currentOperator = node.textContent;
                        node.style.backgroundColor = "#999999";
                        updateDisplay(node.textContent);

                    });

                    if (node.textContent.match(/[=]/)) {
                        node.addEventListener("mouseup", function (e) {
                            currentOperator = "";
                            node.style.backgroundColor = "#E5E5E5";
                        });
                    }
                }
                else if (node.textContent.match(/[C]/)) {
                    node.addEventListener("mousedown", function (e) {
                        clearOperatorColours(rows);
                        node.style.backgroundColor = "#999999";
                        updateDisplay(node.textContent);

                    });

                    node.addEventListener("mouseup", function (e) {
                        node.style.backgroundColor = "#E5E5E5";
                    });
                }
                else {
                    node.addEventListener("mousedown", function (e) {
                        node.style.backgroundColor = "#999999";
                        updateDisplay(node.textContent);

                    });

                    node.addEventListener("mouseup", function (e) {
                        node.style.backgroundColor = "#E5E5E5";
                    });
                }

            }
        })
    }

}


function testOperators() {
    console.log("Beginning test");
    ////////////////////////////////////////////////////////////////////
    console.log("Add operator test");
    if (operate("+", 0, 0) != 0) {
        console.log("add(0,0) failed")
    }

    if (operate("+", 1, 0) != 1) {
        console.log("add(1,0) failed");
    }

    if (operate("+", 100, 7) != 107) {
        console.log("add(100,7) failed");
    }
    ////////////////////////////////////////////////////////////////////
    console.log("Subtract operator test");
    if (operate("-", 0, 0) != 0) {
        console.log("subtract(0,0) failed")
    }

    if (operate("-", 1, 0) != 1) {
        console.log("subtract(1,0) failed");
    }

    if (operate("-", 0, 1) != -1) {
        console.log("subtract(0,1) failed");
    }

    if (operate("-", 100, 7) != 93) {
        console.log("subtract(100,7) failed");
    }

    if (operate("-", 100, 100) != 0) {
        console.log("subtract(100,100) failed");
    }

    if (operate("-", -5, 5) != -10) {
        console.log("subtract(-5,5) failed");
    }

    if (operate("-", -5, -5) != 0) {
        console.log("subtract(-5,-5) failed");
    }
    ////////////////////////////////////////////////////////////////////
    console.log("Multiply operator test");
    if (operate("*", 0, 0) != 0) {
        console.log("multiply(0,0) failed")
    }

    if (operate("*", 1, 0) != 0) {
        console.log("multiply(1,0) failed");
    }

    if (operate("*", 1, 5) != 5) {
        console.log("multiply(1,5) failed");
    }

    if (operate("*", 100, 7) != 700) {
        console.log("multiply(100,7) failed");
    }
    ////////////////////////////////////////////////////////////////////
    console.log("Divide operator test");
    if (!isNaN(operate("/", 0, 0))) {
        console.log("divide(0,0) failed")
    }

    if (!isNaN(operate("/", 1, 0))) {
        console.log("divide(1,0) failed");
    }

    if (operate("/", 0, 1) != 0) {
        console.log("divide(0,1) failed");
    }

    if (operate("/", 100, 10) != 10) {
        console.log("divide(100,10) failed");
    }

    if (operate("/", 57, 1) != 57) {
        console.log("divide(57,1) failed");
    }
    ////////////////////////////////////////////////////////////////////
    console.log("All tests complete");
}