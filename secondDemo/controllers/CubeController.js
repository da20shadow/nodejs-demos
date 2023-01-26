const db = require('../data/db.json');
const Product = require("../models/Product");

exports.getAllProductsPage = (req, res) => {
    res.render('products',{products: db.products});
};

exports.getCreateProductPage = (req, res) => {
    res.render('createProduct');
};

exports.saveProduct = (req, res) => {
    const {name, description, category, price} = req.body;
    const product = new Product(name,description,price,category);
    Product.save(product)
    console.log(`Product Created! ${product.name} - $${product.price}`);
    res.redirect('/products');
};