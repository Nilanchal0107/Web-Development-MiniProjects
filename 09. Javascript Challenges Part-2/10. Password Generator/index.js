let characters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s',
    't','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
    'Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9','!','@','#',
    '$','%','^','&','*','(',')','-','_','=','+','[',']','{','}',';',':',',','.','<','>','?','/']

let answer1 = document.getElementById("password1")
let answer2 = document.getElementById("password2")

function generatePassword() {
    answer1.textContent = ""
    answer2.textContent = ""
    for (let i = 0; i < 15; i++)
        {
            let a = Math.floor(Math.random() * characters.length)            
            let b = Math.floor(Math.random() * characters.length)            

            answer1.textContent += characters[a]
            answer2.textContent += characters[b]
        }
}

function copyPassword1() {
    // Save the original password
    let originalPassword = answer1.textContent
    
    // Copy to clipboard
    navigator.clipboard.writeText(originalPassword)
    
    // Show "Copied!" feedback
    answer1.textContent = "Copied!"
    
    // Restore password after 2 seconds
    setTimeout(function() {
        answer1.textContent = originalPassword
    }, 2000)
}

function copyPassword2() {
    // Save the original password
    let originalPassword = answer2.textContent
    
    // Copy to clipboard
    navigator.clipboard.writeText(originalPassword)
    
    // Show "Copied!" feedback
    answer2.textContent = "Copied!"
    
    // Restore password after 2 seconds
    setTimeout(function() {
        answer2.textContent = originalPassword
    }, 2000)

}

