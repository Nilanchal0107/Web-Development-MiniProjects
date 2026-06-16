const jobHunter = {
    name: 'Tom Chant',
    username: 'TChant44',
    workLocation: 'Europe',
    }
    
/*
Challenge:
1. Make it so that if the jobHunter object does not have 
   a name property, the username is used instead.
*/

const { name, username } = jobHunter
    
// Complete this line of code 👇
const jobHunterName = name || username

console.log(`Hey ${jobHunterName}!`)