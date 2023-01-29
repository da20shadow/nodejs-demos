const db = require('../data/db.json');
const Product = require("../models/Product.old");

exports.getAllProductsPage = (req, res) => {
    const {name, category} = req.query;
    let products = db.products;
    if (name){
        products = products.filter(p => p.name.toLowerCase().includes(name.toLowerCase()))
    }

    let currentCategory;
    if (category){
        products = products.filter(p => p.category === category);
        currentCategory = category.charAt(0).toUpperCase() + category.slice(1);
    }
    res.render('products',{products, currentSearch: name, currentCategory});
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