const router = require('express').Router();
const petService = require('../services/petService');
const {isAuthenticated} = require('../middlewares/authMiddleware');
const {errorMessages} = require("../constants");

router.get('/:petId/details', async (req, res) => {
    const petId = req.params.petId;
    try {
        const pet = await petService.getPetById(petId);

        if (!pet) {
            return res.status(404).redirect('/404');
        }

        let isOwner = false;
        if (req.user !== undefined) {
            isOwner = pet.owner._id.toString() === req.user._id;
        }

        return res.render('pets/details', {pet, isOwner});
    } catch (err) {
        console.log(err)
        return res.redirect('/404');
    }
});

router.post('/:petId/details', isAuthenticated, async (req, res) => {
    const petId = req.params.petId;
    const {comment} = req.body;

    try {
        await petService.addComment(petId,req.user._id,comment);
        return res.status(201).redirect(`/pets/${petId}/details`);
    } catch (err){
        console.log('Error: ',errorMessages.getThrowErrorMessage(err))
        return res.status(400).redirect(`/pets/${petId}/details`);
    }

});

router.get('/create', isAuthenticated, (req, res) => {
    res.render('pets/create');
});

router.post('/create', isAuthenticated, async (req, res) => {
    const petData = req.body;
    try {
        await petService.create(petData, req.user._id);
    } catch (err) {
        return res.status(400)
            .render('pets/create', {error: errorMessages.getThrowErrorMessage(err)});
    }
    res.redirect('/pets');
});

router.get('/:petId/edit', isAuthenticated, async (req, res) => {
    const petId = req.params.petId;

    try {
        const pet = await petService.getPetById(petId);
        let isOwner = pet.owner._id.toString() === req.user._id;
        if (!isOwner) {
            return res.redirect('/404');
        }
        return res.render('pets/edit', {pet});
    } catch (err) {
        return res.redirect('/404');
    }
});

router.post('/:petId/edit', isAuthenticated, async (req, res) => {
    let petData = req.body;
    const petId = req.params.petId;
    try {
        const pet = await petService.getPetById(petId);
        let isOwner = pet.owner._id.toString() === req.user._id;
        if (!isOwner) {
            return res.redirect('/404');
        }
        petData = {...petData, _id: petId};
        await petService.update(petId, petData, req.user._id);
        return res.redirect(`/pets/${petId}/details`);
    } catch (err) {
        return res.render('pets/edit', {error: errorMessages.getThrowErrorMessage(err)});
    }
});

router.get('/:petId/delete', isAuthenticated, async (req, res) => {
    try {
        const pet = await petService.getPetById(req.params.petId);
        let isOwner = pet.owner._id.toString() === req.user._id;
        if (!isOwner) {
            return res.redirect('/404');
        }
        return res.render('pets/delete', {pet});
    } catch (err) {
        return res.redirect('/404');
    }
});

router.post('/:petId/delete', isAuthenticated, async (req, res) => {
    try {
        const pet = await petService.getPetById(req.params.petId);
        let isOwner = pet.owner._id.toString() === req.user._id;
        if (!isOwner) {
            return res.redirect('/404');
        }
        await petService.delete(pet._id);
        return res.redirect('/pets');
    } catch (err) {
        console.log(err)
        return res.redirect('/404');
    }
});

router.get('', async (req, res) => {
    try {
        const pets = await petService.getAll();
        return res.render('pets/all', {pets});
    } catch (err) {
        return res.render('pets/all', {error: errorMessages.getThrowErrorMessage(err)});
    }
});

module.exports = router;