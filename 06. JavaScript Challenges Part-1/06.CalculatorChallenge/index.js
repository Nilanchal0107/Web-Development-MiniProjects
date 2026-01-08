let num1 = 8
let num2 = 2
document.getElementById("num1-el").textContent = num1
document.getElementById("num2-el").textContent = num2

let answer = document.getElementById("sum-el")

// Create four functions: add(), subtract(), divide(), multiply()
// Call the correct function when the user clicks on one of the buttons
// Perform the given calculation using num1 and num2
// Render the result of the calculation in the paragraph with id="sum-el"

function add() {
    let ans = num1 + num2
    answer.textContent = "Sum: " + ans
}

function subtract() {
    let ans = num1 - num2
    answer.textContent = "Difference: " + ans
}

function divide() {
    let ans = num1 / num2
    answer.textContent = "Division: " + ans
}

function multiply() {
    let ans = num1 * num2
    answer.textContent = "Multiplication: " + ans
}
// E.g. if the user clicks on the "Plus" button, you should render
// "Sum: 10" (since 8 + 2 = 10) inside the paragraph with id="sum-el"