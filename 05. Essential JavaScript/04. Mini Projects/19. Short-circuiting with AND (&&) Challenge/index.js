const accountBalanceUsd = '$45,000,000,000 🤑💰'
const swissBankPassCodesArr = [1234,5678,9876,3434]

function authenticationCheck(passCode){
   
   return swissBankPassCodesArr.includes(passCode) && console.log(accountBalanceUsd)
/*
Challenge:
1. If the passcode passed into authenticationCheck 
   exists in swissBankPassCodesArr, authenticationCheck 
   should log out accountBalanceUsd. 
   
   If the passcode does not exist in swissBankPassCodesArr 
   then authenticationCheck need not do anything.
   
⚠️ Make sure you short-circuit with &&
   hint.md for help!
*/
}

authenticationCheck(343)