const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.getAllProducts = async function(req, res) {
    //DONE: Retornar todos los productos
    const products = await Product.find().exec();

    return res.json({ products });
}

exports.findProduct = async function(req, res) {
    //DONE: Retornar un producto por id
    const id = req.params.id;

    const product = await Product.findById(id).exec();

    return res.json({ product });
}

exports.createProduct = function(req, res) {
    const newProduct = new Product(req.body);

    newProduct.save(function(err, product) {
        if (err) {
            return res.status(400).json({ err });
        }

        return res.json({ product });
    });
}

exports.updateProduct = function(req, res) {
    // DONE: Actualizar un producto, en base al id

    const id = req.params.id;
    const body = req.body;

    Product.findByIdAndUpdate(id, body, function(err, product){
        if (err) {
            return res.status(400).json({ err });
        }
        if (!product) {
            return res.status(404).json({ err: 'Not found' });
        }
        
        return res.json({ product });
    });
}

exports.deleteProduct = function(req, res) {
    // DONE: Borrar un producto, en base al id
    const id = req.params.id;

    Product.findById(id, async function(err, product){

        if (err) {
        return res.status(400).json({ err });
        }

        if (!product) {
        return res.status(404).json({ err: 'That product doesnt exists' });
        }
        await Product.findByIdAndDelete(id)
        
    
        return res.json({ message: "Product was deleted" });
        
    });
}