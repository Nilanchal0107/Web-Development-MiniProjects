let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let progress = true

let player = {
    name: "Nilanchal",
    chips: 145
}

playerEl.textContent = player.name + ": $" + player.chips
function getRandomCard () {
    let getRandomNumber = Math.floor((Math.random() * 13) + 1)
    if (getRandomNumber === 1)
    {
        return 11
    }
    else if (getRandomNumber > 10)
    {
        return 10
    }
    else
    {
        return getRandomNumber
    }
}

    function start() {
    if (progress) 
    {
        progress = false
        isAlive = true
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        renderGame()
    }
}


function renderGame() {
    cardsEl.textContent = "Cards: "
    sumEl.textContent = "Sum: " + sum

    for (let i = 0; i < cards.length; i++)
    {
        cardsEl.textContent += cards[i] + " "
    }

    if (sum <= 20) 
    {
        message = "Do you want to draw a new card?"
    }
    else if (sum === 21)
    {
        message = "You've got a Blackjack!"
        hasBlackJack = true
    }
    else
    {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}

function newCard() {
    if (isAlive === true && hasBlackJack === false)
    {
        let thirdCard = getRandomCard()
        sum += thirdCard
        cards.push(thirdCard)
        renderGame()
    }
    
}

function newGame() {
    cards = []
    sum = 0
    hasBlackJack = false
    isAlive = false
    message = ""
    messageEl.textContent = "Want to play a round?"
    sumEl.textContent = "Sum: "
    cardsEl.textContent = "Cards: "
    progress = true
}






