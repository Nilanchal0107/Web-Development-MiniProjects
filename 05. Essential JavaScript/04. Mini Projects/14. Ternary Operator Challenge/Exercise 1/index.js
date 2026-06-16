const playerGuess = 3
const correctAnswer = 6

/*
Challenge 
1. Refactor the if else statement to use a ternary operator.
*/

const message = playerGuess === correctAnswer ? 'Correct' : 'Wrong!'

console.log(message)