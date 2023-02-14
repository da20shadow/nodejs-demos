const Offer = require('../models/Offer');
const {errorMessages} = require("../constants");

exports.create = async (offerData,userId) => {
    offerData = {...offerData,owner:userId};
    const {name,image,price,description,category,owner} = offerData;
    if (!name || !image || !price || !description || !category || !owner) {
        throw new Error(errorMessages.invalidFields);
    }
    return Offer.create(offerData);
}

exports.update = async (offerData,userId) => {

    const offer = await Offer.findById(offerData._id);

    if (!offer){
        throw new Error(errorMessages.offerNotExist);
    }

    if (userId !== offer.owner) {
        throw new Error(errorMessages.offerNotExist);
    }

    return Offer.findByIdAndUpdate(offer._id, offer, {runValidators: true});
}

exports.getOfferById = async (offerId) => {
    return Offer.findById(offerId).lean();
}

exports.getAll = async () => {
    return Offer.find().lean();
}