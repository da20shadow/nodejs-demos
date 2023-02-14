//TODO: change the name of the controller and view offers folder
const router = require('express').Router();
const offerService = require('../services/offerService');
const {isAuthenticated} = require('../middlewares/authMiddleware');
const {errorMessages} = require("../constants");

// TODO: change the URL path: /offers
router.get('/:offerId/details', async (req, res) => {
    const offerId = req.params.offerId;
    try {
        const offer = await offerService.getOfferById(offerId);
        return res.render('offers/details', {offer});
    } catch (err) {
        return res.redirect('/404');
    }
});

router.get('/create', isAuthenticated, (req, res) => {
    res.render('offers/create');
});

router.post('/create', isAuthenticated, async (req, res) => {
    //TODO:
    const offerData = req.body;
    try {
        await offerService.create(offerData, req.user._id);
    } catch (err) {
        return res.status(400)
            .render('offers/create', {error: errorMessages.getThrowErrorMessage(err)});
    }
    res.redirect('/offers');
});

router.get('/:offerId/edit', isAuthenticated, async (req, res) => {
    const offerId = req.params.offerId;
    try {
        const offer = await offerService.getOfferById(offerId);
        return res.render('offers/edit', {offer});
    } catch (err) {
        return res.redirect('/404');
    }
});

router.post('/:offerId/edit', isAuthenticated, async (req, res) => {
    //TODO:
    let offerData = req.body;
    try {
        offerData = {...offerData, _id: req.params.offerId};
        const updatedOffer = await offerService.update(offerData, req.user._id);
        return res.render('offers/edit', {offer: updatedOffer})
    } catch (err) {
        return res.render('offers/edit', {error: errorMessages.getThrowErrorMessage(err)})
    }
});

router.get('/delete', isAuthenticated, (req, res) => {
    res.render('offers/delete');
});

router.post('/delete', isAuthenticated, (req, res) => {
    //TODO:
    res.render('offers/delete');
});


router.get('', async (req, res) => {
    try {
        const offers = await offerService.getAll();
        console.log(offers)
        return res.render('offers/all', {offers});
    } catch (err) {
        return res.render('offers/all', {error: errorMessages.getThrowErrorMessage(err)});
    }
});

module.exports = router;