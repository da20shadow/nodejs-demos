const fileSystem = require('fs');
const path = require('path');
const db = require('../data/db.json');

class Product {

    constructor(name, description, price, category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
    }

    static save(product) {
        db.products.push(product);
        const jsonData = JSON.stringify(db,null,2);
        fileSystem.writeFileSync(path.resolve(__dirname, '../data/db.json'), jsonData);
    }

}

module.exports = Product;