let num = document.getElementById("number-box")
let mass = document.getElementById("Mass")
let length = document.getElementById("Length")
let volume = document.getElementById("Volume")

const convertBtn = document.getElementById("convert-btn")


convertBtn.addEventListener("click", function(){
    const number = Number(num.value)
    meterToFeet(number)
    litersToGallons(number)
    kilogramsToPounds(number)
})

function meterToFeet(num1) {
    let feet = (num1 * 3.281).toFixed(3)
    let meter = (num1 * 0.305).toFixed(3)

    length.innerHTML = `${num1} meters = ${feet} feet | ${num1} feet = ${meter} meters`

}

function litersToGallons(num2) {
    let gallons = (num2 * 0.264).toFixed(3)
    let liters = (num2 * 3.785).toFixed(3)

    volume.innerHTML = `${num2} liters = ${gallons} gallons | ${num2} gallons = ${liters} liters`

}

function kilogramsToPounds(num3) {
    let pounds = (num3 * 2.205).toFixed(3)
    let kilos = (num3 * 0.454).toFixed(3)

    mass.innerHTML = `${num3} kilos = ${pounds} pounds | ${num3} pounds = ${kilos} kilos`

}
