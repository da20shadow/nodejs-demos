const mongoose = require('mongoose');
const {get} = require("mongoose");

//Custom Validations
productSchema.path('name').validate(function () {
    return !this.name.startWith('N');
}, 'The must start with (N)!');

//Schema model and Validations
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        maxLength: 75,
        trim: true,
        required: [true, 'The product name is required!!!'],
    },
    description: String,
    price: {
        type: Number,
        min: 0.10,
        max: 100000,
        required: true,
    },
    category: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
});

const Product = mongoose.model('Product', productSchema);

//Adding additional methods
productSchema.methods.printDetails = function () {
    console.log(`Product name: ${this.name} - price: ${this.price}`);
};

//Virtual property (using to print some info for example full name by getting first and last names!)
productSchema.virtual('info').get(function () {
    return `${this.name} cost ${this.price}, and is in category: ${this.category}`;
});

async function main(){
    mongoose.set('strictQuery', false);
    await mongoose.connect('mongodb://127.0.0.1:27017/store');

    // await saveProduct('Predator GTX 450', 'Top Camera', 124.99, 'cameras');

    const products = await getAllProducts();
    products.forEach(p => {
        p.printDetails();
        console.log(p.info);
    });
}

async function saveProduct(name,description,price,category){
    await Product.create({
        name,
        description,
        price,
        category,
    });
    // const product = new Product({
    //     name,
    //     description,
    //     price,
    //     category
    // });
    // await product.save();
}

async function getAllProducts(){
    //Read from DB
    const products = await Product.find();
    console.log(products);
}

main();