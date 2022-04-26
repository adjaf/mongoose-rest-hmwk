const mongoose = require('mongoose');
const Owner = mongoose.model('Owner');
const Pet = mongoose.model('Pet');


exports.getAll = async function(req, res) {
    const query = { status: 'active' };

    if (req.query.withPets === '1') {
        try {
            // It returns the owner with their pets in an array, and only shows name and id
            const owners = await Owner.find(query).populate('pets', 'name');

            return res.json({ owners });
        } catch (error) {
            return res.status(400).json({ error });
        }
    } else {
        Owner.find(query, function (err, owners) {
            return res.json({ owners });
        });
    }

}

exports.findOne = async function(req, res) {
    const id = req.params.id;
    // TODO Retornar el owner con sus pets, se debe ver name y type de la mascota
    const query = { status: 'active', _id: id };
    const owner = await Owner.find(query).populate('pets', 'name type');
    
    return res.json({ owner });
}

exports.createOwner = function(req, res) {
    const newOwner = new Owner(req.body);

    newOwner.save(function(err, owner) {
        if (err) {
            return res.status(400).json({ err });
        }

        return res.json({ owner });
    });
}

exports.updateOwner = function(req, res) {
    const id = req.params.id;
    const body = req.body;
    
    Owner.findByIdAndUpdate(id, body, function(err, owner){
        if (err) {
            return res.status(400).json({ err });
        }
        if (!owner) {
            return res.status(404).json({ err: 'Not found' });
        }
        
        return res.json({ owner });
    });
}

exports.deleteOwner = function(req, res) {
    const id = req.params.id;

    // We will not remove the owner, just set it as inactive
    Owner.findByIdAndUpdate(id, { status: 'inactive'},
        function(err, owner) {
            if (err) {
                return res.status(400).json({ err });
            }
            if (!owner) {
                return res.status(404).json({ err: 'Not found' });
            }
            
            return res.json({ message: "Owner set as inactive" });
        }
    );
}