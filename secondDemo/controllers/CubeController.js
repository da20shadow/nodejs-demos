const db = require('../data/db.json');
const Product = require("../models/Product");

exports.getAllProductsPage = (req, res) => {
    res.render('products',{products: db.products});
};

exports.getProductDetailsPage = (req, res) => {
    const productId = Number(req.params.id);
    if (!productId) { return res.redirect('404');}
    const product = db.products.find(p => p.id === productId);
    if (!product){ return res.redirect('404'); }
    res.render('productDetails', {product});
}

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