const Product = require("../models/Product");
exports.getCreateProductPage = (req, res) => {
    res.render('createProduct');
};

exports.saveProduct = (req, res) => {
    const product = new Product(req.body);
    Product.save(product)
    console.log(`Product Created! ${product.name} - $ ${product.price}`);
    res.redirect('/products');
};