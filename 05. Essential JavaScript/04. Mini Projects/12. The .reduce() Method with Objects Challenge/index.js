import { itemsBoughtArr } from '/itemsBoughtArr.js'

function calculateTotalCost(itemsBoughtArr){
/*
Challenge:
1. Use the reduce method to calculate the total 
   cost of items which have been bought.
*/
    const total = itemsBoughtArr.reduce(function(total, currentItem){
        return total + currentItem.price
    }, 0)
    return total
}

console.log(calculateTotalCost(itemsBoughtArr))