const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.getAllProducts = async function(req, res) {
   
    try {
        // It returns the owner with their pets in an array, and only shows name and id
        const products = await Product.find();

        return res.json({ products });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

exports.findProduct = async function(req, res) {
    
    const id = req.params.id;

    try {
        // It returns the product
        const product = await Product.findById(id);
        return res.json({ product });
    } catch (error) {
        return res.status(404).json({ err: 'Not found' });
    }
}

exports.createProduct = async function(req, res) {
    
    const newProduct = new Product(req.body);
    try{
        newProduct.save(function(err, product) {
            if (err) {
                return res.status(400).send({err});
            } else {
                return res.json({product});
            }
        });
    } catch (error) {
        return res.status(404).json({ err: 'Not found' });
    }
    
}

exports.updateProduct = function(req, res) {
   
    const id = req.params.id;
    const body = req.body;
    try{
        Product.findByIdAndUpdate(id, body, function(err, product){
            if (err) {
                return res.status(400).json({ err });
            }
            if (!product) {
                return res.status(404).json({ err: 'Not found' });
            }
            
            return res.json({ product });
        });
    } catch (error) {
        return res.status(404).json({ err: 'Not found' });
    }
    
}

exports.deleteProduct = async function(req, res) {
    
    const id = req.params.id;

    try{
        // It returns the product
        Product.findById(id, async function(err, product){
            if (err) {
                return res.status(400).json({ err });
            }
    
            if (!product) {
                return res.status(404).json({ err: 'Not found' });
            }

            await product.remove();
            return res.json({ message: 'Deleted '});
        }
    );
    } catch (error) {
        return res.status(404).json({ err: 'Not found' });
    }
            
        

}