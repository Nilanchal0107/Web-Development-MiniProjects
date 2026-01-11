let data = [
    {
        player: "Jane",
        score: 52
    }, 
    {
        player: "Mark",
        score: 41
    }
]

let score = document.getElementById("score")
// Fetch the button from the DOM, store it in a variable
// Use addEventListener() to listen for button clicks
// Log Jane's score when the button is clicked (via data)

score.addEventListener("click", function() {
    score.innerHTML += " " + data[0].score
})