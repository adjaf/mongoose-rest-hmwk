const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.getAllProducts = function(req, res) {
    // TODO: Retornar todos los productos

    return res.json({ products });
}

exports.findProduct = function(req, res) {
    // TODO: Retornar un producto por id
    const id = req.params.id;

    return res.json({ product });
}

exports.createProduct = function(req, res) {
    // TODO: Crear un producto, en base al body
    const body = req.body;

    return res.json({ product });
}

exports.updateProduct = function(req, res) {
    // TODO: Actualizar un producto, en base al id
    const id = req.params.id;

    return res.json({ product });
}

exports.deleteProduct = function(req, res) {
    // TODO: Borrar un producto, en base al id
    const id = req.params.id;

    return res.json({ message: 'Product Deleted' });
}

exports.davidEndpoint = function(req, res) {
    // TODO: Return productos ordenados por precio
}