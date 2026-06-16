export async function getCurrentWeather() {
    const weather = {
        temperature: "75",
        unit: "F",
        forecast: "sunny"
    }
    return JSON.stringify(weather)
}

export async function getLocation() {
    return "San Diego, CA"
}
