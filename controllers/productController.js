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

    const products = await Product.findById(id);

    return res.json({ product });
}

exports.createProduct = function(req, res) {
    // TODO: Crear un producto, en base al body
    const newProduct = newProduct(req.body);
    newProduct.save(function(err, product) {
        if (err) {
            return res.status(400).json({ err });
        }

        return res.json({ product });
    });

    return res.json({ product });
}

exports.updateProduct = function(req, res) {
    // TODO: Actualizar un producto, en base al id
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

    return res.json({ product });
}

exports.deleteProduct = function(req, res) {
    // TODO: Borrar un producto, en base al id
    const id = req.params.id;
    Product.findById(id, async function(err, product){

        if (err) {
        return res.status(400).json({ err });
        }

        if (!product) {
        return res.status(404).json({ err: 'That product does not exist' });
        }
        await Product.findByIdAndDelete(id)
        
    
        return res.json({ message: "The product has been deleted" });
        
    });

    return res.json({ message: 'Product Deleted' });
}

exports.oscarEndpoint = async function(req, res) {
    // TODO: Return productos sin descripción
    try {
        const products = await Product.find({
            description: '' 
        });

        return res.json({ products });
    } catch (error) {
        return res.json({ error });
    }  
}