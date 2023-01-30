// const db = require('../data/db.json');
// const Product = require("../models/Product.old");
const Product = require('../models/Product');
const Accessory = require('../models/Accessory');

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
    const product = await Product.findById(productId).populate('accessories').lean();
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

    try {
        await product.save();
    }catch (err){
        console.log('Error: ', err.message);
        return res.redirect('/add-product');
    }
    console.log(`Product Created! ${product.name} - $${product.price}`);
    res.redirect('/products');
};

exports.getAttachAccessory = async (req, res) => {
    const product = await Product.findById(req.params.id).lean();
    //Find all accessories that are not in product accessories!
    const accessoryList = await Accessory.find({_id: {$nin: product.accessories}}).lean();
    res.render('accessory/attach',{product,accessoryList});
};

exports.postAttachAccessory = async (req,res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    const accessoryId = req.body.accessory;
    product.accessories.push(accessoryId);
    try {
        await product.save();
    }catch (err){
        console.log('Error', err);
    }
    res.redirect(`/product/${productId}`);
}