// When the user clicks the purchase button, render out
// "Something went wrong, please try again" in the paragraph
// that has the id="error".

let errorMessage = document.getElementById("error")

function message() {
    errorMessage.textContent = "Something went wrong, please try again"
}