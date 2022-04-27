const mongoose = require('mongoose');
const Pet = mongoose.model('Pet');
const Owner = mongoose.model('Owner');

exports.getAll = async function(req, res) {
    // ?withOwner=1
    if (req.query.withOwner === '1') {
        try {
            const pets = await Pet.find().populate('owner');

            return res.json({ pets });
        } catch (error) {
            return res.json({ error });
        }     
   } else {
        Pet.find(function (err, pets) {
            return res.json({ pets });
        });
   }
}

exports.findOne =  async function(req, res) {
    const id = req.params.id;
    // Returns the pet with the info of the related owner
    const pet = await Pet.findById(id).populate('owner');

    if (!pet) {
        return res.status(404).json({ err: 'Not found' });
    }

    return res.json({ pet });
}

exports.searchPetsByName = function(req, res) {
    // This comes in request as searchPets?name=value
    const name = req.query.name || '';
    /*
    *   This performs a search based on a regexp that is the name, 
    *   'i' is for match upper or lower case
    *   returns the pets that matched the search
    */
    Pet.find({
        name: { $regex: name, $options: 'i' } 
    }, function(err, pets) {
        if (err) {
            return res.status(400).json({ err });
        }

        return res.json({ pets });
    });
}

exports.createPet = async function(req, res) {
    // When creating a pet it can have owner or not
    const newPet = new Pet(req.body);

    // If we send the owner_id it is attached to the Owner and pushed to its pets
    if (req.body.owner_id) {
        const owner = await Owner.findById(req.body.owner_id);

        if (owner) {
            newPet.owner = owner._id;
            const pet = await newPet.save();
            owner.pets.push(newPet); // We push the new pet into owner "pets" array
            await owner.save();
            
           return res.json({ pet });
        } else {
            return res.status(404).json({ error: "Owner not found" });
        }
    }

    newPet.save(function(err, pet) {
        if (err) {
            return res.status(400).json({ err });
        }

        return res.json({ pet });
    });
}

exports.updatePet = function(req, res) {
    const id = req.params.id;
    const body = req.body;
    
    Pet.findByIdAndUpdate(id, body, function(err, pet){
        if (err) {
            return res.status(400).json({ err });
        }
        if (!pet) {
            return res.status(404).json({ err: 'Not found' });
        }
        
        return res.json({ pet });
    });
}

exports.deletePet = async function(req, res) {
    const petId = req.params.id;

    // We need to find the pet and remove it from its owner if it has one
    Pet.findById(petId, async function(err, pet) {
        if (err) {
            return res.status(400).json({ err });
        }

        if (!pet) {
            return res.status(404).json({ err: 'Not found' });
        }

        // If the pet has an owner
        if (pet.owner._id) {
            // Find the owner to remove the pet from the "pets" array
            Owner.findById(pet.owner, async function(err, owner) {
                if (owner) {
                    const petIndex = owner.pets.indexOf(petId);
                    owner.pets.splice(petIndex, 1); // Remove pet from the array

                    await owner.save(); // Save changes in the owner
                }
            });
        }
        
        // Delete pet
        await pet.remove();
    
        return res.json({ message: 'Deleted '});
    });
}

exports.julianEndpoint = async function(req,res) {
    // DONE: Retornar las 3 mascotas más pesadas
    
    const result = await Pet.find().sort({weight:-1}).limit(3);

    return res.json({ result });
}