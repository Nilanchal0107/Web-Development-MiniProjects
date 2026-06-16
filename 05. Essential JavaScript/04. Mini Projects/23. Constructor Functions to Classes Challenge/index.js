/*
Challenge:
Rebuild this constructor function as a class.
*/

class Character {
    constructor(name) {
        this.name = name
        this.collectedItemsArr = []
    }

    addItem(item) {
        this.collectedItemsArr.push(item)
        console.log(`${this.name} now has: ${this.collectedItemsArr.join(', ')}`)
    }
}

const wizard = new Character('Merlin')
wizard.addItem('a wand')
