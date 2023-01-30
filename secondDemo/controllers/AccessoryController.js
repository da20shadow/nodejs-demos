const router = require('express').Router();
const Accessory = require('../models/Accessory')

//URL: /accessory/create
router.get('/create', (req, res) => {
    res.render('accessory/create');
});

router.post('/create', async (req, res) => {
    const {name,description,category,price,imgUrl} = req.body;

    const createdAccessory = await Accessory.create({name, description, category, price, imgUrl});

    console.log('Created Accessory: ',createdAccessory);

    res.redirect('/');
});

module.exports = router;