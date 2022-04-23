const mongoose = require('mongoose');

const ProductModel = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 100,
        required: true
    },
    description: {
        type: String, 
        maxlength: 200,
        required: false
    },
    image: {
        type: String,
        default: "https://canalizados.com/images/productDefault.png"
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    }
});

mongoose.model('Product', ProductModel);






