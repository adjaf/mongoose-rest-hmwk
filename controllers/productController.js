const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.getAllProducts = async function(req, res) {
    // TODO: Retornar todos los productos
    const result = await Product.find().exec();
    return res.json({ result });
}

exports.findProduct = async function(req, res) {
    // TODO: Retornar un producto por id
    const id = req.params.id;
    var result = await Product.findById(id);
    return res.json({ result });
}

exports.createProduct = function(req, res) {
    // TODO: Crear un producto, en base al body
    const newproduct = new Product(req.body);

    newproduct.save(function(err, product) {
        if (err) {
            return res.status(400).json({ err });
        }

        return res.json({ product });
    });
}

exports.updateProduct = function(req, res) {
    // TODO: Actualizar un producto, en base al id
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
    // TODO: Borrar un producto, en base al id
    const id = req.params.id;

    const result = Product.findByIdAndDelete(id);

    return res.json({ message: 'Product Deleted' });
}