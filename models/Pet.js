const mongoose = require('mongoose');

const PetModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    birth_date: {
        type: Date,
        required: false
    },
    weight: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['cat', 'bird', 'dog','hamster','frog','rat']
    },
    species: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    status: {
        type: String,
        default: 'alive',
        enum: ['deceased', 'alive']
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, // It can be registered without Owner
        ref: "Owner"
    }
});

mongoose.model('Pet', PetModel);