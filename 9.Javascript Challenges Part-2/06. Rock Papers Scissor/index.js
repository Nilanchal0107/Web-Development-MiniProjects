let hands = ["rock", "paper", "scissor"]

// Create a function that returns a random item from the array
function hand() {
    let i = Math.floor((Math.random()) * 3)
    console.log(hands[i])
}

hand()

