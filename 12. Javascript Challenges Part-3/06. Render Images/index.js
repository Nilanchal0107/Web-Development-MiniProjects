// Create a function that renders the three team images
// Use a for loop, template strings (``), plus equals (+=)
// .innerHTML to solve the challenge.

const imgs = [
    "hip1.jpg",
    "hip2.jpg",
    "hip3.jpg"
]

let images = document.getElementById("container")

function render() {
    let image = ""
    for (let i = 0; i < imgs.length; i++)
    {
        image += `<img class="team-img" src=${imgs[i]}>`
    }

    images.innerHTML = image
}

render()