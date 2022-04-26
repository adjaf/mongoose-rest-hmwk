const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.getAllProducts = async function(req, res) {
    // TODO: Retornar todos los productos
    const products = await Product.find().exec();

    return res.json({ products });
}

exports.findProduct = async function(req, res) {
    // TODO: Retornar un producto por id
    const id = req.params.id;
    const product = await Product.findById(id);

    return res.json({ product });
}

exports.createProduct = async function(req, res) {
    // TODO: Crear un producto, en base al body
    const { name, description, image, price, brand } = req.body;
    
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name,
        description,
        image,
        price,
        brand
    });

    const result = await product.save();

    return res.json({ result });
}

exports.updateProduct = async function(req, res) {
    // TODO: Actualizar un producto, en base al id
    const id = req.params.id;
    const { name, description, image, price, brand } = req.body;
    
    const product = await Product.findByIdAndUpdate(id, { name, description, image, price, brand }, { new: true });

    return res.json({ product });
}

exports.deleteProduct = async function(req, res) {
    // TODO: Borrar un producto, en base al id
    const id = req.params.id;

    const product = await Product.findByIdAndDelete(id);

    return res.json({ message: 'Product Deleted' });
}

exports.davidEndpoint = async function(req, res) {
    // TODO: Return productos ordenados por precio
    // Ordenados de menor a mayor
    const products = await Product.find().sort({ price: 1 }).exec();

    return res.json({ products });
}