let homeScore = document.getElementById("home-score")
let guestScore = document.getElementById("guest-score")

let HScore = 0
let GScore = 0

function addHomeScore1() {
    HScore += 1
    homeScore.textContent = HScore
}

function addGuestScore1() {
    GScore += 1
    guestScore.textContent = GScore
}

function addHomeScore2() {
    HScore += 2
    homeScore.textContent = HScore
}

function addGuestScore2() {
    GScore += 2
    guestScore.textContent = GScore
}

function addHomeScore3() {
    HScore += 3
    homeScore.textContent = HScore
}

function addGuestScore3() {
    GScore += 3
    guestScore.textContent = GScore
}

function newGame() {
    GScore = 0
    HScore = 0
    guestScore.textContent = GScore    
    homeScore.textContent = HScore
}