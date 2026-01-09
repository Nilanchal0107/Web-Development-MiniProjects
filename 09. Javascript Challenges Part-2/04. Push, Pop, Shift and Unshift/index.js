let largeCountries = ["Tuvalu","India","USA","Indonesia","Monaco"]

// You need to help me fixup the largeCountries array so that 
// China and Pakistan are added back into their respective places
largeCountries.pop()
largeCountries.push("Pakistan")
largeCountries.shift()
largeCountries.unshift("China")

console.log(largeCountries)
// Use push() & pop() and their counterparts unshift() & shift()