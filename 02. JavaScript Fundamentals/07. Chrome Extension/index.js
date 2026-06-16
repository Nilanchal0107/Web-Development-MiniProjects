/****************************************************
 * MAIN ARRAY (SOURCE OF TRUTH)
 ****************************************************/

// This array stores all leads inside JavaScript
// We always add, remove, and render from THIS array
let myLeads = []

/****************************************************
 * GET REQUIRED HTML ELEMENTS
 ****************************************************/

const inputEl  = document.getElementById("input-el")   // input box
const inputBtn = document.getElementById("input-btn")  // save input button
const ulEl     = document.getElementById("ul-el")      // list container

const tabBtn    = document.getElementById("tab-btn")   // save tab button
const deleteBtn = document.getElementById("delete-btn")// delete all button

/****************************************************
 * LOAD DATA FROM LOCAL STORAGE (IF ANY)
 ****************************************************/

// localStorage stores ONLY strings
// So we convert string back to array using JSON.parse
const storedLeads = JSON.parse(localStorage.getItem("myLeads"))

// If data exists in localStorage
if (storedLeads) {
    myLeads = storedLeads       // copy data into main array
    render(myLeads)             // show it on the page
}

/****************************************************
 * SAVE INPUT VALUE
 ****************************************************/

inputBtn.addEventListener("click", function () {

    // Do nothing if input is empty
    if (inputEl.value === "") return

    // Add input value to array
    myLeads.push(inputEl.value)

    // Clear input box for better UX
    inputEl.value = ""

    // Save updated array to localStorage
    localStorage.setItem(
        "myLeads",
        JSON.stringify(myLeads)
    )

    // Update UI
    render(myLeads)
})

/****************************************************
 * SAVE CURRENT TAB URL
 ****************************************************/

tabBtn.addEventListener("click", function () {

    chrome.tabs.query(
        { active: true, currentWindow: true },
        function (tabs) {

            // Save current tab URL
            myLeads.push(tabs[0].url)

            // Save to localStorage
            localStorage.setItem(
                "myLeads",
                JSON.stringify(myLeads)
            )

            // Update UI
            render(myLeads)
        }
    )
})

/****************************************************
 * DELETE ALL LEADS
 ****************************************************/

deleteBtn.addEventListener("dblclick", function () {

    // Remove everything from localStorage
    localStorage.clear()

    // Reset array
    myLeads = []

    // Clear UI
    ulEl.innerHTML = ""
})

/****************************************************
 * RENDER FUNCTION (DISPLAY LEADS)
 ****************************************************/

function render(leads) {

    // Build HTML in memory first
    let listItems = ""

    // Loop through leads array
    for (let i = 0; i < leads.length; i++) {

        listItems += `
            <li>
                <a target="_blank" href="${leads[i]}">
                    ${leads[i]}
                </a>
            </li>
        `
    }

    // Update DOM once
    ulEl.innerHTML = listItems
}
