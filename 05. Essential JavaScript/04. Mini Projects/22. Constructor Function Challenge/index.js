/*
Challenge:
1. Create a constructor function called 'Character'.
2. Give it 'name' and 'collectedItemsArr' properties. 
    - 'name' should hold the character’s name.
	- 'collectedItemsArr' should hold an array of items. 
       Initialise it to an empty array.
3. Create an 'addItem' method which takes in an item as 
   a parameter and adds it to 'collectedItemsArr'.
4. The addItem method should log out a sentence like 
   `Merlin now has: wand, map, potion`.
5. Check it’s working by creating several instances of 
   Character and adding items to their arrays.
*/

function Character(name, collectedItemsArr = []){
    this.name = name
    this.collectedItemsArr = collectedItemsArr
    this.addItem = function(item){
        this.collectedItemsArr.push(item)
        console.log(`${this.name} now has: ${this.collectedItemsArr.join(', ')}`)
    }
}

const nilanchal = new Character('Nilanchal')
nilanchal.addItem('sword')
nilanchal.addItem('shield')

const merlin = new Character('Merlin')
merlin.addItem('wand')
merlin.addItem('map')
merlin.addItem('potion')