// const db = require('../data/db.json');
// const Product = require("../models/Product.old");
const Product = require('../models/Product');

exports.getAllProductsPage = async (req, res) => {
    const {name, category} = req.query;
    let products = await Product.find().lean();
    console.log(products)
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

exports.getProductDetailsPage = async (req, res) => {
    const productId = req.params.id;
    if (!productId) { return res.redirect('404');}
    const product = await Product.findById(productId).lean();
    console.log('product: ',product);
    if (!product){ return res.redirect('404'); }
    res.render('productDetails', {product});
}

exports.getCreateProductPage = (req, res) => {
    res.render('createProduct');
};

exports.saveProduct = async (req, res) => {
    const {name, description, imgUrl,category, price} = req.body;
    const product = new Product({name, description, imgUrl,price, category});
    await product.save();
    console.log(`Product Created! ${product.name} - $${product.price}`);
    res.redirect('/products');
};