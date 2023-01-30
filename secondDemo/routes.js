const productController = require("./controllers/CubeController");
const accessoryController = require('./controllers/AccessoryController');
const staticPagesController = require("./controllers/StaticPageController");
const router = require('express').Router();

router.get('/', staticPagesController.getHomePage);

router.get('/products', productController.getAllProductsPage);

router.get('/add-product', productController.getCreateProductPage);

router.post('/save-product', productController.saveProduct);

router.get('/product/:id', productController.getProductDetailsPage);

router.get('/product/:id/attach', productController.getAttachAccessory);

//If path starts with /accessory send it to accessoryController
router.use('/accessory', accessoryController);

router.get('**', staticPagesController.get404Page);

module.exports = router;