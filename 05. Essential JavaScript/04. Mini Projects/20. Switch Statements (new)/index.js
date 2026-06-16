/**
 * Price List
 * Coffee $2
 * Sandwiches $5
 * Salad $4
 * Lemon Cake $3
*/

// For example: "You selected Salad. That will be $4"

function selectItem(item) {
    let price = 0
/*
Challenge:
1.  Add the remaining price list items as cases.
*/    
    switch(item) {
        case 'coffee':
            price = 2
            break
        case 'sandwiches':
            price = 5
            break
        case 'salad':
            price = 4
            break
        case 'lemon cake':
            price = 3
            break
        default:
            price = 0
    }
    return `You selected ${item}. That will be $${price}`
}

console.log(selectItem('biscuits'))