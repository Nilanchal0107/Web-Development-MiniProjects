function getLabelsHtml(text, sender, ...names) {
    
    let greetings = ''
    
    names.forEach(name => 
       greetings +=  `<div class="label-card">
                         <p>Dear ${name} </p>
                         <p>${text}</p>
                         <p>Best wishes,</p>
                         <p>${sender}</p>
                     </div>`)
        
    return greetings
/*
Challenge:
1. Add parameters.
2. Update the HTML template where you 
   see **NAME**.
3. Return HTML template for each label.
*/

// `<div class="label-card">
//     <p>Dear **NAME** </p>
//     <p>${text}</p>
//     <p>Best wishes,</p>
//     <p>${sender}</p>
// </div>`
}

const text = 'Thank you for all your hard work throughout the year! 🙏🎁'
const sender = 'Tom'

document.getElementById('labels-container').innerHTML = getLabelsHtml(
    text, 
    sender, 
    'Sally',
    'Mike',
    'Rob' ,
    'Harriet'
    ) 

