const productController = require("./controllers/CubeController");
const router = require('express').Router();

router.get('/', (request, response) => {
    response.render('home');
});

router.get('/add-product', productController.getCreateProductPage);

module.exports = router;