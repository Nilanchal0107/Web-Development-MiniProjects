const playerGuess = 6
const correctAnswer = 6

/*
Challenge
1. Now improve the functionality of this code by 
   letting the player know if their guess was too high, 
   too low, or exactly right.
*/

const message = playerGuess === correctAnswer ? 'Correct!' : 
    playerGuess > correctAnswer ? 'too high ' 
    : 'too low' 

console.log(message)