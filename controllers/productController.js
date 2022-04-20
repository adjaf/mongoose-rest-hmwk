const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.getAllProducts = async function(req, res) {
    // DONE :D : Retornar todos los productos
    try{
        const products = await Product.find()
        return res.json(products)
    }
    catch(err){
        return res.json(err)
    }
}

exports.findProduct = async function(req, res) {
    // DONE :D : Retornar un producto por id
    const id = req.params.id;
    const product = await Product.findById(id).populate();
    if (!product) {
        return res.status(404).json({ err: 'Not found' });
    }
    return res.json({ product });
}

exports.createProduct = function(req, res) {
    // DONE :D : Crear un producto, en base al body
    const newProduct = new Product(req.body);

    newProduct.save(function(err, newProduct) {
        if (err) {
            return res.status(400).json({ err });
        }
        return res.json({ newProduct });
    });
}

exports.updateProduct = function(req, res) {
    // DONE :D : Actualizar un producto, en base al id
    const id = req.params.id;
    const body = req.body;
    
    Product.findByIdAndUpdate(id, body, function(err, prod){
        if (err) {
            return res.status(400).json({ err });
        }
        if (!prod) {
            return res.status(404).json({ err: 'Not found' });
        }        
        return res.json({ prod });
    });
}

exports.deleteProduct = async function(req, res) {
    // DONE :D : Borrar un producto, en base al id
    const prodId = req.params.id;
    Product.findById(prodId, async function(err, prod) {
        if (err) {
            return res.status(400).json({ err });
        }
        if (!prod) {
            return res.status(404).json({ err: 'Not found' });
        }       
        await prod.remove();
    
        return res.json({ message: 'Product Deleted'});
    });
}