const Pet = require('../models/Pet');
const {errorMessages} = require("../constants");

exports.create = async (petData,userId) => {
    petData = {...petData,owner:userId};
    const {name,image,age,description,location,owner} = petData;
    if (!name || !image || !age || !description || !location || !owner) {
        throw new Error(errorMessages.invalidFields);
    }
    return Pet.create(petData);
}

exports.update = async (petId, petData,userId) => {

    const pet = await Pet.findById(petId).lean();

    if (!pet){
        throw new Error(errorMessages.petNotExist);
    }

    if (userId !== pet.owner.toString()) {
        throw new Error(errorMessages.petNotExist);
    }

    let changedPet = {};
    if (pet.name !== petData.name) {
        changedPet = {...changedPet,name: petData.name}
    }

    if (pet.age !== petData.age) {
        changedPet = {...changedPet,age: petData.age}
    }

    if (pet.description !== petData.description) {
        changedPet = {...changedPet,description: petData.description}
    }

    if (pet.image !== petData.image) {
        changedPet = {...changedPet,image: petData.image}
    }

    if (pet.location !== petData.location) {
        changedPet = {...changedPet,location: petData.location}
    }

    if (Object.keys(changedPet).length === 0) {
        throw new Error('Nothing to update!');
    }

    return Pet.findByIdAndUpdate(petId, changedPet, {runValidators: true}).lean();
}

exports.delete = async (petId) => {
    return Pet.deleteOne(petId);
}

exports.addComment = async (petId, userId, comment) => {
    const post = await Pet.findById(petId);
    if (!post) {
        throw new Error(errorMessages.petNotExist);
    }
    post.commentList.push({ userID: userId, comment: comment });
    await post.save();
    return post;
}

exports.search = async (name,category) => {
    let pets = await this.getAll();

    if (name) {
        pets = pets.filter(o => o.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (category) {
        pets = pets.filter(o => o.category.toLowerCase() === category.toLowerCase());
    }

    return pets;
}

//TODO: if have time to implement search directly in DB will be better
exports.dbSearch = async (name,category) => {
    Pet.find({name: {$regex: new RegExp(name,'ig')}})
}

exports.buy = async (petId,userId) => {
    const offer = await Pet.findById(petId);
    console.log(offer)
    const exist = offer.buyers.find(x => x.toString() === userId);
    if (exist){
        throw new Error('Already purchased!');
    }
    // offer.buyers.push(userId);
    // await offer.save()
    //Push user id in the buyers array
    return Pet.findByIdAndUpdate(petId, {$push: {buyers: userId}});
}

exports.getPetById = async (petId) => {
    return Pet.findById(petId)
        .populate('owner', 'username _id')
        .populate('commentList.userID', 'username _id').lean();
}

exports.getAll = async () => {
    return Pet.find().populate('owner', 'username _id').lean();
}